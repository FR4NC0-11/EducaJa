import { test, expect, type APIRequestContext } from "@playwright/test";
import { randomUUID, createHash } from "node:crypto";
import { Client } from "pg";
import { lastCode, verifyEmail } from "../helpers/email";
const origin = "http://localhost:3002";
const headers = { Origin: origin };
async function pending(request: APIRequestContext, password = "12345678", prefix = "email") {
  await request.get("/api/workspace");
  const email = `${prefix}-${randomUUID()}@example.test`;
  const response = await request.post("/api/auth", {
    headers,
    data: { kind: "register", name: "Teste", email, password },
  });
  return { email, response };
}
async function query(sql: string, params: unknown[]) {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  try {
    await client.connect();
    return await client.query(sql, params);
  } finally {
    await client.end();
  }
}
async function challengeHash(request: APIRequestContext) {
  const state = await request.storageState();
  const token = state.cookies.find((c) => c.name === "educaja_access_challenge")!.value;
  return createHash("sha256").update(token).digest("hex");
}

test("código fica vinculado ao navegador, não cria conta antes da confirmação e só é usado uma vez", async ({
  request,
  playwright,
}) => {
  const { email, response } = await pending(request, "a".repeat(255));
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ ok: true, requiresCode: true });
  const code = lastCode(email);
  expect((await query("SELECT id FROM accounts WHERE email=$1", [email])).rows).toHaveLength(0);
  const other = await playwright.request.newContext({ baseURL: origin });
  expect(
    (await other.post("/api/auth", { headers, data: { kind: "verify", code } })).status(),
  ).toBe(401);
  const hash = await challengeHash(request);
  const state = await request.storageState();
  const replay = await playwright.request.newContext({ baseURL: origin, storageState: state });
  const stored = (
    await query("SELECT code_hash,password_hash FROM auth_challenges WHERE token_hash=$1", [hash])
  ).rows[0];
  expect(stored.code_hash).not.toBe(code);
  expect(stored.password_hash).toMatch(/^scrypt-v1\$/);
  const responses = await Promise.all(
    [request, replay].map((client) =>
      client.post("/api/auth", { headers, data: { kind: "verify", code } }),
    ),
  );
  expect(responses.map((r) => r.status()).sort()).toEqual([200, 401]);
  expect(
    (await query("SELECT email_verified_at FROM accounts WHERE email=$1", [email])).rows[0]
      .email_verified_at,
  ).toBeTruthy();
  await other.dispose();
  await replay.dispose();
});

test("cinco erros persistem no banco e impedem usar até mesmo o código correto", async ({
  request,
}) => {
  const { email } = await pending(request);
  const code = lastCode(email),
    wrong = code === "000000" ? "000001" : "000000";
  for (let i = 0; i < 5; i++)
    expect(
      (
        await request.post("/api/auth", { headers, data: { kind: "verify", code: wrong } })
      ).status(),
    ).toBe(401);
  expect(
    (
      await query("SELECT attempts FROM auth_challenges WHERE token_hash=$1", [
        await challengeHash(request),
      ])
    ).rows[0].attempts,
  ).toBe(5);
  expect(
    (await request.post("/api/auth", { headers, data: { kind: "verify", code } })).status(),
  ).toBe(401);
  expect((await (await request.get("/api/workspace")).json()).user).toBeNull();
});

test("reenvio exige intervalo, invalida código antigo e código expirado não libera sessão", async ({
  request,
}) => {
  const { email } = await pending(request);
  const code = lastCode(email),
    hash = await challengeHash(request);
  expect((await request.post("/api/auth", { headers, data: { kind: "resend" } })).status()).toBe(
    429,
  );
  // Age only this synthetic challenge instead of waiting a minute in the test.
  await query(
    "UPDATE auth_challenges SET sent_at=now()-interval '61 seconds' WHERE token_hash=$1",
    [hash],
  );
  expect((await request.post("/api/auth", { headers, data: { kind: "resend" } })).status()).toBe(
    200,
  );
  const latest = lastCode(email);
  if (latest !== code)
    expect(
      (await request.post("/api/auth", { headers, data: { kind: "verify", code } })).status(),
    ).toBe(401);
  await query(
    "UPDATE auth_challenges SET expires_at=now()-interval '1 second' WHERE token_hash=$1",
    [hash],
  );
  expect(
    (await request.post("/api/auth", { headers, data: { kind: "verify", code: latest } })).status(),
  ).toBe(401);
  expect((await (await request.get("/api/workspace")).json()).user).toBeNull();
});

test("falha de envio não cria conta nem sessão; e-mails inválidos não iniciam envio", async ({
  request,
}) => {
  const { email, response } = await pending(request, "12345678", "fail-send");
  expect(response.status()).toBe(503);
  expect((await query("SELECT id FROM accounts WHERE email=$1", [email])).rows).toHaveLength(0);
  expect(
    (await query("SELECT token_hash FROM auth_challenges WHERE email=$1", [email])).rows,
  ).toHaveLength(0);
  expect((await (await request.get("/api/workspace")).json()).user).toBeNull();
  expect(
    (
      await request.post("/api/auth", {
        headers,
        data: { kind: "register", email: "invalido@", name: "Teste", password: "12345678" },
      })
    ).status(),
  ).toBe(400);
});

test("conta antiga sem e-mail verificado exige senha e código para voltar a entrar", async ({
  request,
}) => {
  const { email } = await pending(request);
  await verifyEmail(request, email, origin);
  await request.post("/api/auth", { headers, data: { kind: "logout" } });
  await query("UPDATE accounts SET email_verified_at=NULL WHERE email=$1", [email]);
  expect(
    (
      await request.post("/api/auth", {
        headers,
        data: { kind: "login", email, password: "12345678" },
      })
    ).status(),
  ).toBe(200);
  expect((await (await request.get("/api/workspace")).json()).user).toBeNull();
  await verifyEmail(request, email, origin);
  expect((await (await request.get("/api/workspace")).json()).user.email).toBe(email);
});

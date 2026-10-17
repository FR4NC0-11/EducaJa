import { test, expect } from "@playwright/test";
import { randomUUID, createHash } from "node:crypto";
import { Client } from "pg";

const headers = { Origin: "http://localhost:3003" };
test("cadastro sem e-mail preserva progresso, login valida senha e não declara e-mail verificado", async ({
  page,
  playwright,
}) => {
  const email = `aluno.nome_${randomUUID()}@example.test`;
  const password = "frase sintética de teste 123";
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Escolher IoT: objetos conectados" }),
  ).toBeEnabled();
  expect(
    (
      await page.request.post("/api/workspace", {
        headers,
        data: { kind: "start", topicId: "iot-fundamentos", goal: "Teste sintético" },
      })
    ).ok(),
  ).toBeTruthy();
  const guest = (await page.context().cookies()).find((c) => c.name === "educaja_visitor")!;
  await page.getByRole("button", { name: "Entrar ou criar conta", exact: true }).click();
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await expect(page.getByText("O acesso usa e-mail e senha.", { exact: false })).toBeVisible();
  await page.getByLabel("Como você quer ser chamado?").fill("Teste");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Criar minha conta", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sua conta", exact: true })).toBeVisible();
  const workspace = await (await page.request.get("/api/workspace")).json();
  expect(workspace.user.email).toBe(email);
  expect(workspace.session.goal).toBe("Teste sintético");
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sua conta", exact: true })).toBeVisible();
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  try {
    const stored = (
      await client.query("SELECT email_verified_at,password_hash FROM accounts WHERE email=$1", [
        email,
      ])
    ).rows[0];
    expect(stored.email_verified_at).toBeNull();
    expect(stored.password_hash).toMatch(/^scrypt-v1\$/);
    expect(
      (await client.query("SELECT token_hash FROM auth_challenges WHERE email=$1", [email])).rows,
    ).toHaveLength(0);
    expect(
      (
        await client.query("SELECT id FROM visitors WHERE token_hash=$1", [
          createHash("sha256").update(guest.value).digest("hex"),
        ])
      ).rows,
    ).toHaveLength(0);
  } finally {
    await client.end();
  }
  const other = await playwright.request.newContext({ baseURL: headers.Origin });
  try {
    expect(
      (
        await other.post("/api/auth", {
          headers: { Origin: "https://evil.example" },
          data: { kind: "login", email, password },
        })
      ).status(),
    ).toBe(403);
    expect(
      (
        await other.post("/api/auth", {
          headers,
          data: { kind: "login", email, password: "senha incorreta" },
        })
      ).status(),
    ).toBe(401);
    expect(
      (
        await other.post("/api/auth", {
          headers,
          data: { kind: "register", email, password, name: "Duplicado" },
        })
      ).status(),
    ).toBe(409);
    const login = await other.post("/api/auth", {
      headers,
      data: { kind: "login", email, password },
    });
    expect(await login.json()).toEqual({ ok: true });
    expect((await (await other.get("/api/workspace")).json()).session.goal).toBe("Teste sintético");
    expect(
      (await other.post("/api/auth", { headers, data: { kind: "logout" } })).ok(),
    ).toBeTruthy();
    expect((await (await other.get("/api/workspace")).json()).user).toBeNull();
    expect((await (await page.request.get("/api/workspace")).json()).user.email).toBe(email);
    expect(
      (
        await other.post("/api/auth", { headers, data: { kind: "verify", code: "123456" } })
      ).status(),
    ).toBe(400);
  } finally {
    await other.dispose();
  }
});

test("cadastros concorrentes não duplicam conta e limite de senha continua ativo", async ({
  playwright,
  request,
}) => {
  const email = `concorrencia-${randomUUID()}@example.test`;
  const payload = { kind: "register", name: "Teste", email, password: "senha sintética 123" };
  const other = await playwright.request.newContext({ baseURL: headers.Origin });
  try {
    await request.get("/api/workspace");
    await other.get("/api/workspace");
    const results = await Promise.all(
      [request, other].map((r) => r.post("/api/auth", { headers, data: payload })),
    );
    expect(results.map((r) => r.status()).sort()).toEqual([200, 409]);
  } finally {
    await other.dispose();
  }
  const missing = `ausente-${randomUUID()}@example.test`;
  const anonymous = await playwright.request.newContext({ baseURL: headers.Origin });
  try {
    for (let i = 0; i < 9; i++) {
      const response = await anonymous.post("/api/auth", {
        headers,
        data: { kind: "login", email: missing, password: "senha incorreta" },
      });
      expect(response.status()).toBe(i < 8 ? 401 : 429);
    }
  } finally {
    await anonymous.dispose();
  }
});

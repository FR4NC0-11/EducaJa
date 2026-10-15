import { test, expect } from "@playwright/test";
import { randomUUID } from "node:crypto";

test("cadastro preserva visitante, login recupera em outro navegador e saída revoga apenas a sessão atual", async ({
  page,
  browser,
  playwright,
}) => {
  const origin = "http://localhost:3000";
  const email = `teste-${randomUUID()}@example.test`;
  const password = "frase de teste local 123!";
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Escolher IoT: objetos conectados" }),
  ).toBeEnabled();
  await page.request.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "start", topicId: "iot-fundamentos", goal: "Progresso sintético de teste" },
  });
  await page.request.post("/api/workspace", {
    headers: { Origin: origin },
    data: {
      kind: "note",
      topicId: "iot-fundamentos",
      lessonId: "objetos-conectados",
      text: "Sensor mede; atuador realiza uma ação.",
    },
  });
  const guest = (await page.context().cookies()).find(
    (cookie) => cookie.name === "educaja_visitor",
  )!;
  await page.reload();
  await page.getByRole("button", { name: "Entrar ou criar conta", exact: true }).click();
  await page.getByRole("button", { name: "Criar conta", exact: true }).click();
  await page.getByLabel("Como você quer ser chamado?").fill("Estudante de teste");
  await page.getByLabel("E-mail", { exact: true }).fill(email);
  await page.getByLabel("Senha", { exact: true }).fill(password);
  await page.getByRole("button", { name: "Criar minha conta", exact: true }).click();
  await expect(page.getByRole("button", { name: "Sua conta", exact: true })).toBeVisible();
  const sessionCookie = (await page.context().cookies()).find(
    (cookie) => cookie.name === "educaja_account",
  )!;
  expect(sessionCookie.httpOnly).toBe(true);
  expect(sessionCookie.sameSite).toBe("Lax");
  const second = await browser.newContext({ baseURL: origin });
  const other = await second.newPage();
  await other.goto("/");
  await other.getByRole("button", { name: "Entrar ou criar conta", exact: true }).click();
  await other.getByLabel("E-mail", { exact: true }).fill(email.toUpperCase());
  await other.getByLabel("Senha", { exact: true }).fill(password);
  await other.getByRole("button", { name: "Entrar na minha conta" }).click();
  await expect(other.getByRole("button", { name: "Sua conta", exact: true })).toBeVisible();
  await other.getByRole("button", { name: "Estudar", exact: true }).click();
  await expect(other.getByLabel("Suas anotações")).toHaveValue(
    "Sensor mede; atuador realiza uma ação.",
  );
  const anonymousReplay = await playwright.request.newContext({
    baseURL: origin,
    extraHTTPHeaders: { Cookie: `educaja_visitor=${guest.value}` },
  });
  expect((await (await anonymousReplay.get("/api/workspace")).json()).session).toBeNull();
  await page.getByRole("button", { name: "Sua conta", exact: true }).click();
  await page.getByRole("button", { name: "Sair da conta" }).click();
  await expect(
    page.getByRole("button", { name: "Entrar ou criar conta", exact: true }),
  ).toBeVisible();
  expect((await (await page.request.get("/api/workspace")).json()).session).toBeNull();
  const replay = await playwright.request.newContext({
    baseURL: origin,
    extraHTTPHeaders: { Cookie: `educaja_account=${sessionCookie.value}` },
  });
  expect((await (await replay.get("/api/workspace")).json()).user).toBeNull();
  expect((await (await other.request.get("/api/workspace")).json()).user.email).toBe(email);
  await replay.dispose();
  await anonymousReplay.dispose();
  await second.close();
});

test("autenticação valida entrada, origem e limita tentativas sem permitir acesso", async ({
  request,
  playwright,
}) => {
  const origin = "http://localhost:3000";
  const email = `inexistente-${randomUUID()}@example.test`;
  const blocked = await request.post("/api/auth", {
    headers: { Origin: "https://outro.example" },
    data: { kind: "logout" },
  });
  expect(blocked.status()).toBe(403);
  const invalid = await request.post("/api/auth", {
    headers: { Origin: origin },
    data: { kind: "register", email, name: "Teste", password: "curta" },
  });
  expect(invalid.status()).toBe(400);
  for (let i = 0; i < 9; i++) {
    const response = await request.post("/api/auth", {
      headers: { Origin: origin },
      data: { kind: "login", email, password: "senha sintética inválida" },
    });
    expect(response.status()).toBe(i < 8 ? 401 : 429);
  }
  const teacher = await request.post("/api/teacher", {
    headers: { Origin: origin },
    data: {
      kind: "chat",
      topicId: "iot-fundamentos",
      lessonId: "objetos-conectados",
      text: "Explique sensor.",
    },
  });
  expect([401, 503]).toContain(teacher.status());
  const expired = await playwright.request.newContext({
    baseURL: origin,
    extraHTTPHeaders: { Cookie: `educaja_account=${"a".repeat(64)}` },
  });
  const staleWrite = await expired.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "start", topicId: "postgresql", goal: "Não deve gravar como visitante" },
  });
  expect(staleWrite.status()).toBe(401);
  expect((await (await expired.get("/api/workspace")).json()).user).toBeNull();
  await expired.dispose();
});

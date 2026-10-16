import { test, expect, type APIRequestContext } from "@playwright/test";
import { randomUUID } from "node:crypto";
import { verifyEmail } from "../helpers/email";
const headers = { Origin: "http://localhost:3001" };
async function account(request: APIRequestContext) {
  await request.get("/api/workspace");
  const email = `ai-${randomUUID()}@example.test`;
  const response = await request.post("/api/auth", {
    headers,
    data: {
      kind: "register",
      name: "Teste sintético",
      email,
      password: "frase sintética de teste 123",
    },
  });
  expect(response.ok()).toBeTruthy();
  await verifyEmail(request, email, headers.Origin);
  await request.post("/api/workspace", {
    headers,
    data: {
      kind: "start",
      topicId: "iot-fundamentos",
      goal: "Aprender para um teste automatizado",
    },
  });
}
async function diagnostic(request: APIRequestContext, slow = false) {
  for (let index = 0; index < 10; index++)
    await request.post("/api/workspace", {
      headers,
      data: {
        kind: "answer",
        topicId: "iot-fundamentos",
        index,
        text: slow ? "fixture-slow" : "Resposta sintética",
      },
    });
  await request.post("/api/workspace", {
    headers,
    data: { kind: "submit", topicId: "iot-fundamentos" },
  });
}

test("conversa e avaliação persistem, recomendações alteram a ordem e limites são aplicados (IA simulada)", async ({
  page,
}) => {
  await account(page.request);
  await diagnostic(page.request);
  await page.goto("/");
  await page.getByRole("button", { name: "Aulas", exact: true }).click();
  await expect(page.getByRole("status", { name: "Uso diário do professor" })).toContainText(
    "Pedidos restantes hoje: 3 de 3",
  );
  await page.getByLabel("Sua dúvida", { exact: true }).fill("Qual é a função de um sensor?");
  await page.getByRole("button", { name: "Perguntar ao professor" }).click();
  await expect(page.getByText(/Resposta sintética de teste:/)).toBeVisible();
  await expect(page.getByRole("status", { name: "Uso diário do professor" })).toContainText(
    "Pedidos restantes hoje: 2 de 3",
  );
  await page.reload();
  await page.getByRole("button", { name: "Teste inicial", exact: true }).click();
  await page.getByRole("button", { name: "Pedir avaliação ao professor" }).click();
  await expect(
    page.getByRole("heading", { name: "Seu ponto de partida", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".evaluation-heading>strong")).toContainText("7,0");
  await page.getByRole("button", { name: "Aulas", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Projeto: monitorar uma sala com plano de falhas",
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.getByRole("status", { name: "Uso diário do professor" })).toContainText(
    "Pedidos restantes hoje: 1 de 3",
  );
  const chat = {
    kind: "chat",
    topicId: "iot-fundamentos",
    lessonId: "objetos-conectados",
    text: "Outra dúvida sintética",
  };
  expect((await page.request.post("/api/teacher", { headers, data: chat })).status()).toBe(200);
  expect((await page.request.post("/api/teacher", { headers, data: chat })).status()).toBe(429);
  await page.request.post("/api/workspace", {
    headers,
    data: { kind: "answer", topicId: "iot-fundamentos", index: 0, text: "Resposta alterada" },
  });
  const current = await (await page.request.get("/api/workspace")).json();
  expect(current.session.evaluation).toBeNull();
  expect(current.session.submitted_at).toBeNull();
  expect(current.session.conversation).toHaveLength(4);
  expect(current.teacherUsage).toEqual({ used: 3, limit: 3, remaining: 0 });
});

test("resposta incompleta do provedor não é salva como conversa (IA simulada)", async ({
  request,
}) => {
  await account(request);
  const response = await request.post("/api/teacher", {
    headers,
    data: {
      kind: "chat",
      topicId: "iot-fundamentos",
      lessonId: "objetos-conectados",
      text: "fixture-incomplete",
    },
  });
  expect(response.status()).toBe(502);
  expect((await (await request.get("/api/workspace")).json()).teacherUsage).toEqual({
    used: 1,
    limit: 3,
    remaining: 2,
  });
  expect((await (await request.get("/api/workspace")).json()).session.conversation).toEqual([]);
});

test("avaliação atrasada não sobrescreve respostas editadas durante o pedido (IA simulada)", async ({
  request,
}) => {
  await account(request);
  await diagnostic(request, true);
  const evaluation = request.post("/api/teacher", {
    headers,
    data: { kind: "grade", topicId: "iot-fundamentos" },
  });
  // The fixture holds the provider reply so a real concurrent HTTP edit can finish first.
  await new Promise((resolve) => setTimeout(resolve, 350));
  await request.post("/api/workspace", {
    headers,
    data: {
      kind: "answer",
      topicId: "iot-fundamentos",
      index: 0,
      text: "Texto novo, que deve ser preservado",
    },
  });
  expect((await evaluation).status()).toBe(409);
  const current = (await (await request.get("/api/workspace")).json()).session;
  expect(current.evaluation).toBeNull();
  expect(current.answers["0"]).toBe("Texto novo, que deve ser preservado");
});

import { test, expect } from "@playwright/test";

test("diagnóstico, caderno e trilha persistem após recarregar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("button")).toHaveText([
    "Assuntos",
    "Teste inicial",
    "Plano de estudo",
    "Aulas",
  ]);
  await expect(page.getByRole("heading", { name: "O que você quer aprender?" })).toBeVisible();
  await page.getByRole("button", { name: "Escolher Programação com Java" }).click();
  await page
    .getByLabel("Quer nos contar seu objetivo? (opcional)")
    .fill("Quero entender objetos para a prova.");
  await page.getByRole("button", { name: "Fazer teste inicial (opcional)" }).click();
  for (let i = 0; i < 10; i++) {
    await expect(page.getByText(`QUESTÃO ${String(i + 1).padStart(2, "0")} / 10`)).toBeVisible();
    await page
      .getByLabel("Sua resposta", { exact: true })
      .fill(`Resposta ${i + 1}: ainda estou aprendendo esse conceito.`);
    await page
      .getByRole("button", {
        name: i === 9 ? "Salvar resposta" : "Salvar e continuar",
        exact: true,
      })
      .click();
  }
  await page.getByRole("button", { name: "Finalizar teste", exact: true }).click();
  await expect(page.getByRole("button", { name: "Teste registrado", exact: true })).toBeDisabled();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Teste inicial" }).click();
  await expect(page.getByText("10 de 10 salvas")).toBeVisible();
  await expect(page.getByLabel("Sua resposta", { exact: true })).toHaveValue(
    "Resposta 1: ainda estou aprendendo esse conceito.",
  );
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Aulas" })
    .click();
  await page.getByRole("button", { name: "Exemplo do dia a dia" }).click();
  await expect(page.getByText(/A classe é como a planta/)).toBeVisible();
  await page
    .getByLabel("Suas anotações")
    .fill("Uma classe descreve a estrutura; o objeto é uma instância.");
  await page.getByRole("button", { name: "Salvar anotação" }).click();
  await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Aulas" })
    .click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue(
    "Uma classe descreve a estrutura; o objeto é uma instância.",
  );
  await expect(page.getByRole("button", { name: "Marcar como não concluída" })).toBeVisible();
  await page.getByRole("button", { name: "Todas as aulas", exact: true }).last().click();
  await expect(page.getByText("1/9 concluídas")).toBeVisible();
});

test("API isola navegadores, bloqueia origem externa e não conclui diagnóstico incompleto", async ({
  playwright,
}) => {
  const origin = "http://localhost:3002";
  const first = await playwright.request.newContext({ baseURL: origin });
  const second = await playwright.request.newContext({ baseURL: origin });
  await first.get("/api/workspace");
  const blocked = await first.post("/api/workspace", {
    headers: { Origin: "https://outro.example" },
    data: { kind: "start", topicId: "postgresql", goal: "Estudar" },
  });
  expect(blocked.status()).toBe(403);
  const start = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "start", topicId: "postgresql", goal: "Estudar SQL" },
  });
  expect(start.ok()).toBeTruthy();
  const incomplete = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "submit", topicId: "postgresql" },
  });
  expect(incomplete.status()).toBe(400);
  const saves = await Promise.all(
    [0, 1].map((index) =>
      first.post("/api/workspace", {
        headers: { Origin: origin },
        data: {
          kind: "answer",
          topicId: "postgresql",
          index,
          text: `Resposta concorrente ${index}`,
        },
      }),
    ),
  );
  expect(saves.every((response) => response.ok())).toBeTruthy();
  const saved = (await (await first.get("/api/workspace")).json()).session.answers;
  expect(saved["0"]).toBe("Resposta concorrente 0");
  expect(saved["1"]).toBe("Resposta concorrente 1");
  expect((await (await second.get("/api/workspace")).json()).session).toBeNull();
  const invalid = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "answer", topicId: "postgresql", index: 11, text: "inválida" },
  });
  expect(invalid.status()).toBe(400);
  const invalidLesson = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "lesson", topicId: "postgresql", lessonId: "objetos", done: true },
  });
  expect(invalidLesson.status()).toBe(400);
  await first.dispose();
  await second.dispose();
});

test("layout funciona em celular sem ultrapassar a tela", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Escolha por onde começar" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.getByRole("button", { name: "Sites", exact: true }).click();
  await expect(page.getByRole("button", { name: "Escolher Criação de sites" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Escolher Programação com Java" })).toHaveCount(0);
  await page.getByRole("button", { name: "Escolher Criação de sites" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("Quer nos contar seu objetivo? (opcional)")).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Começar a estudar" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Fazer teste inicial (opcional)" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Fechar", exact: true })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Fazer teste inicial (opcional)" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("menu recolhido persiste e iniciante estuda IoT sem objetivo ou teste obrigatório", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  const sidebar = page.locator("#learning-sidebar");
  const expandedWidth = await sidebar.evaluate((element) => element.getBoundingClientRect().width);
  await page.getByRole("button", { name: "Recolher menu", exact: true }).click();
  await expect(page.getByRole("button", { name: "Expandir menu" })).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  expect(await sidebar.evaluate((element) => element.getBoundingClientRect().width)).toBeLessThan(
    expandedWidth / 2,
  );
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: "Expandir menu" })).toBeVisible();
  await page.getByRole("button", { name: "IoT", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(1);
  await page.getByRole("button", { name: "Escolher IoT: objetos conectados" }).click();
  await expect(page.getByLabel("Quer nos contar seu objetivo? (opcional)")).toHaveValue("");
  await page.getByRole("button", { name: "Começar a estudar" }).click();
  await expect(
    page.getByRole("heading", { name: "O que é um objeto conectado?", exact: true }),
  ).toBeVisible();
  await expect(page.getByText(/sem precisar comprar placas ou sensores/)).toBeVisible();
  await expect(page.locator(".code-example")).not.toHaveAttribute("open", "");
  await page.getByText("O que significam essas palavras?", { exact: true }).click();
  await expect(page.locator(".glossary dt", { hasText: /^Sensor$/ })).toBeVisible();
  await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
  await page.getByRole("button", { name: /^Próxima aula:/ }).click();
  await expect(
    page.getByRole("heading", { name: "Como os dados chegam até você", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Teste inicial", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Ainda não sei — salvar e continuar", exact: true })
    .click();
  await expect(page.getByText("QUESTÃO 02 / 10", { exact: true })).toBeVisible();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Teste inicial", exact: true }).click();
  await expect(page.getByLabel("Sua resposta", { exact: true })).toHaveValue("Ainda não sei.");
  await page.getByRole("button", { name: "Plano de estudo", exact: true }).click();
  await expect(page.getByText("1/9 concluídas", { exact: true })).toBeVisible();
});

test("voltar em Programação tem destino claro e protege anotações", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("button", { name: /^Voltar / })).toHaveCount(0);
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Voltar às áreas", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Qual área você quer acessar?" })).toBeVisible();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Escolher IoT: objetos conectados", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Rascunho protegido ao voltar.");
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await expect(page.locator(".feedback").getByRole("alert")).toContainText("antes de voltar");
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Rascunho protegido ao voltar.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await expect(page.getByRole("heading", { name: "O que você quer aprender?" })).toBeVisible();
  await page.getByRole("button", { name: "Teste inicial", exact: true }).click();
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await expect(page.getByRole("heading", { name: "O que você quer aprender?" })).toBeVisible();
});

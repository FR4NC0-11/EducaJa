import { test, expect } from "@playwright/test";

test("entrada separa áreas e Ensino Médio oferece primeiras unidades sem ativar IA ou diagnóstico", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Qual área você quer acessar?" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(0);
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ensino Médio", exact: true })).toBeVisible();
  for (const name of ["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"])
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Escolha sua área de estudo" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Teste inicial", exact: true })).toHaveCount(0);
  await expect(
    page.getByRole("list", { name: "Unidades disponíveis da 3ª série" }).getByRole("button"),
  ).toHaveCount(4);
  await expect(page.getByLabel("Sua dúvida", { exact: true })).toHaveCount(0);
  await expect(page.locator("#main-content")).toBeFocused();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(5);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Qual área você quer acessar?" })).toBeVisible();
});

test("troca de área preserva progresso e pede salvar rascunhos", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Escolher IoT: objetos conectados" }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Sensor mede; atuador age.");
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await expect(page.locator(".feedback").getByRole("alert")).toContainText(
    "Salve sua resposta ou anotação antes de trocar de área",
  );
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Sensor mede; atuador age.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  const before = (await (await page.request.get("/api/workspace")).json()).session;
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  expect((await (await page.request.get("/api/workspace")).json()).session).toEqual(before);
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Continuar estudando", exact: true }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Sensor mede; atuador age.");
});

test("escolha de áreas funciona com teclado e em tela estreita", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Ensino Médio", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.screenshot({ path: ".cache/study-areas-mobile.png", fullPage: true });
});

test("unidades da 3ª série salvam anotações e conclusão sem misturar com programação", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Estudar Matemática: contagem", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Fazer teste inicial (opcional)", exact: true }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Somar ou multiplicar possibilidades?", exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Sua dúvida", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Exercício", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Multiplico etapas e somo alternativas disjuntas.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
  for (const action of [
    { kind: "grade", topicId: "em3-matematica-contagem" },
    {
      kind: "chat",
      topicId: "em3-matematica-contagem",
      lessonId: "em3-contagem-etapas",
      text: "Dúvida",
    },
  ]) {
    expect(
      (
        await page.request.post("/api/teacher", {
          headers: { Origin: "http://localhost:3002" },
          data: action,
        })
      ).status(),
    ).toBe(400);
  }
  await page.reload();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Estudar Matemática: contagem", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue(
    "Multiplico etapas e somo alternativas disjuntas.",
  );
  await expect(
    page.getByRole("button", { name: "Marcar como não concluída", exact: true }),
  ).toBeVisible();
  const invalid = await page.request.post("/api/workspace", {
    headers: { Origin: "http://localhost:3002" },
    data: { kind: "lesson", topicId: "java-poo", lessonId: "em3-contagem-etapas", done: true },
  });
  expect(invalid.status()).toBe(409);
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(5);
  await expect(page.getByRole("button", { name: "Continuar estudando", exact: true })).toHaveCount(
    0,
  );
});

test("redação Enem tem sequência própria e rascunho persistente por aula", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page
    .getByRole("button", { name: "Estudar Linguagens: interpretação", exact: true })
    .click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page
    .locator(".lesson-nav")
    .getByRole("button")
    .filter({ hasText: "Redação Enem: projeto de texto para buscar a nota 1000" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Redação Enem: projeto de texto para buscar a nota 1000",
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByText(/Buscar a nota 1000 é uma meta de estudo, não uma promessa/),
  ).toBeVisible();
  await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
  await page.getByRole("button", { name: /^Próxima aula:/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Da tese ao parágrafo: explicar, exemplificar e concluir",
      exact: true,
    }),
  ).toBeVisible();
  await page
    .locator(".lesson-nav")
    .getByRole("button")
    .filter({ hasText: "Oficina de redação: escrever, revisar e reescrever" })
    .click();
  await page.getByRole("button", { name: "Exercício", exact: true }).click();
  await page
    .getByLabel("Suas anotações")
    .fill("Tese: acesso envolve materiais e mediação. Meta: justificar o segundo argumento.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page
    .getByRole("button", { name: "Estudar Linguagens: interpretação", exact: true })
    .click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("");
  await page
    .locator(".lesson-nav")
    .getByRole("button")
    .filter({ hasText: "Oficina de redação: escrever, revisar e reescrever" })
    .click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue(
    "Tese: acesso envolve materiais e mediação. Meta: justificar o segundo argumento.",
  );
  const saved = (await (await page.request.get("/api/workspace")).json()).session;
  expect(saved.completed_lessons).toContain("em3-redacao-projeto");
  expect(saved.notes["em3-leitura-evidencias"]).toBeUndefined();
});

test("destaque de redação abre a aula correta e visual mantém fundo escuro", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  expect(await page.locator("html").evaluate((el) => getComputedStyle(el).backgroundColor)).toBe(
    "rgb(40, 42, 54)",
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Estudar redação", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(
    page.getByRole("heading", {
      name: "Redação Enem: projeto de texto para buscar a nota 1000",
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ensino Médio", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Voltar às áreas", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Qual área você quer acessar?" })).toBeVisible();
});

import { test, expect } from "@playwright/test";
import { lawSubjects } from "../../lib/law-area";

test("Direito é a terceira área e explora oito prévias sem ativar aulas, IA ou progresso", async ({
  page,
}) => {
  let teacherRequests = 0;
  page.on("request", (request) => {
    if (request.url().includes("/api/teacher")) teacherRequests++;
  });
  await page.goto("/");
  await expect(page.locator(".study-area-card")).toHaveCount(3);
  const before = (await (await page.request.get("/api/workspace")).json()).session;
  await page.getByRole("button", { name: "Acessar Direito", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Direito.", exact: true })).toBeVisible();
  await expect(page.locator("#main-content")).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Principal" }).getByRole("button")).toHaveText([
    "Assuntos",
  ]);
  await expect(
    page.getByRole("list", { name: "Matérias de Direito" }).getByRole("button"),
  ).toHaveCount(8);
  for (const subject of lawSubjects) {
    await page.getByRole("button", { name: `Explorar ${subject.title}`, exact: true }).click();
    await expect(page.getByRole("heading", { name: subject.title, exact: true })).toBeFocused();
    await expect(
      page.getByRole("button", { name: `Explorar ${subject.title}`, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#law-subject-preview").getByRole("listitem")).toHaveText(
      subject.themes,
    );
    await expect(page.locator("#law-subject-preview")).toContainText(
      "Aulas e exercícios ainda em preparação",
    );
  }
  for (const name of ["Simulados", "Teste inicial", "Aulas", "Plano de estudo"])
    await expect(page.getByRole("button", { name, exact: true })).toHaveCount(0);
  expect(teacherRequests).toBe(0);
  expect((await (await page.request.get("/api/workspace")).json()).session).toEqual(before);
  await page.getByRole("button", { name: "Assuntos", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Direito.", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Voltar às áreas", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Qual área você quer acessar?", exact: true }),
  ).toBeVisible();
});

test("Direito mantém identidade escura, teclado e leitura sem estouro no celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Direito", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { name: "Direito.", exact: true })).toBeVisible();
  const style = await page
    .locator(".workspace")
    .evaluate((el) => getComputedStyle(el).backgroundColor);
  const channels = style.match(/\d+/g)!.map(Number);
  expect(channels.slice(0, 3).every((value) => value < 60)).toBe(true);
  expect(
    await page
      .getByRole("heading", { name: "Direito.", exact: true })
      .evaluate((el) => getComputedStyle(el).fontFamily),
  ).toContain("Georgia");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: "Explorar Direito Constitucional", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Direito Constitucional", exact: true }),
  ).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Voltar ao índice de matérias", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Caminhos do estudo jurídico", exact: true }),
  ).toBeFocused();
  expect(
    await page
      .locator("#law-subjects-title")
      .evaluate(
        (el) =>
          el.getBoundingClientRect().top >=
          document.querySelector(".sidebar")!.getBoundingClientRect().bottom,
      ),
  ).toBe(true);
});

test("passar por Direito preserva anotações de Programação e simulados escolares", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Escolher Programação com Java", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Objeto mantém seu estado.");
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await expect(page.locator(".feedback").getByRole("alert")).toContainText(
    "Salve sua resposta ou anotação",
  );
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await page.getByLabel("Quantidade de questões").fill("3");
  await page.getByRole("button", { name: "Iniciar simulado", exact: true }).click();
  const prompt = await page.locator(".exam-options legend").innerText();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Direito", exact: true }).click();
  await expect(page.getByText("Programação com Java", { exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Explorar Direito Penal", exact: true }).click();
  await page.getByRole("button", { name: "Voltar às áreas", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.locator(".exam-options legend")).toHaveText(prompt);
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Continuar estudando", exact: true }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Objeto mantém seu estado.");
});

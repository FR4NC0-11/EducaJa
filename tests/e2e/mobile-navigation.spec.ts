import { test, expect } from "@playwright/test";

test("celular tem entrada compacta, navegação inferior e atalhos para matérias/conta", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".sidebar")).toBeHidden();
  for (const area of ["Programação", "Ensino Médio", "Direito"]) {
    const bounds = await page
      .getByRole("button", { name: `Acessar ${area}`, exact: true })
      .boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(44);
  }
  await page.getByRole("button", { name: "Entrar ou criar conta", exact: true }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Fechar conta", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  const nav = await page.locator(".sidebar").boundingBox();
  expect(nav!.y).toBeGreaterThan(700);
  expect(nav!.y + nav!.height).toBeLessThanOrEqual(844);
  expect((await page.locator(".topbar").boundingBox())!.height).toBeLessThanOrEqual(88);
  await page.getByRole("link", { name: "Escolher uma matéria", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Escolha sua área de estudo", exact: true }),
  ).toBeFocused();
  expect(
    await page
      .locator("#school-subjects-title")
      .evaluate(
        (el) =>
          el.getBoundingClientRect().top >=
          document.querySelector(".topbar")!.getBoundingClientRect().bottom,
      ),
  ).toBe(true);
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Qual área você quer acessar?", exact: true }),
  ).toBeVisible();
});

test("aula aparece antes da lista; seleção recolhe, foca e protege anotações no celular", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Estudar Matemática: contagem", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  const toggle = page.getByRole("button", { name: /Escolher outra aula/ });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator(".lesson-list")).toBeHidden();
  const title = page.getByRole("heading", {
    name: "Somar ou multiplicar possibilidades?",
    exact: true,
  });
  const initialBounds = await title.boundingBox();
  expect(initialBounds!.y + initialBounds!.height).toBeLessThan(
    (await page.locator(".sidebar").boundingBox())!.y,
  );
  await toggle.click();
  const stats = page.getByRole("button", { name: /Estatística: média, mediana e leitura crítica/ });
  await stats.click();
  await expect(
    page.getByRole("heading", {
      name: "Estatística: média, mediana e leitura crítica",
      exact: true,
    }),
  ).toBeFocused();
  await expect(page.locator(".lesson-list")).toBeHidden();
  await expect(toggle).toContainText("Aula 5 de 15");
  await page.getByLabel("Suas anotações").fill("Mediana usa os valores centrais.");
  await toggle.click();
  await page.getByRole("button", { name: /Geometria analítica: distância e ponto médio/ }).click();
  await expect(page.locator(".feedback").getByRole("alert")).toContainText("Salve sua anotação");
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Mediana usa os valores centrais.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.getByRole("button", { name: /Geometria analítica: distância e ponto médio/ }).click();
  await expect(
    page.getByRole("heading", {
      name: "Geometria analítica: distância e ponto médio",
      exact: true,
    }),
  ).toBeFocused();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("");
  await toggle.click();
  await stats.click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Mediana usa os valores centrais.");
  await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
  await page.getByRole("button", { name: /Próxima aula: Geometria analítica/ }).click();
  const heading = page.getByRole("heading", {
    name: "Geometria analítica: distância e ponto médio",
    exact: true,
  });
  await expect(heading).toBeFocused();
  expect(
    await heading.evaluate(
      (el) =>
        el.getBoundingClientRect().top >=
        document.querySelector(".topbar")!.getBoundingClientRect().bottom,
    ),
  ).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("tela de 320px mantém as três áreas navegáveis e desktop preserva o menu lateral", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 740 });
  await page.goto("/");
  for (const area of ["Direito", "Ensino Médio", "Programação"]) {
    await page.getByRole("button", { name: `Acessar ${area}`, exact: true }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  }
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.setViewportSize({ width: 1366, height: 900 });
  const sidebar = await page.locator(".sidebar").boundingBox();
  expect(sidebar!.x).toBe(0);
  expect(sidebar!.width).toBeLessThan(300);
  expect(sidebar!.height).toBe(900);
  await expect(page.getByRole("button", { name: "Recolher menu", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Escolher Programação com Java", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(page.locator(".lesson-list")).toBeVisible();
  await expect(page.locator(".lesson-list").getByRole("button")).toHaveCount(9);
  await expect(page.locator(".mobile-lesson-toggle")).toBeHidden();
});

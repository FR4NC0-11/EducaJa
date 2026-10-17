import { test, expect } from "@playwright/test";

for (const [subject, title, id] of [
  [
    "Matemática: contagem",
    "Estatística: média, mediana e leitura crítica",
    "em3-estatistica-medidas",
  ],
  [
    "Linguagens: interpretação",
    "Inglês: hipóteses com o second conditional",
    "em3-ingles-condicionais",
  ],
  ["Humanas: população", "Mapas: escala, projeção e leitura crítica", "em3-geografia-mapas"],
  ["Natureza: genética", "DNA, RNA e expressão gênica", "em3-genetica-expressao"],
]) {
  test(`nova aula de ${subject} salva notas e conclusão sem afetar a primeira aula`, async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
    await expect(page.getByText("26 aulas", { exact: false }).first()).toBeVisible();
    await page.getByRole("button", { name: `Estudar ${subject}`, exact: true }).click();
    await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
    await page.locator(".lesson-nav").getByRole("button").filter({ hasText: title }).click();
    await expect(page.getByRole("heading", { name: title, exact: true })).toBeVisible();
    await expect(page.getByLabel("Sua dúvida", { exact: true })).toHaveCount(0);
    await page.getByRole("button", { name: "Exercício", exact: true }).click();
    await page.getByLabel("Suas anotações").fill(`Minha tentativa para ${id}.`);
    await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
    await page.getByRole("button", { name: "Concluir aula", exact: true }).click();
    await page.reload();
    await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
    await page.getByRole("button", { name: `Estudar ${subject}`, exact: true }).click();
    await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
    await expect(page.getByLabel("Suas anotações")).toHaveValue("");
    await page.locator(".lesson-nav").getByRole("button").filter({ hasText: title }).click();
    await expect(page.getByLabel("Suas anotações")).toHaveValue(`Minha tentativa para ${id}.`);
    await expect(
      page.getByRole("button", { name: "Marcar como não concluída", exact: true }),
    ).toBeVisible();
    const saved = (await (await page.request.get("/api/workspace")).json()).session;
    expect(saved.completed_lessons).toEqual([id]);
    expect(Object.keys(saved.notes)).toEqual([id]);
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  });
}

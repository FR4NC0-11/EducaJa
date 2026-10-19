import { test, expect } from "@playwright/test";

test("atalho de Programação chega às matérias, filtra e preserva a aula ao trocar de área", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByText("45 aulas · 5 matérias", { exact: true })).toBeVisible();
  for (const width of [1280, 900, 390]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
  }
  await page.getByRole("link", { name: "Explorar matérias", exact: true }).click();
  const heading = page.getByRole("heading", { name: "Escolha por onde começar", exact: true });
  await expect(heading).toBeFocused();
  expect(
    await heading.evaluate(
      (el) =>
        el.getBoundingClientRect().top >=
        document.querySelector(".topbar")!.getBoundingClientRect().bottom,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Sites", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(1);
  await page.getByRole("button", { name: "Escolher Criação de sites", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Interface apresenta; regra valida.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  const before = (await (await page.request.get("/api/workspace")).json()).session;
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  expect(
    await page
      .locator(".app-shell")
      .evaluate((el) => getComputedStyle(el).getPropertyValue("--programming-mint").trim()),
  ).toBe("");
  expect((await (await page.request.get("/api/workspace")).json()).session).toEqual(before);
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Continuar estudando", exact: true }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Interface apresenta; regra valida.");
  await page.setViewportSize({ width: 1366, height: 900 });
  await page.getByRole("button", { name: "Plano de estudo", exact: true }).click();
  await expect(page.locator(".trail-panel")).toBeVisible();
});

import { test, expect } from "@playwright/test";

test("entrada separa áreas e Ensino Médio não oferece aulas ou professor antecipados", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Qual área você quer acessar?" })).toBeVisible();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(0);
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Ensino Médio", exact: true })).toBeVisible();
  for (const name of ["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"])
    await expect(page.getByRole("heading", { name, exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Conteúdos em preparação" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Principal" })).toHaveCount(0);
  await expect(page.getByLabel("Sua dúvida", { exact: true })).toHaveCount(0);
  await expect(page.locator("#main-content")).toBeFocused();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: /^Escolher / })).toHaveCount(4);
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

import { test, expect } from "@playwright/test";

test("entrada de computador mostra destinos na primeira tela e mantém acesso por teclado", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Qual área você quer acessar?", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".sidebar")).toBeHidden();
  await expect(page.getByRole("button", { name: "Recolher menu", exact: true })).toBeHidden();
  await expect(page.locator(".entry-programming")).toContainText("45 aulas · 5 matérias");
  await expect(page.locator(".entry-secondary")).toContainText("60 aulas · 4 matérias");
  await expect(page.locator(".entry-law .entry-availability")).toContainText("aulas em preparação");
  for (const area of ["Programação", "Ensino Médio", "Direito"]) {
    const button = page.getByRole("button", { name: `Acessar ${area}`, exact: true });
    const box = await button.boundingBox();
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.y).toBeGreaterThan(0);
    expect(box!.y + box!.height).toBeLessThanOrEqual(720);
  }
  for (const width of [900, 701]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.getByRole("button", { name: "Acessar Direito", exact: true })).toBeVisible();
  }
  await page.setViewportSize({ width: 1366, height: 900 });
  const before = (await (await page.request.get("/api/workspace")).json()).session;
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".sidebar")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Escolher Programação com Java", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await expect(page.locator(".sidebar")).toBeHidden();
  await page.getByRole("button", { name: "Acessar Direito", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Direito.", exact: true })).toBeVisible();
  expect((await (await page.request.get("/api/workspace")).json()).session).toEqual(before);
});

import { test, expect } from "@playwright/test";

test("T.I. oferece Git Bash guiado, imagem real e progresso independente", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "T.I.", exact: true }).click();
  await expect(page.locator(".topic-card")).toHaveCount(1);
  await page.getByRole("button", { name: "Escolher T.I. e versionamento", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "T.I.: leia o projeto antes de programar", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Git, GitHub e sua primeira cópia do projeto/ }).click();
  const terminal = page.getByRole("region", { name: "Demonstração de Git Bash" });
  await expect(
    terminal.getByRole("button", { name: "Comando anterior", exact: true }),
  ).toBeDisabled();
  await expect(terminal.locator("pre")).toContainText("pwd");
  await terminal.getByRole("button", { name: "Próximo comando", exact: true }).click();
  await expect(terminal.locator("pre")).toContainText("git status");
  await terminal.getByRole("button", { name: "Próximo comando", exact: true }).click();
  await expect(
    terminal.getByRole("button", { name: "Próximo comando", exact: true }),
  ).toBeDisabled();
  const img = page.getByRole("img", { name: /Captura real.*menu de branches/ });
  await expect(img).toBeVisible();
  await expect
    .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
    .toBeGreaterThan(0);
  await page
    .getByLabel("Suas anotações")
    .fill("Git local funciona sem internet; GitHub remoto exige rede.");
  await page.getByRole("button", { name: "Salvar anotação", exact: true }).click();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByRole("button", { name: "Continuar estudando", exact: true }).click();
  await page.getByRole("button", { name: /Git, GitHub e sua primeira cópia do projeto/ }).click();
  await expect(page.getByLabel("Suas anotações")).toHaveValue(
    "Git local funciona sem internet; GitHub remoto exige rede.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("button", { name: /Commits que explicam uma mudança/ }).click();
  await expect(terminal.locator("pre")).toContainText("git commit");
  await expect(
    terminal.getByRole("button", { name: "Comando anterior", exact: true }),
  ).toBeDisabled();
});

test("roteiro SAEP abre T.I. e registra seu diagnóstico de dez questões", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page.getByText("Preparação prática para o SAEP", { exact: true }).click();
  await page.getByRole("button", { name: "Praticar T.I. e versionamento", exact: true }).click();
  await page.getByRole("button", { name: "Fazer teste inicial (opcional)", exact: true }).click();
  for (let i = 0; i < 10; i++) {
    await expect(page.getByText(`QUESTÃO ${String(i + 1).padStart(2, "0")} / 10`)).toBeVisible();
    await page.getByLabel("Sua resposta", { exact: true }).fill(`Questão ${i + 1}: ainda não sei.`);
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
  await page.getByRole("button", { name: "Teste inicial", exact: true }).click();
  await expect(page.getByText("10 de 10 salvas")).toBeVisible();
});

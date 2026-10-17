import { test, expect, type Page } from "@playwright/test";
import { mkdirSync } from "node:fs";
async function openLesson(page: Page, topicId: string, lesson?: string) {
  const workspace = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/workspace") && response.request().method() === "GET",
  );
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await workspace;
  const response = await page.request.post("/api/workspace", {
    headers: { Origin: "http://localhost:3002" },
    data: { kind: "start", topicId, goal: "Verificar prática didática" },
  });
  expect(response.ok()).toBeTruthy();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Aulas", exact: true })
    .click();
  if (lesson)
    await page
      .locator(".lesson-nav")
      .getByRole("button", { name: new RegExp(lesson) })
      .click();
}
test("Web: formulário valida sem enviar dados e catálogo mantém o carrinho ao filtrar", async ({
  page,
}) => {
  await openLesson(page, "web-fundamentos");
  const lab = page.getByRole("region", { name: "Laboratório interativo" });
  await lab.getByRole("button", { name: "Enviar exemplo", exact: true }).click();
  await expect(lab.getByRole("alert")).toContainText("Preencha o nome");
  await lab.getByRole("button", { name: "Preencher exemplo" }).click();
  await lab.getByRole("button", { name: "Enviar exemplo", exact: true }).click();
  await expect(lab.getByRole("status")).toContainText("Nenhuma conta real");
  await page
    .locator(".lesson-nav")
    .getByRole("button", { name: /DOM e eventos/ })
    .click();
  await lab.getByLabel("Buscar componentes").fill("sensor");
  await lab.getByRole("button", { name: "Adicionar Sensor de luz" }).click();
  await lab.getByLabel("Buscar componentes").fill("inexistente");
  await expect(lab.getByText("Nenhum componente encontrado.", { exact: false })).toBeVisible();
  await expect(lab.getByText("Carrinho de exemplo: 1 item.")).toBeVisible();
  await lab.getByRole("button", { name: "Reiniciar exemplo" }).click();
  await expect(lab.getByText("Carrinho de exemplo: 0 itens.")).toBeVisible();
  mkdirSync(".cache", { recursive: true });
  await page.screenshot({ path: ".cache/web-lab-desktop.png", fullPage: true });
});
test("Web: requisição simulada apresenta falha recuperável e layout muda de largura", async ({
  page,
}) => {
  await openLesson(page, "web-fundamentos", "API, carregamento");
  const lab = page.getByRole("region", { name: "Laboratório interativo" });
  await lab.getByLabel("Simular falha").check();
  await lab.getByRole("button", { name: "Carregar dados" }).click();
  await expect(lab.getByRole("button", { name: "Carregando…" })).toBeDisabled();
  await expect(lab.getByRole("alert")).toContainText("Falha simulada");
  await lab.getByLabel("Simular falha").uncheck();
  await lab.getByRole("button", { name: "Tentar novamente" }).click();
  await expect(lab.getByText("Dados fictícios carregados.")).toBeVisible();
  await page
    .locator(".lesson-nav")
    .getByRole("button", { name: /Projeto: portal/ })
    .click();
  await lab.getByRole("button", { name: "Largura estreita" }).click();
  expect(
    await lab.locator(".demo-viewport").evaluate((el) => el.getBoundingClientRect().width),
  ).toBeLessThanOrEqual(280);
  await expect(lab.getByText("HTML semântico", { exact: true })).toBeVisible();
});
test("Java e SQL: objetos preservam regras e LEFT JOIN mantém o aluno sem matrícula", async ({
  page,
}) => {
  await openLesson(page, "java-poo", "Proteja o estado");
  let lab = page.getByRole("region", { name: "Laboratório interativo" });
  await lab.getByLabel("Valor em reais").fill("20");
  await lab.getByRole("button", { name: "Sacar do objeto" }).click();
  await expect(lab.getByRole("status")).toContainText("saldo foi preservado");
  await lab.getByRole("button", { name: "Depositar no objeto" }).click();
  await expect(lab.locator("article").filter({ hasText: "Conta A" })).toContainText("30,00");
  await expect(lab.locator("article").filter({ hasText: "Conta B" })).toContainText("10,00");
  await openLesson(page, "postgresql", "Faça perguntas com SQL");
  lab = page.getByRole("region", { name: "Laboratório interativo" });
  await expect(lab.getByRole("cell", { name: "Carla", exact: true })).toBeVisible();
  await lab.getByLabel("Consulta de exemplo").selectOption("inner");
  await expect(lab.getByRole("cell", { name: "Carla", exact: true })).toHaveCount(0);
  await lab.getByLabel("Consulta de exemplo").selectOption("count");
  await expect(lab.getByRole("row").filter({ hasText: "Carla" })).toContainText("0");
});
test("IoT: leitura antiga é identificada sem acionar hardware e roteiro Cisco tem critérios", async ({
  page,
}) => {
  await openLesson(page, "iot-fundamentos");
  const lab = page.getByRole("region", { name: "Laboratório interativo" });
  await lab.getByLabel(/Temperatura do ambiente/).fill("32");
  await expect(lab.locator("article").filter({ hasText: "Ventilador" })).toContainText("Ligado");
  await lab.getByLabel("Comunicação conectada").uncheck();
  await lab.getByLabel(/Temperatura do ambiente/).fill("15");
  await expect(lab.locator("article").filter({ hasText: "Leitura recebida" })).toContainText(
    "32 °C",
  );
  await expect(lab.getByRole("status")).toContainText("último valor preservado");
  await expect(lab.locator("article").filter({ hasText: "Ventilador" })).toContainText("Desligado");
  await page
    .locator(".lesson-nav")
    .getByRole("button", { name: /Packet Tracer: casa/ })
    .click();
  await page
    .getByText("Prática guiada: Cisco Packet Tracer — Home Gateway", { exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "Como conferir o resultado" })).toBeVisible();
  await expect(
    page.getByText("Selecione Home Gateway como servidor IoT da lâmpada.", { exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  mkdirSync(".cache", { recursive: true });
  await page.screenshot({ path: ".cache/iot-lab-mobile.png", fullPage: true });
});

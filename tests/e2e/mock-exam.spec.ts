import { test, expect } from "@playwright/test";
import { examBank, examStorageKey } from "../../lib/mock-exam";

test("aba escolar inicia 20 questões mistas sem repetição e preserva a ordem após recarregar", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Programação", exact: true }).click();
  await expect(page.getByRole("button", { name: "Simulados", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Trocar de área", exact: true }).click();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.getByLabel("Quantidade de questões")).toHaveValue("20");
  await expect(page.getByLabel("Matéria", { exact: true })).toHaveValue("all");
  const before = (await (await page.request.get("/api/workspace")).json()).session;
  await page.getByRole("button", { name: "Iniciar simulado", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Questão 1 de 20", exact: true })).toBeFocused();
  await expect(
    page.getByRole("navigation", { name: "Navegar pelas questões" }).getByRole("button"),
  ).toHaveCount(20);
  const firstPrompt = await page.locator(".exam-options legend").innerText();
  const optionOrder = await page.locator(".exam-option").allTextContents();
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.getByRole("radio").first()).toBeChecked();
  await page.reload();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.locator(".exam-options legend")).toHaveText(firstPrompt);
  expect(await page.locator(".exam-option").allTextContents()).toEqual(optionOrder);
  await expect(page.getByRole("radio").first()).toBeChecked();
  const prompts = new Set<string>();
  const metadata: string[] = [];
  for (let i = 0; i < 20; i++) {
    prompts.add(await page.locator(".exam-options legend").innerText());
    metadata.push(await page.locator(".exam-meta").innerText());
    if (i < 19) await page.getByRole("button", { name: "Próxima questão", exact: true }).click();
  }
  expect(prompts.size).toBe(20);
  for (const subject of ["Matemática", "Linguagens", "Ciências Humanas", "Ciências da Natureza"])
    expect(metadata.filter((m) => m.startsWith(subject))).toHaveLength(5);
  for (const level of ["Fácil", "Intermediária", "Difícil"])
    expect(metadata.some((m) => m.includes(level))).toBe(true);
  expect((await (await page.request.get("/api/workspace")).json()).session).toEqual(before);
});

test("quantidade por matéria, correção embaralhada, branco e finalização persistente", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await page.getByLabel("Matéria", { exact: true }).selectOption("em3-matematica-contagem");
  for (const invalid of ["0", "21", "2.5", ""]) {
    await page.getByLabel("Quantidade de questões").fill(invalid);
    await expect(
      page.getByRole("button", { name: "Iniciar simulado", exact: true }),
    ).toBeDisabled();
  }
  await page.getByLabel("Quantidade de questões").fill("3");
  await page.getByRole("button", { name: "Iniciar simulado", exact: true }).click();
  await expect(page.getByText("Resposta correta:", { exact: true })).toHaveCount(0);
  for (let index = 0; index < 2; index++) {
    const prompt = await page.locator(".exam-options legend").innerText();
    const q = examBank.find((q) => q.prompt === prompt)!;
    expect(q.topicId).toBe("em3-matematica-contagem");
    const choice =
      index === 0
        ? q.options.find((o) => o.id === q.correct)!
        : q.options.find((o) => o.id !== q.correct)!;
    await page
      .locator(".exam-option")
      .filter({ has: page.getByText(choice.text, { exact: true }) })
      .getByRole("radio")
      .check();
    await page.getByRole("button", { name: "Próxima questão", exact: true }).click();
  }
  await page.getByRole("button", { name: "Finalizar simulado", exact: true }).click();
  await expect(page.getByRole("region", { name: "Confirmar ação" })).toContainText(
    "1 questão(ões) em branco",
  );
  await page.getByRole("button", { name: "Continuar nesta tentativa", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Questão 3 de 3", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Finalizar simulado", exact: true }).click();
  await page.getByRole("button", { name: "Confirmar finalização", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Resultado do simulado", exact: true }),
  ).toBeFocused();
  await expect(
    page.getByRole("list", { name: "Resumo do resultado" }).getByRole("listitem"),
  ).toHaveText(["Acertos: 1", "Erros: 1", "Em branco: 1"]);
  await expect(page.getByText(/Você acertou/)).toContainText("1 de 3");
  await page.locator(".exam-review summary").first().click();
  await expect(page.locator(".exam-review").first()).toContainText("Aula para revisar:");
  await expect(page.getByRole("radio")).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.reload();
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Resultado do simulado", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Novo simulado", exact: true }).click();
  await page.getByRole("button", { name: "Confirmar descarte", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Monte seu simulado", exact: true }),
  ).toBeVisible();
});

test("estado local inválido não trava a aba e rascunho de aula bloqueia a troca", async ({
  page,
}) => {
  await page.addInitScript((key) => localStorage.setItem(key, '{"version":99}'), examStorageKey);
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("tentativa anterior era incompatível");
  await page.getByRole("button", { name: "Voltar aos assuntos", exact: true }).click();
  await page.getByRole("button", { name: "Estudar Matemática: contagem", exact: true }).click();
  await page.getByRole("button", { name: "Começar a estudar", exact: true }).click();
  await page.getByLabel("Suas anotações").fill("Não perder esta anotação.");
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await expect(page.locator(".feedback").getByRole("alert")).toContainText(
    "Salve sua resposta ou anotação",
  );
  await expect(page.getByLabel("Suas anotações")).toHaveValue("Não perder esta anotação.");
});

test("falha de armazenamento é informada e não impede responder ou finalizar", async ({ page }) => {
  await page.addInitScript((key) => {
    const set = Storage.prototype.setItem;
    Storage.prototype.setItem = function (k, v) {
      if (k === key) throw new DOMException("test-only quota", "QuotaExceededError");
      set.call(this, k, v);
    };
  }, examStorageKey);
  await page.goto("/");
  await page.getByRole("button", { name: "Acessar Ensino Médio", exact: true }).click();
  await page.getByRole("button", { name: "Simulados", exact: true }).click();
  await page.getByLabel("Quantidade de questões").fill("1");
  await page.getByRole("button", { name: "Iniciar simulado", exact: true }).click();
  await expect(page.locator(".exam-storage")).toContainText("Não foi possível salvar");
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Limpar resposta", exact: true }).click();
  await expect(page.getByRole("radio").first()).not.toBeChecked();
  await page.getByRole("button", { name: "Finalizar simulado", exact: true }).click();
  await page.getByRole("button", { name: "Confirmar finalização", exact: true }).click();
  await expect(page.getByRole("list", { name: "Resumo do resultado" })).toContainText(
    "Em branco: 1",
  );
});

import { test, expect } from "@playwright/test";

test("diagnóstico, caderno e trilha persistem após recarregar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Seu próximo passo começa aqui." })).toBeVisible();
  await page.getByRole("button", { name: /Back-end Java e orientação a objetos/ }).click();
  await page
    .getByLabel("O que você quer aprender ou resolver?")
    .fill("Quero entender objetos para a prova.");
  await page.getByRole("button", { name: "Começar meu diagnóstico" }).click();
  for (let i = 0; i < 10; i++) {
    await expect(page.getByText(`QUESTÃO ${String(i + 1).padStart(2, "0")} / 10`)).toBeVisible();
    await page
      .getByLabel("Seu raciocínio", { exact: true })
      .fill(`Resposta ${i + 1}: ainda estou aprendendo esse conceito.`);
    await page
      .getByRole("button", { name: i === 9 ? "Salvar resposta" : "Salvar e continuar" })
      .click();
  }
  await page.getByRole("button", { name: "Concluir diagnóstico", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Diagnóstico registrado", exact: true }),
  ).toBeDisabled();
  await page.reload();
  await page.getByRole("button", { name: /Meu diagnóstico/ }).click();
  await expect(page.getByText("10 de 10 salvas")).toBeVisible();
  await expect(page.getByLabel("Seu raciocínio", { exact: true })).toHaveValue(
    "Resposta 1: ainda estou aprendendo esse conceito.",
  );
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Professor virtual" })
    .click();
  await page.getByRole("button", { name: "Uma analogia" }).click();
  await expect(page.getByText(/A classe é como a planta/)).toBeVisible();
  await page
    .getByLabel("Seu caderno de raciocínio")
    .fill("Uma classe descreve a estrutura; o objeto é uma instância.");
  await page.getByRole("button", { name: "Salvar anotação" }).click();
  await page.getByRole("button", { name: "Concluir etapa", exact: true }).click();
  await page.reload();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByRole("button", { name: "Professor virtual" })
    .click();
  await expect(page.getByLabel("Seu caderno de raciocínio")).toHaveValue(
    "Uma classe descreve a estrutura; o objeto é uma instância.",
  );
  await expect(page.getByRole("button", { name: "Marcar para revisar" })).toBeVisible();
  await page.getByRole("button", { name: "Minha trilha", exact: true }).last().click();
  await expect(page.getByText("1/3 concluídas")).toBeVisible();
});

test("API isola navegadores, bloqueia origem externa e não conclui diagnóstico incompleto", async ({
  playwright,
}) => {
  const origin = "http://localhost:3000";
  const first = await playwright.request.newContext({ baseURL: origin });
  const second = await playwright.request.newContext({ baseURL: origin });
  await first.get("/api/workspace");
  const blocked = await first.post("/api/workspace", {
    headers: { Origin: "https://outro.example" },
    data: { kind: "start", topicId: "postgresql", goal: "Estudar" },
  });
  expect(blocked.status()).toBe(403);
  const start = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "start", topicId: "postgresql", goal: "Estudar SQL" },
  });
  expect(start.ok()).toBeTruthy();
  const incomplete = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "submit", topicId: "postgresql" },
  });
  expect(incomplete.status()).toBe(400);
  const saves = await Promise.all(
    [0, 1].map((index) =>
      first.post("/api/workspace", {
        headers: { Origin: origin },
        data: {
          kind: "answer",
          topicId: "postgresql",
          index,
          text: `Resposta concorrente ${index}`,
        },
      }),
    ),
  );
  expect(saves.every((response) => response.ok())).toBeTruthy();
  const saved = (await (await first.get("/api/workspace")).json()).session.answers;
  expect(saved["0"]).toBe("Resposta concorrente 0");
  expect(saved["1"]).toBe("Resposta concorrente 1");
  expect((await (await second.get("/api/workspace")).json()).session).toBeNull();
  const invalid = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "answer", topicId: "postgresql", index: 11, text: "inválida" },
  });
  expect(invalid.status()).toBe(400);
  const invalidLesson = await first.post("/api/workspace", {
    headers: { Origin: origin },
    data: { kind: "lesson", topicId: "postgresql", lessonId: "objetos", done: true },
  });
  expect(invalidLesson.status()).toBe(400);
  await first.dispose();
  await second.dispose();
});

test("layout funciona em celular sem ultrapassar a tela", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "O que vamos aprender?" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  await page.getByRole("button", { name: "Front-end", exact: true }).click();
  await expect(page.getByRole("button", { name: /Front-end Fundamentos da web/ })).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Back-end Java e orientação a objetos/ }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: /Front-end Fundamentos da web/ }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await expect(page.getByLabel("O que você quer aprender ou resolver?")).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(page.getByRole("button", { name: "Fechar", exact: true })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  // Empty goal disables submission, so the last enabled field is the textarea.
  await expect(page.getByLabel("O que você quer aprender ou resolver?")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "../lib/password";
import { modelResponse } from "../lib/gemini-teacher";
import { validateEvaluation, evaluationJsonSchema } from "../lib/teacher-contract";
import { topics } from "../lib/catalog";

test("senhas usam salts diferentes e rejeitam senha incorreta e hash inválido", async () => {
  const password = "frase sintética para teste 123";
  const first = await hashPassword(password),
    second = await hashPassword(password);
  assert.notEqual(first, second);
  assert.ok(await verifyPassword(password, first));
  assert.equal(await verifyPassword("outra frase", first), false);
  assert.equal(await verifyPassword(password, "hash-inválido"), false);
});

function result() {
  return {
    grades: Array.from({ length: 10 }, (_, index) => ({
      index,
      concepts: 3,
      application: 2,
      reasoning: 1,
      clarity: 1,
      feedback: "Feedback sintético; não representa avaliação de IA.",
    })),
    summary: "Resumo sintético para testar o contrato.",
    lessonOrder: topics[0].lessons.map((lesson) => lesson.id),
  };
}
test("avaliação soma critérios e rejeita notas, índices e aulas inválidas", () => {
  assert.equal(validateEvaluation(result(), topics[0], "fixture").average, 7);
  const duplicate = result();
  duplicate.grades[1].index = 0;
  assert.throws(() => validateEvaluation(duplicate, topics[0], "fixture"));
  const badScore = result();
  badScore.grades[0].concepts = 5;
  assert.throws(() => validateEvaluation(badScore, topics[0], "fixture"));
  const badPlan = result();
  badPlan.lessonOrder[0] = "aula-que-nao-existe";
  assert.throws(() => validateEvaluation(badPlan, topics[0], "fixture"));
});

test("adaptador Gemini envia contexto, histórico e esquema JSON sem expor a chave na URL", async () => {
  let sent: Record<string, unknown> = {};
  const config = {
    apiKey: "test-not-a-real-key",
    model: "fixture-model",
    fetcher: (async (url, init) => {
      assert.equal(
        url,
        "https://generativelanguage.googleapis.com/v1beta/models/fixture-model:generateContent",
      );
      assert.equal(
        (init?.headers as Record<string, string>)["x-goog-api-key"],
        "test-not-a-real-key",
      );
      sent = JSON.parse(String(init?.body));
      return Response.json({
        modelVersion: "fixture-model",
        candidates: [
          {
            finishReason: "STOP",
            content: {
              parts: [
                { thought: true, text: "Raciocínio interno" },
                { text: JSON.stringify(result()) },
              ],
            },
          },
        ],
      });
    }) as typeof fetch,
  };
  const response = await modelResponse(
    {
      instructions: "Regras de teste",
      messages: [
        { role: "user", content: "Dados sintéticos" },
        { role: "assistant", content: "Histórico" },
        { role: "user", content: "Dúvida" },
      ],
      schema: evaluationJsonSchema(topics[0]),
    },
    config,
  );
  assert.deepEqual(
    (sent.contents as { role: string }[]).map((item) => item.role),
    ["user", "model", "user"],
  );
  assert.equal(
    (sent.generationConfig as { responseMimeType: string }).responseMimeType,
    "application/json",
  );
  assert.deepEqual(
    (sent.generationConfig as { responseJsonSchema: object }).responseJsonSchema,
    evaluationJsonSchema(topics[0]),
  );
  assert.equal(validateEvaluation(JSON.parse(response.text), topics[0], response.model).average, 7);
});

test("adaptador rejeita falha, recusa e resposta incompleta sem inventar conteúdo", async () => {
  for (const body of [
    { candidates: [{ finishReason: "MAX_TOKENS" }] },
    { promptFeedback: { blockReason: "SAFETY" } },
    { candidates: [{ finishReason: "SAFETY", content: { parts: [{ text: "parcial" }] } }] },
    { candidates: [{ finishReason: "STOP", content: { parts: [] } }] },
    {
      candidates: [
        { finishReason: "STOP", content: { parts: [{ thought: true, text: "interno" }] } },
      ],
    },
    { candidates: [] },
  ])
    await assert.rejects(() =>
      modelResponse(
        { instructions: "Teste", messages: [] },
        {
          apiKey: "test-not-a-real-key",
          model: "fixture",
          fetcher: (async () => Response.json(body)) as typeof fetch,
        },
      ),
    );
  await assert.rejects(() =>
    modelResponse(
      { instructions: "Teste", messages: [] },
      {
        apiKey: "test-not-a-real-key",
        model: "fixture",
        fetcher: (async () => new Response("indisponível", { status: 429 })) as typeof fetch,
      },
    ),
  );
});

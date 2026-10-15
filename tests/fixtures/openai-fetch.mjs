// Test-process-only interception. The application has no flag that enables this fixture.
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url) !== "https://api.openai.com/v1/responses") return realFetch(url, options);
  const body = JSON.parse(options.body);
  if (body.model !== "fixture-model") throw new Error("Fixture requires a synthetic model");
  const input = body.input.at(-1)?.content ?? "";
  if (input.includes("fixture-incomplete"))
    return Response.json({ status: "incomplete", model: "fixture-model", output: [] });
  const context = JSON.parse(body.input[0].content.split("\n").slice(1).join("\n"));
  if (JSON.stringify(context).includes("fixture-slow"))
    await new Promise((resolve) => setTimeout(resolve, 1200));
  const text = body.text?.format
    ? JSON.stringify({
        grades: Array.from({ length: 10 }, (_, index) => ({
          index,
          concepts: 3,
          application: 2,
          reasoning: 1,
          clarity: 1,
          feedback: "Feedback sintético para testar persistência. Não é uma correção real.",
        })),
        summary: "Resumo sintético do provedor de teste, sem avaliação pedagógica real.",
        lessonOrder: context.availableLessons.map((lesson) => lesson.id).reverse(),
      })
    : "Resposta sintética de teste: um sensor mede algo do ambiente. Que medida seu projeto precisa?";
  return Response.json({
    status: "completed",
    model: "fixture-model",
    output: [{ type: "message", content: [{ type: "output_text", text }] }],
  });
};

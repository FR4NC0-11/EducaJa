// Test-process-only interception. The application has no flag that enables this fixture.
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (
    String(url) !==
    "https://generativelanguage.googleapis.com/v1beta/models/fixture-model:generateContent"
  )
    return realFetch(url, options);
  const body = JSON.parse(options.body);
  const input = body.contents.at(-1)?.parts[0].text ?? "";
  if (input.includes("fixture-incomplete"))
    return Response.json({ candidates: [{ finishReason: "MAX_TOKENS" }] });
  const context = JSON.parse(body.contents[0].parts[0].text.split("\n").slice(1).join("\n"));
  if (JSON.stringify(context).includes("fixture-slow"))
    await new Promise((resolve) => setTimeout(resolve, 1200));
  const text = body.generationConfig?.responseJsonSchema
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
    : input.includes("fixture-lesson-evidence")
      ? JSON.stringify({ evidence: context.currentLessonEvidence })
      : "Resposta sintética de teste: um sensor mede algo do ambiente. Que medida seu projeto precisa?";
  return Response.json({
    modelVersion: "fixture-model",
    candidates: [{ finishReason: "STOP", content: { parts: [{ text }] } }],
  });
};

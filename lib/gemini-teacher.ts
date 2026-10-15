import { z } from "zod";
import { setTimeout as delay } from "node:timers/promises";

export function aiConfigured() {
  return process.env.AI_ENABLED === "true" && !!process.env.GEMINI_API_KEY?.trim();
}

type InputMessage = { role: "user" | "assistant"; content: string };
type ProviderConfig = { apiKey: string; model: string; fetcher: typeof fetch };

export class TeacherProviderError extends Error {
  constructor(
    message: string,
    public code = "provider_error",
    public status = 503,
  ) {
    super(message);
  }
}

export async function modelResponse(
  input: { instructions: string; messages: InputMessage[]; schema?: object },
  config: ProviderConfig = {
    apiKey: process.env.GEMINI_API_KEY?.trim() ?? "",
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    fetcher: fetch,
  },
) {
  if (!config.apiKey) throw new Error("IA não configurada");
  const deadline = AbortSignal.timeout(75000);
  let response: Response | undefined;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      response = await config.fetcher(
        `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-goog-api-key": config.apiKey },
          signal: AbortSignal.any([deadline, AbortSignal.timeout(45000)]),
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: input.instructions }] },
            contents: input.messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: message.content }],
            })),
            generationConfig: {
              candidateCount: 1,
              maxOutputTokens: input.schema ? 6000 : 1600,
              thinkingConfig: { thinkingLevel: "low" },
              ...(input.schema
                ? { responseMimeType: "application/json", responseJsonSchema: input.schema }
                : {}),
            },
          }),
        },
      );
    } catch {
      if (deadline.aborted || attempt === 1)
        throw new TeacherProviderError(
          "O professor demorou mais do que o esperado para responder. Suas respostas estão salvas; tente novamente em alguns instantes.",
          "timeout_or_network",
        );
    }
    if (response && ![408, 500, 502, 503, 504].includes(response.status)) break;
    if (attempt === 0) {
      await response?.body?.cancel();
      response = undefined;
      try {
        await delay(1000, undefined, { signal: deadline });
      } catch {
        throw new TeacherProviderError(
          "O tempo de resposta do professor foi excedido. Tente novamente em alguns instantes.",
          "timeout",
        );
      }
    }
  }
  if (!response || (!response.ok && [408, 500, 502, 503, 504].includes(response.status)))
    throw new TeacherProviderError(
      "O Gemini está temporariamente indisponível. Tentamos novamente, mas o serviço ainda não respondeu. Suas respostas estão salvas; tente mais tarde.",
      "unavailable",
    );
  if (response.status === 429)
    throw new TeacherProviderError(
      "O limite do Gemini foi atingido. Aguarde e tente novamente; suas aulas continuam disponíveis.",
    );
  if ([400, 401, 403, 404].includes(response.status))
    throw new TeacherProviderError(
      "O Gemini não liberou este pedido. Confira a chave, o modelo e as permissões na configuração do servidor.",
    );
  if (!response.ok) throw new Error("O serviço de IA não respondeu. Tente novamente depois.");
  const raw = await response.json();
  if (raw?.promptFeedback?.blockReason)
    throw new TeacherProviderError(
      "O Gemini não conseguiu responder a esse conteúdo. Tente reformular a pergunta; suas respostas continuam salvas.",
      "blocked",
    );
  if (
    raw?.candidates?.some(
      (candidate: { finishReason?: string }) => candidate.finishReason === "MAX_TOKENS",
    )
  )
    throw new TeacherProviderError(
      "A resposta do professor ficou incompleta e não foi salva como avaliação. Tente novamente em alguns instantes.",
      "incomplete",
      502,
    );
  const parsed = z
    .object({
      modelVersion: z.string().optional(),
      promptFeedback: z.object({ blockReason: z.string().optional() }).optional(),
      candidates: z
        .array(
          z.object({
            finishReason: z.literal("STOP"),
            content: z.object({
              parts: z.array(
                z.object({ text: z.string().optional(), thought: z.boolean().optional() }),
              ),
            }),
          }),
        )
        .length(1),
    })
    .safeParse(raw);
  if (!parsed.success)
    throw new TeacherProviderError(
      "O Gemini retornou uma resposta que não pôde ser concluída. Tente novamente; suas respostas estão salvas.",
      "invalid_response",
      502,
    );
  const body = parsed.data;
  if (body.promptFeedback?.blockReason)
    throw new Error("A IA não conseguiu responder a esse pedido.");
  const text = body.candidates[0].content.parts
    .filter((part) => !part.thought)
    .map((part) => part.text ?? "")
    .join("\n")
    .trim();
  if (!text || text.length > 30000) throw new Error("A IA retornou uma resposta inválida.");
  return { text, model: body.modelVersion || config.model };
}

import { z } from "zod";

export function aiConfigured() {
  return process.env.AI_ENABLED === "true" && !!process.env.GEMINI_API_KEY?.trim();
}

type InputMessage = { role: "user" | "assistant"; content: string };
type ProviderConfig = { apiKey: string; model: string; fetcher: typeof fetch };

export class TeacherProviderError extends Error {}

export async function modelResponse(
  input: { instructions: string; messages: InputMessage[]; schema?: object },
  config: ProviderConfig = {
    apiKey: process.env.GEMINI_API_KEY?.trim() ?? "",
    model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
    fetcher: fetch,
  },
) {
  if (!config.apiKey) throw new Error("IA não configurada");
  const response = await config.fetcher(
    `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(config.model)}:generateContent`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": config.apiKey },
      signal: AbortSignal.timeout(45000),
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
  if (response.status === 429)
    throw new TeacherProviderError(
      "O limite do Gemini foi atingido. Aguarde e tente novamente; suas aulas continuam disponíveis.",
    );
  if ([400, 401, 403, 404].includes(response.status))
    throw new TeacherProviderError(
      "O Gemini não liberou este pedido. Confira a chave, o modelo e as permissões na configuração do servidor.",
    );
  if (!response.ok) throw new Error("O serviço de IA não respondeu. Tente novamente depois.");
  const body = z
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
    .parse(await response.json());
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

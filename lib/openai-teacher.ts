import { z } from "zod";

export function aiConfigured() {
  return process.env.AI_ENABLED === "true" && !!process.env.OPENAI_API_KEY;
}
type InputMessage = { role: "user" | "assistant"; content: string };
type ProviderConfig = { apiKey: string; model: string; fetcher: typeof fetch };
export async function modelResponse(
  input: { instructions: string; messages: InputMessage[]; schema?: object },
  config: ProviderConfig = {
    apiKey: process.env.OPENAI_API_KEY ?? "",
    model: process.env.OPENAI_MODEL || "gpt-5.4",
    fetcher: fetch,
  },
) {
  if (!config.apiKey) throw new Error("IA não configurada");
  const response = await config.fetcher("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${config.apiKey}` },
    signal: AbortSignal.timeout(45000),
    body: JSON.stringify({
      model: config.model,
      store: false,
      instructions: input.instructions,
      input: input.messages,
      max_output_tokens: input.schema ? 6000 : 1600,
      reasoning: { effort: "low" },
      ...(input.schema
        ? {
            text: {
              format: {
                type: "json_schema",
                name: "educaja_diagnostic",
                strict: true,
                schema: input.schema,
              },
            },
          }
        : {}),
    }),
  });
  if (!response.ok) throw new Error("O serviço de IA não respondeu. Tente novamente depois.");
  const body = z
    .object({
      status: z.literal("completed"),
      model: z.string(),
      output: z.array(
        z.object({
          type: z.string(),
          content: z.array(z.object({ type: z.string(), text: z.string().optional() })).optional(),
        }),
      ),
    })
    .parse(await response.json());
  if (body.output.some((item) => item.content?.some((part) => part.type === "refusal")))
    throw new Error("A IA não conseguiu responder a esse pedido.");
  const text = body.output
    .filter((item) => item.type === "message")
    .flatMap((item) => item.content ?? [])
    .filter((part) => part.type === "output_text")
    .map((part) => part.text ?? "")
    .join("\n")
    .trim();
  if (!text || text.length > 30000) throw new Error("A IA retornou uma resposta inválida.");
  return { text, model: body.model };
}

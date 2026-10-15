import { NextRequest } from "next/server";
import { UserError } from "./workspace";

export async function readJson(request: NextRequest, maximum = 12000): Promise<unknown> {
  const origin = request.headers.get("origin");
  const expected = process.env.APP_ORIGIN;
  let valid = false;
  try {
    valid =
      !!origin &&
      (expected ? origin === expected : new URL(origin).host === request.headers.get("host"));
  } catch {}
  if (!valid) throw new UserError("Origem não permitida.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new UserError("Envie dados em JSON.", 415);
  const text = await request.text();
  if (Buffer.byteLength(text) > maximum)
    throw new UserError("O texto enviado é muito grande.", 413);
  try {
    return JSON.parse(text);
  } catch {
    throw new UserError("Dados inválidos.");
  }
}

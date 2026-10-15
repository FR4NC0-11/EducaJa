import { NextRequest, NextResponse } from "next/server";
import { actionSchema } from "@/lib/learning";
import { UserError, workspace } from "@/lib/workspace";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function failure(error: unknown) {
  if (error instanceof UserError)
    return NextResponse.json({ error: error.message }, { status: error.status });
  console.error("Workspace: falha ao acessar a persistência.");
  return NextResponse.json(
    { error: "Não foi possível acessar seu progresso. Verifique o banco e tente novamente." },
    { status: 503 },
  );
}
export async function GET() {
  try {
    return NextResponse.json(await workspace(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return failure(error);
  }
}
export async function POST(request: NextRequest) {
  // A browser must originate writes from this application, never a third-party site.
  const origin = request.headers.get("origin");
  const expectedOrigin = process.env.APP_ORIGIN;
  const sameOrigin = expectedOrigin
    ? origin === expectedOrigin
    : origin !== null &&
      (() => {
        try {
          return new URL(origin).host === request.headers.get("host");
        } catch {
          return false;
        }
      })();
  if (!sameOrigin) return NextResponse.json({ error: "Origem não permitida." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json"))
    return NextResponse.json({ error: "Envie dados em JSON." }, { status: 415 });
  try {
    const text = await request.text();
    if (Buffer.byteLength(text) > 12000)
      return NextResponse.json({ error: "O texto enviado é muito grande." }, { status: 413 });
    let payload: unknown;
    try {
      payload = JSON.parse(text);
    } catch {
      return NextResponse.json({ error: "Dados inválidos." }, { status: 400 });
    }
    const parsed = actionSchema.safeParse(payload);
    if (!parsed.success)
      return NextResponse.json(
        { error: "Confira os campos e o limite de caracteres." },
        { status: 400 },
      );
    return NextResponse.json(await workspace(parsed.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return failure(error);
  }
}

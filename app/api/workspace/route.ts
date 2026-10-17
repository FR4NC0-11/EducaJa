import { readJson } from "@/lib/http";
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
  try {
    const payload = await readJson(request);
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

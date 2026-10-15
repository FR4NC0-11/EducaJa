import { NextRequest, NextResponse } from "next/server";
import { readJson } from "@/lib/http";
import { teacherAction } from "@/lib/teacher-contract";
import { teach } from "@/lib/teacher";
import { UserError } from "@/lib/workspace";
export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const action = teacherAction.safeParse(await readJson(request));
    if (!action.success)
      throw new UserError("Confira o assunto e sua mensagem (até 2000 caracteres).");
    return NextResponse.json(await teach(action.data), {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof UserError ? error.message : "Não foi possível acessar o professor.",
      },
      { status: error instanceof UserError ? error.status : 503 },
    );
  }
}

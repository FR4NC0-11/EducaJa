import { NextRequest, NextResponse } from "next/server";
import { authenticate, authSchema } from "@/lib/auth";
import { readJson } from "@/lib/http";
import { UserError } from "@/lib/workspace";

export const runtime = "nodejs";
export async function POST(request: NextRequest) {
  try {
    const parsed = authSchema.safeParse(await readJson(request, 5000));
    if (!parsed.success)
      throw new UserError(
        "Confira o e-mail e os campos. A senha precisa ter de 8 a 255 caracteres e o código deve conter seis dígitos.",
      );
    const result = await authenticate(parsed.data);
    return NextResponse.json(result, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof UserError
            ? error.message
            : "Não foi possível acessar a conta. Tente novamente.",
      },
      {
        status: error instanceof UserError ? error.status : 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}

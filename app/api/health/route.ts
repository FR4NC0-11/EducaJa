import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  try {
    await getDb().query("SELECT 1 FROM study_sessions LIMIT 1");
    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json({ status: "unavailable" }, { status: 503 });
  }
}

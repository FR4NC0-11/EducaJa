import { NextRequest, NextResponse } from "next/server";

const canonicalOrigin = "https://educa-ja.vercel.app";

export function proxy(request: NextRequest) {
  const url = request.nextUrl;
  if (
    process.env.VERCEL !== "1" ||
    process.env.VERCEL_ENV !== "production" ||
    !["GET", "HEAD"].includes(request.method) ||
    url.hostname === "educa-ja.vercel.app" ||
    !url.hostname.endsWith(".vercel.app")
  )
    return NextResponse.next();

  // Assign the path separately: a leading // must never change the destination host.
  const destination = new URL(canonicalOrigin);
  destination.pathname = url.pathname;
  destination.search = url.search;
  const response = NextResponse.redirect(destination, 307);
  response.headers.set("Cache-Control", "no-store");
  return response;
}

// Explicitly imported by test servers only. Never load this in the normal application.
import { appendFileSync, mkdirSync } from "node:fs";
const realFetch = globalThis.fetch;
globalThis.fetch = async (url, options) => {
  if (String(url) !== "https://api.resend.com/emails") return realFetch(url, options);
  if (options.headers.Authorization !== "Bearer test-email-not-a-real-key")
    throw new Error("Email fixture requires a synthetic key");
  const body = JSON.parse(options.body);
  if (body.to[0].startsWith("fail-send-")) return new Response("unavailable", { status: 503 });
  const code = /é: (\d{6})/.exec(body.text)?.[1];
  if (!code || !body.to[0].endsWith("@example.test")) throw new Error("Synthetic recipients only");
  mkdirSync(".cache", { recursive: true });
  appendFileSync(".cache/test-emails.jsonl", JSON.stringify({ email: body.to[0], code }) + "\n");
  return Response.json({ id: "synthetic-email" });
};

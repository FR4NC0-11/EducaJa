import { readFileSync } from "node:fs";
import { expect, type APIRequestContext } from "@playwright/test";
export function lastCode(email: string) {
  const messages = readFileSync(".cache/test-emails.jsonl", "utf8")
    .trim()
    .split("\n")
    .map((line) => JSON.parse(line));
  const message = messages.reverse().find((item) => item.email === email.toLowerCase());
  if (!message) throw new Error("E-mail sintético não encontrado");
  return message.code as string;
}
export async function verifyEmail(request: APIRequestContext, email: string, origin: string) {
  const response = await request.post("/api/auth", {
    headers: { Origin: origin },
    data: { kind: "verify", code: lastCode(email) },
  });
  expect(response.status()).toBe(200);
}

import test, { beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { proxy } from "../proxy";
import { readJson } from "../lib/http";

let savedEnv: NodeJS.ProcessEnv;
beforeEach(() => {
  savedEnv = { ...process.env };
});
afterEach(() => {
  process.env = savedEnv;
});
function setEnv(key: string, value: string) {
  process.env[key] = value;
}

test("produção redireciona aliases com caminho e consulta para destino fixo", () => {
  setEnv("VERCEL", "1");
  setEnv("VERCEL_ENV", "production");
  for (const method of ["GET", "HEAD"]) {
    const response = proxy(
      new NextRequest("https://educa-ja-deployment.vercel.app/aula?tema=web", {
        method,
        headers: { "x-forwarded-host": "evil.example" },
      }),
    );
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("location"), "https://educa-ja.vercel.app/aula?tema=web");
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal(response.headers.get("set-cookie"), null);
  }
  const response = proxy(
    new NextRequest("https://alias.vercel.app//evil.example/x?next=https://evil.example"),
  );
  assert.equal(new URL(response.headers.get("location")!).origin, "https://educa-ja.vercel.app");
});

test("canônico, outros hosts e métodos de escrita não são redirecionados", () => {
  setEnv("VERCEL", "1");
  setEnv("VERCEL_ENV", "production");
  for (const host of [
    "educa-ja.vercel.app",
    "localhost",
    "127.0.0.1",
    "example.com",
    "alias.vercel.app.evil.example",
  ]) {
    assert.equal(proxy(new NextRequest(`https://${host}/`)).headers.get("location"), null);
  }
  for (const method of ["POST", "PUT", "PATCH", "DELETE", "OPTIONS"]) {
    assert.equal(
      proxy(new NextRequest("https://alias.vercel.app/api/workspace", { method })).headers.get(
        "location",
      ),
      null,
    );
  }
});

test("Preview, desenvolvimento e execução fora da Vercel permanecem independentes", () => {
  for (const [vercel, environment] of [
    ["1", "preview"],
    ["1", "development"],
    ["1", ""],
    ["", "production"],
  ]) {
    setEnv("VERCEL", vercel);
    setEnv("VERCEL_ENV", environment);
    assert.equal(proxy(new NextRequest("https://alias.vercel.app/")).headers.get("location"), null);
  }
});

test("CSRF continua rejeitando Origin alternativa, externa ou ausente", async () => {
  setEnv("APP_ORIGIN", "https://educa-ja.vercel.app");
  for (const origin of ["https://alias.vercel.app", "https://evil.example", null]) {
    const headers = new Headers({ "content-type": "application/json" });
    if (origin) headers.set("origin", origin);
    await assert.rejects(
      readJson(
        new NextRequest("https://educa-ja.vercel.app/api/workspace", {
          method: "POST",
          headers,
          body: "{}",
        }),
      ),
      /Origem não permitida/,
    );
  }
  assert.deepEqual(
    await readJson(
      new NextRequest("https://educa-ja.vercel.app/api/workspace", {
        method: "POST",
        headers: { origin: "https://educa-ja.vercel.app", "content-type": "application/json" },
        body: "{}",
      }),
    ),
    {},
  );
});

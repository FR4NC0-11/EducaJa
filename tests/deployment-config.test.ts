import test from "node:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";
import { appOrigins, secureCookies } from "../lib/deployment-config.mjs";
import { cloudConfiguration } from "../scripts/cloud-config.mjs";
import { readJson } from "../lib/http";

const preview = {
  VERCEL: "1",
  VERCEL_ENV: "preview",
  VERCEL_BRANCH_URL: "educa-ja-git-new-branch-jean.vercel.app",
  VERCEL_URL: "educa-unique-jean.vercel.app",
  DATABASE_URL: "postgresql://test:synthetic@ep-example.neon.tech/educaja?sslmode=verify-full",
};
test("novas branches Preview dispensam origem manual e sempre usam cookies seguros", () => {
  assert.deepEqual(cloudConfiguration(preview).errors, []);
  assert.equal(secureCookies({ ...preview, COOKIE_SECURE: "false" }), true);
  assert.deepEqual(appOrigins({ ...preview, APP_ORIGIN: "https://old.vercel.app" }), [
    `https://${preview.VERCEL_BRANCH_URL}`,
    `https://${preview.VERCEL_URL}`,
  ]);
  assert.ok(cloudConfiguration({ ...preview, VERCEL_ENV: "production" }).errors.length);
  assert.deepEqual(
    appOrigins({ ...preview, VERCEL_ENV: "production", APP_ORIGIN: "https://educa-ja.vercel.app" }),
    ["https://educa-ja.vercel.app"],
  );
  for (const host of [
    "evil.example",
    "good.vercel.app.evil.example",
    "https://good.vercel.app",
    "good.vercel.app/path",
    "user@good.vercel.app",
    "good.vercel.app:443",
  ]) {
    const env = { ...preview, VERCEL_BRANCH_URL: host, VERCEL_URL: "" };
    assert.deepEqual(appOrigins(env), []);
    assert.ok(cloudConfiguration(env).errors.length);
  }
});
test("Preview aceita somente suas origens exatas e rejeita outros PRs, HTTP e Host forjado", async () => {
  const saved = process.env;
  process.env = { ...preview, NODE_ENV: "test" };
  try {
    for (const origin of [
      `https://${preview.VERCEL_BRANCH_URL}`,
      `https://${preview.VERCEL_URL}`,
      "https://other-pr.vercel.app",
      "https://educa-ja.vercel.app",
      "https://evil.example",
      `http://${preview.VERCEL_URL}`,
      null,
    ]) {
      const headers = new Headers({
        "content-type": "application/json",
        host: "evil.example",
        "x-forwarded-host": "evil.example",
      });
      if (origin) headers.set("origin", origin);
      const request = new NextRequest(`https://${preview.VERCEL_URL}/api/workspace`, {
        method: "POST",
        headers,
        body: "{}",
      });
      if (
        origin === `https://${preview.VERCEL_URL}` ||
        origin === `https://${preview.VERCEL_BRANCH_URL}`
      )
        assert.deepEqual(await readJson(request), {});
      else await assert.rejects(readJson(request), /Origem não permitida/);
    }
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_BRANCH_URL;
    await assert.rejects(
      readJson(
        new NextRequest("https://evil.example/api/workspace", {
          method: "POST",
          headers: {
            origin: "https://evil.example",
            host: "evil.example",
            "content-type": "application/json",
          },
          body: "{}",
        }),
      ),
      /Origem não permitida/,
    );
  } finally {
    process.env = saved;
  }
});

test("rota de progresso compartilha validação de origem com conta e professor", async () => {
  const { POST } = await import("../app/api/workspace/route");
  const saved = process.env;
  process.env = { ...preview, NODE_ENV: "test" };
  try {
    for (const [origin, status] of [
      [`https://${preview.VERCEL_BRANCH_URL}`, 400],
      ["https://other-pr.vercel.app", 403],
    ] as const) {
      const response = await POST(
        new NextRequest(`https://${preview.VERCEL_URL}/api/workspace`, {
          method: "POST",
          headers: { origin, "content-type": "application/json" },
          body: "{}",
        }),
      );
      assert.equal(response.status, status);
    }
  } finally {
    process.env = saved;
  }
});

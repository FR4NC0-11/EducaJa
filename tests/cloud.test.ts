import test from "node:test";
import assert from "node:assert/strict";
import { cloudConfiguration } from "../scripts/cloud-config.mjs";
const valid = {
  APP_ORIGIN: "https://educaja-example.vercel.app",
  COOKIE_SECURE: "true",
  DATABASE_URL:
    "postgresql://example:synthetic-password@ep-example-pooler.us-east-1.aws.neon.tech/educaja?sslmode=verify-full",
  MIGRATION_DATABASE_URL:
    "postgresql://example:synthetic-password@ep-example.us-east-1.aws.neon.tech/educaja?sslmode=verify-full",
};
test("configuração de nuvem exige HTTPS, cookie seguro, banco remoto e certificado verificado", () => {
  assert.deepEqual(cloudConfiguration(valid).errors, []);
  for (const invalid of [
    { APP_ORIGIN: "http://educaja.example" },
    { APP_ORIGIN: "https://localhost" },
    { APP_ORIGIN: "https://educaja.example/" },
    { COOKIE_SECURE: "false" },
    { NODE_TLS_REJECT_UNAUTHORIZED: "0" },
    { DATABASE_URL: "postgresql://test:secret@localhost/educaja?sslmode=verify-full" },
    { DATABASE_URL: "postgresql://test:secret@127.0.0.1/educaja?sslmode=verify-full" },
    { DATABASE_URL: valid.DATABASE_URL.replace("verify-full", "disable") },
    { AI_ENABLED: "true", GEMINI_API_KEY: "" },
  ])
    assert.ok(cloudConfiguration({ ...valid, ...invalid }).errors.length);
});
test("validação de publicação informa limites sem revelar segredos", () => {
  const result = cloudConfiguration({
    ...valid,
    DATABASE_URL: "postgresql://private-user:do-not-print-this-password@localhost/db",
  });
  assert.ok(result.warnings.some((message) => message.includes("e-mail pendente")));
  assert.equal(JSON.stringify(result).includes("do-not-print-this-password"), false);
});

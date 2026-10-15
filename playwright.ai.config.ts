import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/ai-e2e",
  workers: 1,
  reporter: "list",
  use: { baseURL: "http://localhost:3001", channel: process.env.CI ? undefined : "msedge" },
  webServer: {
    command:
      "node --import ./tests/fixtures/email-fetch.mjs --import ./tests/fixtures/gemini-fetch.mjs node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3001",
    url: "http://localhost:3001/api/health",
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      AI_ENABLED: "true",
      RESEND_API_KEY: "test-email-not-a-real-key",
      EMAIL_FROM: "EducaJá <teste@example.test>",
      GEMINI_API_KEY: "test-not-a-real-key",
      GEMINI_MODEL: "fixture-model",
      APP_ORIGIN: "http://localhost:3001",
      COOKIE_SECURE: "false",
      AI_DAILY_LIMIT: "3",
      AI_GLOBAL_DAILY_LIMIT: "30",
    },
  },
});

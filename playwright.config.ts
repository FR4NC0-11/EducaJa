import { defineConfig, devices } from "@playwright/test";
if (!process.env.CI) process.loadEnvFile(".env");

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    baseURL: "http://localhost:3002",
    ...devices["Desktop Chrome"],
    channel: process.env.CI ? undefined : "msedge",
    trace: "retain-on-failure",
  },
  reporter: "list",
  webServer: {
    command:
      "node --import ./tests/fixtures/email-fetch.mjs node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3002",
    url: "http://localhost:3002/api/health",
    reuseExistingServer: false,
    env: {
      RESEND_API_KEY: "test-email-not-a-real-key",
      EMAIL_FROM: "EducaJá <teste@example.test>",
      AI_ENABLED: "false",
      APP_ORIGIN: "http://localhost:3002",
      COOKIE_SECURE: "false",
    },
    timeout: 60000,
  },
});

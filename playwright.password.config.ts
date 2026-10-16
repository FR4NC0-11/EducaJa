import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/password-e2e",
  workers: 1,
  reporter: "list",
  use: {
    baseURL: "http://localhost:3003",
    ...devices["Desktop Chrome"],
    channel: process.env.CI ? undefined : "msedge",
  },
  webServer: {
    command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 3003",
    url: "http://localhost:3003/api/health",
    reuseExistingServer: false,
    env: {
      AUTH_EMAIL_VERIFICATION: "false",
      RESEND_API_KEY: "",
      EMAIL_FROM: "",
      AI_ENABLED: "false",
      APP_ORIGIN: "http://localhost:3003",
      COOKIE_SECURE: "false",
    },
  },
});

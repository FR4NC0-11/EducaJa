import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  workers: 1,
  use: {
    baseURL: "http://localhost:3000",
    ...devices["Desktop Chrome"],
    channel: process.env.CI ? undefined : "msedge",
    trace: "retain-on-failure",
  },
  reporter: "list",
  webServer: {
    command: "npm run start",
    url: "http://localhost:3000/api/health",
    reuseExistingServer: !process.env.CI,
    timeout: 60000,
  },
});

/**
 * App: Customer Registration Module
 * Package: config
 * File: playwright.config.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: config
 * Description: Defines Playwright settings for running smoke tests against the Next.js app.
 */
import { defineConfig, devices } from "@playwright/test";

const config = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30_000,
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000",
    trace: "on-first-retry",
    video: "retain-on-failure"
  },
  reporter: [["list"], ["html", { outputFolder: "./.playwright-report" }]],
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: {
    command: "npm run dev",
    port: 3000,
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe"
  }
});

export default config;

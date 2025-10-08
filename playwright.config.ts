/**
 * App: Customer Registration Module
 * Package: frontend
 * File: playwright.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:07:24Z
 * Exports: config
 * Description: Playwright test configuration with sensible defaults for CI and local runs.
 */
import { defineConfig, devices } from '@playwright/test';

const config = defineConfig({
  testDir: './tests/e2e',
  retries: process.env.CI ? 2 : 0,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? 'http://localhost:3000',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

export default config;

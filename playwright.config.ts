/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: playwright.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: config
 * Description: Configures Playwright to run smoke tests across Chromium with base URL detection.
 */
import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: process.env.PLAYWRIGHT_TEST_BASE_URL ?? 'http://127.0.0.1:3000',
    trace: 'retain-on-failure'
  }
};

export default config;

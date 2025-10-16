/**
 * App: Customer Registration Module
 * Package: tests/e2e
 * File: landing.spec.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: none
 * Description: Basic Playwright smoke test covering the registration landing experience.
 */
import { test, expect } from "@playwright/test";

test.describe("Landing page", () => {
  test("displays registration hero copy", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /create your customer account/i })).toBeVisible();
  });
});

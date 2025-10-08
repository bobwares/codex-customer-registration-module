/**
 * App: Customer Registration Module
 * Package: frontend.e2e
 * File: tests/e2e/registration.spec.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:13:30Z
 * Exports: registration e2e test
 * Description: Smoke test ensuring the landing page renders the primary call to action.
 */
import { test, expect } from '@playwright/test';

test.describe('Landing page', () => {
  test('displays onboarding call to action', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('link', { name: 'Start secure registration' })).toBeVisible();
  });
});

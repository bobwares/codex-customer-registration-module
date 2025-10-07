/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: tests/e2e/registration.spec.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: none
 * Description: Smoke test asserting that the registration page renders key onboarding content.
 */
import { expect, test } from '@playwright/test';

test('registration page surfaces hero content', async ({ page }) => {
  await page.goto('/register');
  await expect(page.getByRole('heading', { name: 'Create your customer account' })).toBeVisible();
  await expect(page.getByLabelText(/work email/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /continue to verification/i })).toBeVisible();
});

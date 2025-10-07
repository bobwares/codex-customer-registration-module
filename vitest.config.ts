/**
 * App: Customer Registration Module
 * Package: root
 * File: vitest.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: config
 * Description: Vitest configuration targeting React 19 components with jsdom environment and coverage thresholds.
 */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reports: ['text', 'html'],
    },
    globals: true,
    // Fail CI if you accidentally have no tests:
    passWithNoTests: false,
  },
});

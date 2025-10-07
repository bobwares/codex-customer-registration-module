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
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      reporter: ['text', 'lcov'],
      provider: 'v8',
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60
      }
    }
  }
});

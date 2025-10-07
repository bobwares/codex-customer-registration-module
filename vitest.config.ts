/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: vitest.config.ts
 * Version: 0.2.0
 * Turns: 1,2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: default (Vitest config)
 * Description: Configures Vitest for React Testing Library with jsdom and module path aliases.
 */
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      reporter: ['text', 'lcov']
    }
  },
  resolve: {
    alias: {
      '@': resolve(rootDir, 'src')
    }
  }
});

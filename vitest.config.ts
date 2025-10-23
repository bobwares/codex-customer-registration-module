/**
 * App: Customer Registration Module
 * Package: config
 * File: vitest.config.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: default
 * Description: Configures Vitest with jsdom environment and path aliases for the Next.js app.
 */
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const currentDirectory = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    coverage: {
      reporter: ["text", "json", "html"]
    }
  },
  resolve: {
    alias: {
      "@": resolve(currentDirectory, "src")
    }
  }
});

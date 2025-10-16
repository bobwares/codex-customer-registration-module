/**
 * App: Customer Registration Module
 * Package: root
 * File: vitest.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: default
 * Description: Vitest configuration for unit and integration tests executed in a jsdom environment.
 */
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [fileURLToPath(new URL("./vitest.setup.ts", import.meta.url))],
    include: ["tests/unit/**/*.test.ts?(x)", "src/**/*.test.ts?(x)"],
  },
});

/**
 * App: Customer Registration Module
 * Package: configuration
 * File: vitest.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: vitestConfig (default)
 * Description: Configures Vitest with a jsdom environment and path aliases to
 *              mirror the Next.js TypeScript setup.
 */
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

const vitestConfig = defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    coverage: {
      provider: "v8"
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});

export default vitestConfig;

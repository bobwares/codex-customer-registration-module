/**
 * App: Customer Registration Module
 * Package: frontend.lib
 * File: src/lib/env.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:08:12Z
 * Exports: getEnvConfig
 * Description: Validates runtime environment variables and exposes typed configuration values.
 */
import { z } from 'zod';

const envSchema = z.object({
  API_BASE: z.string().url().default('http://localhost:3000')
});

let cachedEnv: z.infer<typeof envSchema> | undefined;

export function getEnvConfig() {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse({
      API_BASE: process.env.API_BASE
    });
  }
  return cachedEnv;
}

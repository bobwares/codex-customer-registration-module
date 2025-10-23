/**
 * App: Customer Registration Module
 * Package: src/lib
 * File: env.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: env, Env, validateEnv
 * Description: Validates runtime environment variables with zod to ensure
 *              predictable configuration across runtimes.
 */
import { z } from "zod";

const envSchema = z.object({
  API_BASE: z
    .string()
    .url()
    .default("http://localhost:3000")
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function validateEnv(rawEnv: NodeJS.ProcessEnv = process.env): Env {
  const parsed = envSchema.safeParse({
    API_BASE: rawEnv.API_BASE ?? rawEnv.NEXT_PUBLIC_API_BASE ?? rawEnv.NEXT_PUBLIC_API_BASE_URL
  });

  if (!parsed.success) {
    throw new Error(`Invalid environment variables: ${parsed.error.message}`);
  }

  return parsed.data;
}

export const env: Env = (() => {
  if (cachedEnv) {
    return cachedEnv;
  }

  cachedEnv = validateEnv();
  return cachedEnv;
})();

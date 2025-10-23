/**
 * App: Customer Registration Module
 * Package: src/lib
 * File: env.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: envSchema, AppEnv, env
 * Description: Validates environment variables shared across client and server contexts.
 */
import { z } from "zod";

export const envSchema = z.object({
  API_BASE: z
    .string()
    .url()
    .default("http://localhost:3000")
});

export type AppEnv = z.infer<typeof envSchema>;

export const env: AppEnv = envSchema.parse({
  API_BASE: process.env.API_BASE
});

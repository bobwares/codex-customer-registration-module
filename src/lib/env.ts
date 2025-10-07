/**
 * App: Customer Registration Module
 * Package: src/lib
 * File: env.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: envSchema, Env, env
 * Description: Validates and exposes typed environment variables shared across
 *              client and server code.
 */
import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_API_BASE: z
    .string()
    .url()
    .default("http://localhost:3000")
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_BASE: process.env.NEXT_PUBLIC_API_BASE
});

if (!parsed.success) {
  console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
  throw new Error("Environment validation failed");
}

export type Env = z.infer<typeof envSchema>;

export const env: Env = parsed.data;

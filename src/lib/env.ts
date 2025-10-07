/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/lib/env.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: envSchema, env
 * Description: Validates runtime environment variables to guarantee safe defaults across server and client modules.
 */
import { z } from 'zod';

export const envSchema = z.object({
  NEXT_PUBLIC_API_BASE: z
    .string()
    .url()
    .default('http://localhost:3000')
});

export const env = envSchema.parse({
  NEXT_PUBLIC_API_BASE:
    process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:3000'
});

/**
 * App: Customer Registration Module
 * Package: src/lib
 * File: env.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: getEnv
 * Description: Utility for retrieving environment variables with sensible defaults and error transparency.
 */
const REQUIRED_KEYS = new Set(['API_BASE']);

type EnvKey = 'API_BASE';

type EnvDefaults = Partial<Record<EnvKey, string>>;

export function getEnv(key: EnvKey, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value) {
    return value;
  }

  if (REQUIRED_KEYS.has(key)) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  throw new Error(`Environment variable ${key} is undefined and no fallback was provided.`);
}

export function hydrateDefaults(defaults: EnvDefaults): Record<EnvKey, string> {
  return Array.from(REQUIRED_KEYS).reduce<Record<EnvKey, string>>((acc, current) => {
    acc[current as EnvKey] = getEnv(current as EnvKey, defaults[current as EnvKey]);
    return acc;
  }, {} as Record<EnvKey, string>);
}

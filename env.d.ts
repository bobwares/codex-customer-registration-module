/**
 * App: Customer Registration Module
 * Package: root
 * File: env.d.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: ProcessEnv
 * Description: Declares environment variable types for the Node.js runtime.
 */
declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_BASE?: string;
    readonly PLAYWRIGHT_BASE_URL?: string;
  }
}

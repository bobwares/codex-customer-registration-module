/**
 * App: Customer Registration Module
 * Package: types
 * File: env.d.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: NodeJS.ProcessEnv declaration
 * Description: Augments process environment typings and references Next.js
 *              ambient type declarations for the project.
 */
/// <reference types="next" />
/// <reference types="next/navigation-types/compat/navigation" />
/// <reference types="next/types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly API_BASE?: string;
    readonly NEXT_PUBLIC_API_BASE?: string;
    readonly NEXT_PUBLIC_API_BASE_URL?: string;
    readonly PLAYWRIGHT_TEST_BASE_URL?: string;
  }
}

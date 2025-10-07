/**
 * App: Customer Registration Module
 * Package: root
 * File: env.d.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: Type declarations
 * Description: Provides ambient Next.js type references and environment variable
 *              declarations for TypeScript tooling.
 */
/// <reference types="next" />
/// <reference types="next/image-types/global" />
/// <reference types="next/navigation-types/compat/navigation" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE?: string;
  }
}

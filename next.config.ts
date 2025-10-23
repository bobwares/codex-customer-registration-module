/**
 * App: Customer Registration Module
 * Package: config
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: config
 * Description: Configures Next.js with strict mode, typed routes, and server actions support.
 */
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: "2mb"
    }
  }
};

export default config;

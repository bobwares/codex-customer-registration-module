/**
 * App: Customer Registration Module
 * Package: config
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: config
 * Description: Configures Next.js App Router defaults including server
 *              actions, strict mode, and type safety enforcement.
 */
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

export default config;

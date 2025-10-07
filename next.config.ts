/**
 * App: Customer Registration Module
 * Package: configuration
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: config (default)
 * Description: Configures Next.js with strict runtime and enables server actions
 *              to align with the scalable App Router pattern.
 */
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: true
  }
};

export default config;

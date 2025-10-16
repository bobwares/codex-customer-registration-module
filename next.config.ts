/**
 * App: Customer Registration Module
 * Package: root
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: nextConfig
 * Description: Next.js configuration enabling App Router defaults and strict mode.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
};

export default nextConfig;

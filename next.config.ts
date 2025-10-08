/**
 * App: Customer Registration Module
 * Package: frontend
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:06:14Z
 * Exports: nextConfig
 * Description: Configures Next.js with App Router defaults, strict mode, and server action support.
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '1mb'
    }
  },
  eslint: {
    ignoreDuringBuilds: false
  },
  typescript: {
    ignoreBuildErrors: false
  }
};

export default nextConfig;

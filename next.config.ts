/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: nextConfig
 * Description: Configures the Next.js App Router project with strict mode and server actions support.
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;

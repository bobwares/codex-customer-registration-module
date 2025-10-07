/**
 * App: Customer Registration Module
 * Package: root
 * File: next.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: nextConfig
 * Description: Next.js configuration enabling App Router defaults with server actions and typed routes for the registration module UI.
 */
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
    typedRoutes: true
  }
};

export default nextConfig;

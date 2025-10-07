/**
 * App: Customer Registration Module
 * Package: root
 * File: tailwind.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: config
 * Description: Tailwind CSS configuration scanning src directory and extending the design tokens for the registration module UI.
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',
        secondary: '#7c3aed',
        accent: '#14b8a6'
      }
    }
  },
  plugins: []
};

export default config;

/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: tailwind.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: tailwindConfig
 * Description: Declares Tailwind CSS configuration for the registration experience with custom color tokens.
 */
import type { Config } from 'tailwindcss';

const tailwindConfig: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0047AB',
          50: '#f0f6ff',
          100: '#dbe9ff',
          200: '#b7d3ff',
          300: '#82b3ff',
          400: '#4f8fff',
          500: '#266dff',
          600: '#0f50d6',
          700: '#0b3ba3',
          800: '#0b357f',
          900: '#0d2d66'
        }
      }
    }
  },
  plugins: []
};

export default tailwindConfig;

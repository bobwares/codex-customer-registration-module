/**
 * App: Customer Registration Module
 * Package: frontend
 * File: tailwind.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:06:30Z
 * Exports: config
 * Description: Tailwind CSS configuration enabling utility scanning for app and component directories with extended theme tokens.
 */
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/app/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8',
          foreground: '#FFFFFF'
        },
        accent: {
          DEFAULT: '#F97316',
          foreground: '#0F172A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      boxShadow: {
        card: '0 15px 35px -15px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;

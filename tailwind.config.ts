/**
 * App: Customer Registration Module
 * Package: configuration
 * File: tailwind.config.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: tailwindConfig (default)
 * Description: Defines Tailwind CSS scanning paths and theme extensions for the
 *              registration module user interface.
 */
import type { Config } from "tailwindcss";

const tailwindConfig: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B7285",
          foreground: "#FFFFFF"
        },
        neutral: {
          50: "#F8FAFC",
          900: "#0F172A"
        }
      }
    }
  },
  plugins: []
};

export default tailwindConfig;

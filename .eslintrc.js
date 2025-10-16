/**
 * App: Customer Registration Module
 * Package: root
 * File: .eslintrc.js
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: module.exports
 * Description: ESLint configuration aligned with Next.js and TypeScript strict settings.
 */
module.exports = {
  root: true,
  extends: ["next", "next/core-web-vitals"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ]
  }
};

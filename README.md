# Customer Registration Module

A Next.js 15 application that delivers a compliant, multi-step customer onboarding experience with OTP verification, consent capture, and analytics instrumentation. Built with Tailwind CSS, server actions, and comprehensive testing using Vitest and Playwright.

## Getting Started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the marketing overview and `/register` to launch the interactive flow.

## Scripts

- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm run start` – Run the production server.
- `npm run lint` – Lint the codebase with ESLint.
- `npm run typecheck` – Run TypeScript type checks.
- `npm run test` – Execute Vitest unit tests.
- `npm run e2e` – Execute Playwright end-to-end tests (requires `npm run dev`).

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript 5.9
- Tailwind CSS 3.4
- React Hook Form + Zod for validation
- Zustand for local state coordination
- Vitest, Testing Library, Playwright for automated testing

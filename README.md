# Customer Registration Module UI

This repository hosts the Next.js App Router implementation for the Customer Registration Module. It provides a secure onboarding landing experience, Tailwind-powered design system scaffolding, and testing/tooling configuration aligned with the agentic AI pipeline governance standards.

## Getting started

```bash
npm install
npm run dev
```

## Available scripts

- `npm run dev` – start the local development server.
- `npm run build` – create an optimized production build.
- `npm run start` – run the compiled application.
- `npm run lint` – execute ESLint using the Next.js configuration.
- `npm run typecheck` – run TypeScript in no-emit mode.
- `npm run test` – run Vitest unit tests.
- `npm run e2e` – run Playwright end-to-end tests (requires local dev server).

## Project structure

- `src/app` – Next.js App Router routes and API handlers.
- `src/components` – shared presentational components.
- `src/lib` – utilities and shared configuration.
- `tests` – unit and end-to-end test suites.
- `public` – static assets served by Next.js.

## Tooling

- Next.js 15
- React 19
- Tailwind CSS 3
- TypeScript 5.9
- Vitest + Testing Library
- Playwright

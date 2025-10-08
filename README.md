# Customer Registration Module UI

This project implements the Customer Registration Module using the **Next.js Scalable (App Router + Tailwind)** application implementation pattern.

## Getting started

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the landing page. The `/register` route walks through the multi-step registration experience with mocked API endpoints.

## Available scripts

- `npm run dev` – Start the development server.
- `npm run build` – Create a production build.
- `npm run start` – Run the production build locally.
- `npm run lint` – Execute ESLint with the Next.js config.
- `npm run typecheck` – Run TypeScript in noEmit mode.
- `npm run test` / `npm run test:ci` – Execute Vitest unit tests with coverage.
- `npm run e2e` / `npm run e2e:ci` – Run Playwright smoke tests.

## Project structure

- `src/app` – App Router pages, layouts, and route handlers.
- `src/components` – Client-side UI components.
- `src/actions` – Server Actions handling mutations.
- `src/services` – Server-only modules for data fetching and API integration.
- `src/state` – Zustand stores for minimal client state.
- `tests/e2e` – Playwright end-to-end tests.

## Tooling

- Next.js 15.x with React 19.x and TypeScript 5.9.x
- Tailwind CSS 3.4 for styling
- Vitest + Testing Library for unit tests
- Playwright for browser automation
- GitHub Actions workflow for CI (lint, typecheck, tests, e2e)

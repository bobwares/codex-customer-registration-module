# Architecture Decision Record

Scaffold Next.js App Router baseline with Tailwind and testing stack

**Turn**: 1

**Status**: Accepted

**Date**: 2025-10-07 - 17:47

**Context**
The project requires a Next.js App Router implementation that aligns with the ui-nextjs application implementation pattern and provides foundations for customer registration flows.

**Options Considered**
- Use the prescribed Next.js 15 + Tailwind stack from the pattern.
- Attempt to reuse a legacy Pages Router scaffold.
- Generate a minimal static site without tooling.

**Decision**
Adopt the pattern’s recommended Next.js 15 App Router scaffold, including Tailwind CSS, linting, formatting, Vitest, and Playwright tooling. This ensures alignment with governance, supports server components, and prepares the project for future registration features.

**Result**
Created project scaffolding files (Next.js config, Tailwind setup, linting/prettier configs) and initial landing page with reusable components.

**Consequences**
- ✅ Provides compliant baseline with testing and styling infrastructure.
- ✅ Simplifies future feature delivery by using opinionated defaults.
- ⚠️ Requires Node 20 and associated dependencies for local development.

# ADR: Turn 1 – Initialize Next.js App Scaffold

## Status
Accepted

## Context
The Customer Registration Module must adopt the ui-nextjs implementation pattern. No prior
application files existed in the repository, so a foundational scaffold was required to satisfy
the pattern’s authoritative file list, enforce governance metadata headers, and enable linting,
testing, and CI automation.

## Decision
Generate the minimal Next.js 15 App Router project structure with Tailwind CSS, linting,
type-checking, Vitest, and Playwright configuration files exactly as prescribed by the pattern.
All new source and infrastructure files include the mandated metadata header, and the CI
workflow standardizes quality checks.

## Consequences
- The repository now contains a runnable Next.js scaffold aligned with the ui-nextjs pattern.
- Tooling and scripts (lint, typecheck, test, e2e) are ready for future turns to execute.
- Additional domain features must follow the established structure and update metadata headers
  with new turn numbers when modified.

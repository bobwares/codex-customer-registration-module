# Architecture Decision Record — Turn 1

## Context
The ui-nextjs implementation pattern mandates an App Router Next.js 15 scaffold with Tailwind, React
Query, Zustand, Vitest, and Playwright. The project currently lacked any application source, so we
needed to determine how to bootstrap the UI while respecting governance constraints such as metadata
headers, required tooling, and health endpoints.

## Options Considered
| Option | Pros | Cons |
| ------ | ---- | ---- |
| Follow the pattern’s authoritative file list verbatim | Guarantees compliance with governance and testing expectations; aligns with downstream automation | Requires manual creation of many files with metadata headers |
| Generate a reduced Next.js skeleton and expand later | Faster to deliver initially | Violates the authoritative file list and misses required tooling |

## Decision
**Chosen**: Follow the pattern’s authoritative file list verbatim.
**Justification**: Ensures parity with the mandated Next.js scalable pattern, including testing and CI
infrastructure, while allowing future turns to focus on feature work instead of foundational setup.

## Result
**Artifacts**: package.json, tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.js,
Next.js app directory with routes and boundaries, testing configs, CI workflow, governance files.
**Recorded Artifacts (from manifest.json)**:
- changelog: changelog.md
- adr: adr.md
- diff: diff.patch
- logs: []
- reports: []
**Files Changed (from manifest.json)**:
- Added (34): .eslintrc.json, .github/workflows/ci.yml, .npmrc, .nvmrc, .prettierrc, package.json,
  tsconfig.json, next.config.ts, tailwind.config.ts, postcss.config.js, src/app/globals.css,
  src/app/layout.tsx, src/app/page.tsx, src/app/error.tsx, src/app/not-found.tsx,
  src/app/loading.tsx, src/app/api/health/route.ts, src/lib/env.ts, vitest.config.ts,
  playwright.config.ts, env.d.ts, tests/e2e/.gitkeep,
  ai/agentic-pipeline/turns/1/changelog.md, ai/agentic-pipeline/turns/1/adr.md,
  ai/agentic-pipeline/turns/1/manifest.json, ai/agentic-pipeline/turns/1/session_context_values.md,
  ai/agentic-pipeline/turns/1/diff.patch, ai/agentic-pipeline/turns/1/telemetry/decision_frames/.gitkeep,
  ai/agentic-pipeline/turns/1/telemetry/tool_runs/.gitkeep,
  ai/agentic-pipeline/turns/1/telemetry/metrics/.gitkeep,
  ai/agentic-pipeline/turns/1/telemetry/diffs/.gitkeep, ai/agentic-pipeline/turns/1/logs/.gitkeep,
  ai/agentic-pipeline/turns/1/reports/.gitkeep, ai/agentic-pipeline/turns_index.csv
- Modified (1): .gitignore
- Deleted (0): []

## Consequences
- Provides a production-ready baseline with linting, type checking, unit testing, E2E testing, and CI
  wiring from the outset.
- Future turns must flesh out actual domain features and implement tests within the established
  structure.

**Follow-ups / Tickets**:
- Add automated vitest and Playwright test suites once feature work begins.
- Populate telemetry files when automated tooling emits decision data.

## Metrics (from manifest.json)
- filesChanged: 35
- linesAdded: 1112 · linesDeleted: 20
- testsPassed: 0 · testsFailed: 0
- coverageDeltaPct: 0

## Validation
- adrPresent: true · changelogPresent: true
- lintStatus: not-run · testsStatus: not-run

## Evidence
- DecisionFrames: []
- Tool Runs: []
- Metrics: []
- Diffs: []

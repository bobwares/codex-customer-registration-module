# Architecture Decision Record

Registration Flow Composition with Server Actions + Zustand

**Turn**: 2

**Status**: Proposed

**Date**: 2025-10-08 - 00:14

**Context**
Tasks 02–05 require data fetching per route, routing topology with API mocks, minimal client state, and robust error/loading coverage for the registration journey.

**Options Considered**
- Server Actions with lightweight Zustand store to track client progress.
- Full client-side state machine with React Query mutations.
- Persisted session storage for registration state.

**Decision**
Use server-first mutations via Next.js Server Actions invoking mocked API route handlers while Zustand tracks only UI progress and metadata. Provide dedicated App Router segments for each step so links from emails can deep-link into the flow.

**Result**
Implemented `/register`, `/register/verify`, and `/register/complete` pages backed by mocked APIs, shared progress UI, and loading/error boundaries.

**Consequences**
- Keeps business logic server-side with deterministic mocks.
- Requires hydration guardrails when deep-linking; handled via prop-based prefill into the store.

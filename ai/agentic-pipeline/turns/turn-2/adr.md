# Architecture Decision Record

Custom Zod resolver to avoid external dependency limitations

**Turn**: 2

**Status**: Accepted

**Date**: 2025-10-07 - 19:46

**Context**
The preferred React Hook Form + Zod integration (`@hookform/resolvers`) could not be installed because scoped packages returned HTTP 403 responses in the execution environment.

**Options Considered**
1. Remove schema-based validation and rely on client-side checks only.
2. Implement a local Zod-powered resolver compatible with React Hook Form.

**Decision**
Implemented `createZodResolver`, a small utility mirroring the behaviour of the official resolver to retain strong validation without introducing an unavailable dependency.

**Result**
Registration forms continue to use Zod schemas for synchronous validation and error messaging while respecting environment constraints.

**Consequences**
- No external dependency is required, reducing network surface area.
- Future upgrades may need to reconcile with the official package if available.

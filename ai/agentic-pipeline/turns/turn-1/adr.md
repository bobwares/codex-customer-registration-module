# Architecture Decision Record

Metadata headers for JSON configuration files

**Turn**: 1

**Status**: Accepted

**Date**: 2025-10-07 - 19:43

**Context**
Governance requires every source, test, and IAC artifact to begin with a metadata header. JSON-based configs such as `.eslintrc.json` and `.prettierrc` do not support comments.

**Options Considered**
1. Rename configs to `.cjs`/`.js` to allow comment headers.
2. Encode metadata inside the JSON payload using a dedicated property.

**Decision**
Embed a `_metadataHeader` object inside JSON configuration files to persist required metadata without breaking the JSON syntax mandated by toolchains.

**Result**
`.eslintrc.json` and `.prettierrc` include `_metadataHeader` entries documenting governance metadata.

**Consequences**
- Tools continue to parse JSON configs without modification.
- Metadata remains queryable though not rendered as top-of-file comments.

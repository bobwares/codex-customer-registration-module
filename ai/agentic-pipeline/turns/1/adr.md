# Architecture Decision Record

Embed HealthInsurancePlan JSON-LD in Marketing Page

**Turn**: 1

**Date**: 2025-11-10 - 20:54

**Context**
The user supplied a HealthInsurancePlan JSON-LD payload that must be reflected in the UI so search engines and downstream services can ingest the structured metadata during the registration marketing experience.

**Options Considered**
- Render the JSON-LD directly inside the landing page via a `<script>` tag using `dangerouslySetInnerHTML`.
- Load the JSON-LD from a static asset file in `public/` and fetch it on the client before injecting it.
- Defer structured data entirely and only display human-readable plan details.

**Decision**
Render the JSON-LD inline within the server component so the markup is available at initial response time, aligning with the Next.js App Router pattern and guaranteeing deterministic output that matches the provided payload.

**Result**
- `src/app/page.tsx` now serializes the supplied plan object and includes it as an `application/ld+json` script.
- Supporting scaffolding (Next.js config, layout, styling) was introduced to host the page.

**Consequences**
- ✅ Structured data is immediately discoverable by crawlers without client-side execution.
- ⚠️ Any future changes to the JSON-LD must be reflected in the TypeScript object to stay synchronized.
- ⚠️ Large payloads may slightly increase HTML size, though still cacheable and compressible.

# ADR-003: Customer Identifier Strategy

- Status: Proposed
- Date: 2025-10-06
- Decision Makers: Product, Architecture, Data Privacy

## Context

The PRD confirms email as the primary identifier but leaves details of customer
ID generation and duplicate handling open. We must ensure global uniqueness,
privacy, and compatibility with downstream systems.

## Decision

- Customer Domain will issue a **surrogate customerId** (UUID v7) for every
  successful registration.
- Email remains the login identifier but is stored separately with normalization
  (lowercased, trimmed) and hashed for dedupe comparisons.
- Duplicate detection checks hashed email and optional hashed phone with leakage
  guard messaging; conflicts return error `E_DUPLICATE`.
- Downstream systems reference customers using `customerId` only; email/phone
  shared via scoped data contracts.

## Consequences

- UUID v7 preserves ordering for analytics without exposing creation rate.
- Requires hashing library consistent across services for dedupe.
- Support tooling must map `customerId` to identifier data for legitimate
  troubleshooting with appropriate permissions.
- Analytics pipelines must join on `customerId`, not raw email.

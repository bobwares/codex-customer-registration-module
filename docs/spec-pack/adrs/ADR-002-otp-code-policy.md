# ADR-002: OTP Code Length and Expiry

- Status: Proposed
- Date: 2025-10-06
- Decision Makers: Security, Compliance, App Engineering

## Context

We must select an OTP code length and expiry that balances usability, security,
and regulatory expectations. The PRD leaves this open pending decision.

## Decision

- OTP codes will be **7 digits**, numeric only, providing 10 million combinations
  and consistent UX across email and SMS.
- Default code expiry (TTL) is **5 minutes** from issuance.
- Codes become invalid immediately after a successful verification or when a new
  code is issued.
- Configuration range allows 3-10 minute TTL to satisfy region-specific policies.

## Consequences

- 7-digit codes maintain memorability while significantly reducing brute-force
  success probability versus 6-digit alternatives.
- Verification service must invalidate prior codes upon resend to avoid reuse.
- UI copy must communicate the 5-minute window and avoid revealing remaining
  validity time beyond countdown UI.
- Monitoring must alert when verification latency approaches TTL to catch
  deliverability issues.

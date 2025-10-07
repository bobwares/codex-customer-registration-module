# ADR-001: OTP Channel Policy

- Status: Proposed
- Date: 2025-10-06
- Decision Makers: Security, App Engineering, Product

## Context

The PRD requires OTP verification during registration with support for email and
SMS channels. We must define the default channel selection, fallback behavior,
and guardrails for throttling and abuse controls.

## Decision

- Default OTP delivery channel is **email** for all regions where deliverability
  meets the success SLO (≥ 98% within 60 seconds).
- When a verified phone number is provided, the system offers SMS as a fallback
  channel and allows the user to switch channels after two failed email attempts.
- OTP resend is rate-limited to 1 request per 30 seconds and 5 per hour per
  identifier; additional attempts trigger soft throttling with user messaging.
- Administrative configuration allows per-region overrides to set SMS as default
  when mandated by regulation or user behavior.

## Consequences

- Email infrastructure must integrate with high-reliability provider supporting
  deliverability SLAs.
- SMS costs are minimized by using fallback only when needed.
- UI must present channel switching controls post-failure.
- Monitoring must track per-channel success and error rates to validate the
  fallback strategy.

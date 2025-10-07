# ADR-004: Registration Data Retention

- Status: Proposed
- Date: 2025-10-06
- Decision Makers: Compliance, Data Privacy, App Engineering

## Context

We must define how long registration data, consent evidence, and telemetry are
retained to satisfy legal obligations while minimizing exposure of PII.

## Decision

- Registration session data (including pending OTPs and resume tokens) is
  retained for **72 hours** to align with decision D-003.
- Successfully completed registration records are persisted indefinitely in the
  Customer Domain but sensitive audit trails are stored separately with
  retention policies.
- Consent evidence (hash of consent copy, timestamp, jurisdiction, evidenceId) is
  retained for **7 years** to meet marketing compliance requirements.
- Telemetry logs containing pseudonymized identifiers are retained for 30 days
  online and archived for 1 year with restricted access.

## Consequences

- Data retention jobs must purge expired registration sessions nightly.
- Consent store requires lifecycle management with auditing to verify deletion.
- Privacy reviews must ensure archived telemetry remains pseudonymized and access
  is logged.

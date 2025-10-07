# Requirements Traceability Matrix (RTM)

This matrix maps every functional and non-functional requirement from the PRD to the
contracts, validations, and quality signals that ensure the requirement is implemented
and verifiable.

| Requirement ID | Description | Contracts / APIs / Schemas | Tests | Metrics & Alerts |
| --- | --- | --- | --- | --- |
| FR-1 | Account creation with email and password | POST `/register/start`, `RegisterStartRequest` & `RegisterStartResponse` schemas; PasswordPolicy schema; CustomerIdentifier schema | Gherkin S1.1 Happy Path; Unit tests for password policy + registration ID generation; Integration test for database persistence | Funnel metric `registration.start.count`; `registration.start_to_complete.rate`; Alert on 5xx > 0.2% |
| FR-2 | Two-factor verification at registration | POST `/otp/send`, `/otp/verify`; `OtpSendRequest`, `OtpVerifyRequest`; OTPPolicy schema; OTP event schemas | Gherkin S1.2 OTP Send, S1.3 OTP Verify; Unit tests for code generation and expiry; Resiliency tests for degraded provider | Metric `otp.delivery.latency.p95`; Alert on delivery success < 98% or verification success < 95%; Throttling rate |
| FR-3 | Personal information capture | POST `/register/complete`; `RegisterCompleteRequest` & Response; PersonalInfo schema | Gherkin S1.4 Complete Registration; Unit tests for validation + localization; Accessibility tests for form fields | Metric `registration.form.field_error_rate`; `registration.complete.count`; Alert on validation error spikes |
| FR-4 | Preferences and consent capture | POST `/register/complete`; Consent schema; Preferences schema; Consent event | Gherkin S1.5 Consent Required; Unit tests for timestamp/logging; Audit log integration tests | Metric `registration.consent.opt_in.rate`; Alert if consent missing vs jurisdiction policy |
| FR-5 | Duplicate detection and recovery | Error model `E_DUPLICATE`; GET `/register/status` duplicate flag; DuplicateHandling schema | Gherkin S2.1 Duplicate Attempt; Unit tests for dedupe logic; E2E test for safe messaging | Metric `registration.duplicate.attempt_rate`; Alert if leakage guard fails audit |
| FR-6 | Resend and retry policies | POST `/otp/send` rate limit headers + resend policy schema | Gherkin S2.2 Resend with Backoff; Load test for throttling; Unit tests for rate limit counters | Metric `otp.resend.count`; Alert on resend above threshold / rate limit breach |
| FR-7 | Session and state continuity | GET `/register/status`; PATCH `/register/resume`; RegistrationState schema | Gherkin S3.1 Resume Registration; Unit test for state expiry; Integration test for secure token storage | Metric `registration.resume.success_rate`; Alert if resume errors > 1% |
| FR-8 | Audit and analytics events | Event schemas `registration.started/completed/throttled/...`; Logging contracts | Gherkin S4.1 Audit Trail; Unit tests for event emission; Synthetic monitoring verifying instrumentation | Metrics `registration.event.emit.success_rate`; Alert on missing events within 5m lag |
| FR-9 | Administrative observability | Observability spec dashboards; Metrics API; Audit views | Operational runbooks acceptance tests; Dashboard snapshot review; Synthetic monitoring for metrics | Metrics enumerated in Observability spec; Alerts per KPI thresholds |
| FR-10 | Accessibility and localization | Front-end component contract; i18n JSON schema; Accessibility checklist | Gherkin S5.1 Accessibility; Automated a11y suite; Manual audits | Metric `a11y.violations.count`; Alert when >0 critical in CI |
| NFR-Performance | Page TTI, API latency budgets | Performance budgets doc; Load test profiles; OpenAPI rate-limit headers | Load tests (k6) hitting SLO thresholds; Browser performance tests | Metric `registration.api.latency.p95`; `tti.mobile.p95`; Alerts on SLO breaches |
| NFR-Reliability | Availability targets, graceful degradation | Error model, retry policy contracts, circuit breaker configuration | Chaos tests for OTP provider; Resiliency drills; Synthetic uptime checks | Metrics `registration.api.availability`; Alert when availability < 99.9% |
| NFR-Security | MFA enforcement, password policy, rate limiting | Security headers spec; PasswordPolicy schema; RateLimitToken header | STRIDE threat model validation; Static analysis; Pen-test findings tracked | Metrics `security.anomaly.count`; Alert on repeated OTP failures / brute force |
| NFR-Compliance | Consent logging, retention policy | Data retention ADR; Consent schema; Audit log storage contract | Compliance checklist; Audit log verification tests | Metrics `consent.record.missing.rate`; Alert when >0 |
| NFR-Accessibility | WCAG adherence | Accessibility test charter; UI component specs | Axe automated tests; Manual audits; Keyboard navigation tests | Metric `a11y.critical_defects`; Alert triggered in CI pipeline |
| NFR-Privacy | Data minimization, encryption | Data classification matrix; PII handling spec | Security unit tests; Encryption configuration validation; Data retention tests | Metric `pii.access.anomaly`; Alert on unauthorized access events |
| NFR-Internationalization | Locale support and readiness | Locale resource schema; Copy externalization process | Localization lint; Snapshot tests per locale | Metric `locale.coverage`; Alert on missing translations in CI |

## Traceability Notes

- Each requirement links to at least one automated test and observable metric.
- Security and compliance requirements integrate with central governance tooling via the
  observability and audit specifications.
- Contracts reference schemas in `docs/spec-pack/schemas/` and events in
  `docs/spec-pack/events/`.

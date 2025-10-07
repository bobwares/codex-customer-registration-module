# Non-Functional Requirement Budgets

This document codifies the measurable budgets for performance, reliability,
security, accessibility, and compliance for the registration module.

## Performance

| Dimension | Target | Measurement Method | Notes |
| --- | --- | --- | --- |
| Registration API latency | p95 ≤ 300 ms, p99 ≤ 600 ms | Synthetic load test at 50 rps baseline; real-time metrics from API gateway | Includes `/register/start`, `/otp/send`, `/otp/verify`, `/register/complete` |
| OTP send initiation | ≤ 500 ms p95 | Provider instrumentation + synthetic monitors | Fallback to alternate channel when > 500 ms for 3 consecutive minutes |
| Front-end Time to Interactive | ≤ 3.0 s on 3G Fast profile | Lighthouse CI in pipeline | Leverage code-splitting, skeleton loading |
| Database write throughput | 150 writes/sec sustained | Load test with failover | Budget aligns to growth forecasts + 2x headroom |

## Reliability

| Dimension | Target | Measurement | Notes |
| --- | --- | --- | --- |
| API availability | ≥ 99.9% monthly | SLO burn-rate alerts from SRE tooling | Circuit breakers for OTP provider |
| OTP verification success | ≥ 95% daily | Ratio of successful `/otp/verify` to attempts | Investigate < 95% with root cause analysis |
| OTP delivery success in 60s | ≥ 98% | Provider delivery receipts + synthetic monitors | Auto-switch to SMS if email fails per policy |
| Registration completion rate | ≥ 70% (M30), ≥ 80% (M90) | Funnel metrics from analytics warehouse | Alerts when rolling 7-day average drops below thresholds |
| Resume flow success | ≥ 90% of resume attempts complete | Tracking events vs errors | Drives FR-7 coverage |

## Security

| Control | Budget / Requirement | Validation |
| --- | --- | --- |
| Password policy | Min length 12, 1 upper, 1 lower, 1 digit, 1 symbol | Unit tests; policy linting; security review |
| OTP code TTL | 5 minutes default, configurable 3-10 minutes | Config tests; ADR-002 | |
| Rate limiting | `/register/start` 10/min per IP, `/otp/send` 5/hour per identifier | Gateway config + load tests |
| Secrets handling | No credentials in code; use managed secret store | Static analysis; secrets scanning |
| Logging | No PII beyond hashed identifiers; logs retained 30 days | Log lint + compliance review |

## Compliance & Privacy

| Control | Budget | Validation |
| --- | --- | --- |
| Consent evidence retention | 7 years (jurisdictional default) | Retention policy job; audit | Aligns with ADR-004 |
| Data minimization | Collect only mandatory PII fields at registration | Schema lint; manual review | Additional fields gated via feature flags |
| Data subject requests | Fulfill within 30 days | Ticket SLA reporting | Integration with Privacy team automation |

## Accessibility

| Metric | Budget | Validation |
| --- | --- | --- |
| Automated a11y violations | 0 critical, ≤ 5 minor per release | Axe CI + manual QA | Failure blocks release |
| Keyboard navigation | 100% actionable controls reachable | Manual audit checklist each release | |
| Color contrast | WCAG 2.1 AA compliance | Design system tokens check | |

## Observability & Alerting Budgets

- Error budget burn alerts at 2%, 5%, 10% of monthly budget with paging thresholds.
- Funnel drop alerts when step-to-step conversion decreases by >5% within 1 hour.
- OTP provider health check poll every 60 seconds with alert on 3 consecutive failures.

## Disaster Recovery

- RPO: ≤ 5 minutes (replicated database).
- RTO: ≤ 30 minutes with automated redeploy + database failover scripts.

These budgets align with SRE and compliance expectations for launch readiness.

# Observability Specification

This specification defines the metrics, logs, dashboards, and alerts needed to
observe the registration experience end-to-end.

## Metrics

| Metric Name | Type | Description | Dimensions | Owner |
| --- | --- | --- | --- | --- |
| registration.start.count | Counter | Number of `/register/start` requests accepted | environment, clientId, locale | App Engineering |
| registration.complete.count | Counter | Successful completions | environment, locale, marketingOptIn | Product Analytics |
| registration.start_to_complete.rate | Gauge | Rolling conversion rate | environment, locale | Growth PM |
| otp.delivery.latency.p95 | Gauge | P95 OTP delivery latency in ms | environment, channel, provider | SRE |
| otp.delivery.success.rate | Gauge | % OTP sends acknowledged within 60s | environment, channel, provider | SRE |
| otp.verify.success.rate | Gauge | Ratio of successful `/otp/verify` to total attempts | environment, channel | Security |
| registration.form.field_error_rate | Gauge | Validation error rate per field | environment, field | UX |
| registration.resume.success_rate | Gauge | % resumes that reach completion | environment | Product Analytics |
| a11y.violations.count | Counter | Accessibility violations from CI | environment, severity | QA |
| security.anomaly.count | Counter | Alerts from anomaly detection (brute force, velocity) | environment, anomaly_type | Security |

Metrics emitted via OpenTelemetry to centralized metrics backend (Prometheus +
Grafana). Retention: 30 days high-resolution, 13 months roll-up.

## Logs

- Structured JSON logs with fields: `timestamp`, `level`, `message`,
  `registrationId`, `correlationId`, `clientId`, `ipHash`, `eventType`,
  `latencyMs`, `errorCode`.
- PII fields hashed (SHA-256 + salt) or redacted at source.
- Logs shipped to centralized logging (Elastic/Cloud Logging) with 30-day
  retention, archived to cold storage for 1 year for compliance.
- Security-relevant events flagged with `securityEvent=true` for SIEM ingestion.

## Tracing

- Distributed tracing via OpenTelemetry, trace sampled at 20% baseline, 100% for
  errors and throttled responses.
- Span names: `register.start`, `otp.send`, `otp.verify`, `register.complete`.
- Attributes include `clientId`, `locale`, `channel`, `throttleState`, `retryCount`.

## Dashboards

1. **Registration Funnel Dashboard** (Product Analytics)
   - Conversion from start → OTP verified → completed.
   - Drop-off by locale, device type.
   - Median and p95 completion time.

2. **OTP Health Dashboard** (SRE/Security)
   - Delivery success and latency per channel/provider.
   - Error codes distribution.
   - Rate-limit utilization and throttled counts.

3. **Reliability Dashboard** (SRE)
   - API availability vs SLO.
  - 5xx error trends and burn-rate gauges.
   - Queue depth or retry backlog for OTP provider.

4. **Accessibility & Compliance Dashboard** (QA/Compliance)
   - a11y violation counts from CI.
   - Consent logging completeness.
   - Data retention job success/failure metrics.

Dashboards implemented in Grafana with templating for environment (prod, staging,
perf). Access restricted by role-based access control.

## Alerts

- **Conversion Drop Alert**: Trigger when `registration.start_to_complete.rate`
  decreases by >5 percentage points within 1 hour. PagerDuty: Product Analytics.
- **OTP Delivery Latency Alert**: Trigger when `otp.delivery.latency.p95` > 500 ms
  for 5 minutes. PagerDuty: SRE on-call.
- **OTP Delivery Failure Alert**: Trigger when `otp.delivery.success.rate` < 98%
  for 10 minutes. PagerDuty: SRE + Security.
- **Rate Limit Abuse Alert**: Trigger on spike of `security.anomaly.count`
  indicating possible OTP abuse (threshold 3x baseline). PagerDuty: Security.
- **Availability Alert**: Trigger when API availability burn rate predicts SLO
  exhaustion within 2 hours. PagerDuty: SRE.
- **Accessibility Regression Alert**: Trigger when `a11y.violations.count`
  > 0 critical in CI. Slack notification to QA + App Eng.

## Synthetic Monitoring

- Journey monitors from 3 geographic regions hitting staging environment every 5
  minutes.
- Steps: start registration → request OTP → poll for email OTP via test harness →
  verify → complete.
- Validate that required events land in analytics pipeline within 5 minutes.

## Runbooks

- OTP Provider Degradation Runbook: steps to failover to alternate channel,
  contact provider, adjust rate limits.
- Duplicate Detection Tuning Runbook: adjust thresholds, review false positives.
- Consent Evidence Gap Runbook: manual ingestion process when audit detects
  missing evidence.

Runbooks stored in internal wiki, referenced in alert descriptions for quick
access.

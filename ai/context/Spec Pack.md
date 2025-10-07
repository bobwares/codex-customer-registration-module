Short answer: convert the PRD into a machine-readable “Spec Pack” and gate it with a design review. That’s the next step in a spec-driven workflow.

Below is the concrete plan plus first artifacts to kick it off.

# Next Step: Spec Pack v0.1 (contract-first)

Deliverables (all text files, reviewable in PR):

1. Requirements Traceability Matrix (RTM): map every FR/NFR → APIs/data/contracts → tests → metrics.
2. Contract-first API spec: OpenAPI for registration endpoints; auth and rate-limit headers; error model.
3. JSON Schemas: request/response payloads; consent + preferences; validation rules.
4. Event Schemas: analytics/audit events (CloudEvents-style) for funnel instrumentation.
5. Acceptance tests: Gherkin for key scenarios; load/A11y test charters.
6. NFR budgets: performance SLOs, reliability targets, security & compliance controls.
7. Observability spec: metrics, logs, dashboards, alerts; success metric formulas.
8. ADRs: crisp decisions for OTP channel policy, code length/TTL, identifier strategy, data retention.

Gate: “Spec Pack Review” — Security, Compliance, Analytics, and App Eng sign-off. After approval, scaffolding and code generation begin.

# Artifact 1 — RTM (excerpt)

| ID                       | PRD Link | API/Contract                                           | Tests                                                                   | Metrics/Alerts                                                   |
| ------------------------ | -------- | ------------------------------------------------------ | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| FR-1 Account creation    | 6.FR-1   | POST /register/start (OpenAPI) + PasswordPolicy schema | Gherkin S1.1, unit: password policy, E2E: happy path                    | Conversion start→complete; 4xx policy errors rate                |
| FR-2 2FA at registration | 6.FR-2   | POST /otp/send, /otp/verify                            | Gherkin S1.2/S1.3; unit: code verify; resiliency test for provider fail | OTP delivery success ≤60s; verify success; provider health alert |
| FR-3 PII capture         | 6.FR-3   | PersonalInfo schema; POST /register/complete           | Gherkin S1.4; a11y checks on form fields                                | Field error rates; p95 time-to-complete                          |
| FR-5 Duplicate handling  | 6.FR-5   | Error model E_DUPLICATE with leakage guard             | Gherkin S2.1; unit: duplicate path                                      | Duplicate attempts; recovery click-through                       |
| NFR-Security             | 7.c      | Security headers, rate limits, secrets policy          | ZAP/DAST, STRIDE review, unit: policy guards                            | 401/429 patterns; anomaly alerts                                 |

# Artifact 2 — OpenAPI (skeleton)

openapi: 3.1.0
info:
title: Customer Registration API
version: 0.1.0
servers:

* url: [https://api.example.com](https://api.example.com)
  paths:
  /register/start:
  post:
  summary: Start registration with email+password
  requestBody:
  required: true
  content:
  application/json:
  schema: { $ref: '#/components/schemas/RegisterStartRequest' }
  responses:
  '202': { description: Registration pending, OTP required, content: { application/json: { schema: { $ref: '#/components/schemas/RegisterStartResponse' }}}}
  '400': { $ref: '#/components/responses/BadRequest' }
  /otp/send:
  post:
  summary: Send OTP via email or SMS
  requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/OtpSendRequest' }}}}
  responses: { '204': { description: Sent }, '429': { $ref: '#/components/responses/TooManyRequests' } }
  /otp/verify:
  post:
  summary: Verify OTP
  requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/OtpVerifyRequest' }}}}
  responses: { '200': { description: Verified }, '400': { $ref: '#/components/responses/BadRequest' } }
  /register/complete:
  post:
  summary: Complete registration with PII, consent, preferences
  requestBody: { required: true, content: { application/json: { schema: { $ref: '#/components/schemas/RegisterCompleteRequest' }}}}
  responses:
  '201': { description: Customer created, content: { application/json: { schema: { $ref: '#/components/schemas/RegisterCompleteResponse' }}}}
  '409': { description: Duplicate or conflict }
  components:
  securitySchemes:
  RateLimitToken: { type: apiKey, in: header, name: X-RateLimit-Token }
  responses:
  BadRequest: { description: Validation or policy error }
  TooManyRequests: { description: Throttled }
  schemas:
  Email: { type: string, format: email, maxLength: 254 }
  Locale: { type: string, example: en-US }
  RegisterStartRequest:
  type: object
  required: [email, password, locale]
  properties:
  email: { $ref: '#/components/schemas/Email' }
  password: { type: string, minLength: 8 }  # actual policy documented in ADR
  locale: { $ref: '#/components/schemas/Locale' }
  RegisterStartResponse:
  type: object
  required: [registrationId, nextStep]
  properties:
  registrationId: { type: string, format: uuid }
  nextStep: { enum: [otp_required] }
  OtpSendRequest:
  type: object
  required: [registrationId, channel]
  properties:
  registrationId: { type: string, format: uuid }
  channel: { enum: [email, sms] }
  OtpVerifyRequest:
  type: object
  required: [registrationId, code]
  properties:
  registrationId: { type: string, format: uuid }
  code: { type: string, minLength: 6, maxLength: 8 }
  RegisterCompleteRequest:
  type: object
  required: [registrationId, personal, consent, preferences]
  properties:
  registrationId: { type: string, format: uuid }
  personal:
  type: object
  required: [firstName, lastName, country, language]
  properties:
  firstName: { type: string, maxLength: 100 }
  lastName: { type: string, maxLength: 100 }
  country: { type: string, minLength: 2, maxLength: 2 }
  language: { $ref: '#/components/schemas/Locale' }
  consent:
  type: object
  required: [marketing, timestamp]
  properties:
  marketing: { type: boolean }
  timestamp: { type: string, format: date-time }
  preferences:
  type: object
  properties:
  commsChannel: { enum: [email, sms, none] }
  RegisterCompleteResponse:
  type: object
  required: [customerId]
  properties:
  customerId: { type: string }

# Artifact 3 — Event schemas (excerpt)

* registration.started { registrationId, emailHash, locale, ts }
* registration.otp_sent { registrationId, channel, provider, ts }
* registration.otp_verified { registrationId, ts }
* registration.completed { registrationId, customerId, ts }
* registration.throttled { registrationId?, reason, ts }
  (All events: no raw PII; include correlationId and partition keys.)

# Artifact 4 — Acceptance tests (Gherkin excerpt)

- Feature: Customer Registration
- Scenario: Happy path with email OTP
- Given a new user starts registration with valid email/password and locale
- When the user requests an email OTP
- And enters the correct OTP within 5 minutes
- And submits required personal info, consent, and preferences
- Then the system creates a customer record and returns a customerId
- And emits events registration.started, registration.otp_sent, registration.otp_verified, registration.completed

# Definition of Ready to Implement

* PRD v0.1 approved.
* Spec Pack v0.1 committed:

    * OpenAPI validated (lint passes).
    * JSON Schemas compiled.
    * Events documented.
    * RTM links each FR/NFR to at least one test and one metric.
    * ADRs drafted for OTP policy and identifier strategy.
* Tooling ready: CI validates OpenAPI/JSON Schema; test harness can run Gherkin E2E stubs; telemetry namespaces reserved.



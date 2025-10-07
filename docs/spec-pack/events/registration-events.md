# Registration Event Schemas (CloudEvents-aligned)

All events follow CloudEvents 1.0 structure with the following shared metadata:

- `specversion`: `1.0`
- `source`: `registration-service`
- `type`: event-specific value (see below)
- `id`: UUID v4
- `subject`: `registration/{registrationId}` (unless noted)
- `time`: ISO-8601 timestamp of emission
- `datacontenttype`: `application/json`
- `dataref`: Optional pointer to secure storage when payload is large
- No raw PII outside hashed or tokenized fields; emails hashed with SHA-256 + salt.

## Event: registration.started

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Correlates the session across services |
| `emailHash` | string | SHA-256 hash of lowercased email with per-tenant salt |
| `locale` | string | Locale requested by user |
| `channelPreferences` | object | Primary/secondary OTP channels |
| `initiatedBy` | string | Channel initiating the registration (web, mobile-web, support) |
| `policyVersion` | string | Password/consent policy version snapshot |

## Event: registration.otp_sent

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Registration session |
| `channel` | string | `email` or `sms` |
| `provider` | string | Downstream provider identifier |
| `deliveryId` | string | Provider correlation ID |
| `throttleState` | string | `normal`, `soft_block`, or `hard_block` |
| `latencyMs` | integer | Time between request and provider acknowledgement |

## Event: registration.otp_delivery_failed

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session impacted |
| `channel` | string | Delivery channel attempted |
| `provider` | string | Provider identifier |
| `reason` | string | Categorized failure reason (timeout, provider_error, invalid_destination) |
| `retryEligible` | boolean | Indicates if auto-resend permitted |

## Event: registration.otp_verified

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session |
| `method` | string | Channel used |
| `verifiedAt` | string (date-time) | Timestamp verified |
| `attempts` | integer | Number of attempts prior to success |

## Event: registration.completed

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session |
| `customerId` | string | Newly created customer identifier (non-PII surrogate) |
| `country` | string | Country code supplied |
| `language` | string | Preferred language |
| `marketingOptIn` | boolean | Marketing consent status |
| `completionLatencyMs` | integer | Milliseconds between start and completion |

## Event: registration.duplicate_detected

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session |
| `identifierType` | string | `email` or `phone` |
| `leakageGuardLevel` | string | `none`, `low`, `high` |
| `resolutionHint` | string | Recovery path recommended |

## Event: registration.resumed

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session |
| `resumeTokenIssuedAt` | string (date-time) | When resume token issued |
| `resumeChannel` | string | Channel used for resumption (email link, sms link, web cookie) |
| `daysSinceStart` | integer | Age of registration |

## Event: registration.throttled

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Optional if throttled before ID created |
| `reason` | string | `otp_resend_limit`, `ip_velocity`, `device_velocity`, `abuse_block` |
| `cooldownSeconds` | integer | Cooldown duration communicated |
| `policyRef` | string | Identifier of throttling policy invoked |

## Event: registration.abandoned

| Field | Type | Description |
| --- | --- | --- |
| `registrationId` | string (uuid) | Session |
| `lastCompletedStep` | string | `start`, `otp`, `pii`, `consent` |
| `inactiveDurationMinutes` | integer | Time since last activity |
| `autoClosed` | boolean | Indicates if system expired session |

### Event Validation

- JSON payloads validated against JSON Schemas published alongside this document.
- All events include `correlationId` and `traceId` for distributed tracing, derived
  from the registration service's telemetry library.
- Sensitive fields such as `emailHash` use salted hashing with rotation keyed by
  `policyVersion`.

Feature: Customer Registration
  The registration service must guide a new customer from initial signup
  through OTP verification, consent capture, and account creation while
  enforcing security and compliance guardrails.

  Background:
    Given the registration service is healthy
    And the OTP provider is available

  @happy_path @fr1 @fr2 @fr3 @fr4
  Scenario: Happy path with email OTP
    When a user starts registration with valid email "user@example.com" and strong password
    And the user requests an email OTP
    And the user receives the OTP within 60 seconds
    And the user verifies the OTP correctly on the first attempt
    And the user submits the required personal information and consent
    Then the system creates a customer record
    And the registration.completed event is emitted with marketingOptIn false by default

  @otp_resend @fr6
  Scenario: OTP resend with backoff
    Given a user has started registration and requested an email OTP
    When the user requests another OTP within the cooldown window
    Then the service denies the request with error code "E_RATE_LIMIT"
    And the response includes Retry-After header greater than 0
    When the cooldown expires and the user requests again
    Then the OTP is sent successfully

  @duplicate @fr5
  Scenario: Duplicate identifier detected
    Given an existing customer with email "dup@example.com"
    When a new registration is started with the same email
    Then the service responds with error code "E_DUPLICATE"
    And the error message directs the user to the sign-in flow without confirming the account exists

  @resume @fr7
  Scenario: Resume registration within window
    Given a registration started 24 hours ago and is pending OTP verification
    When the user provides a valid resume token
    Then the service returns the registration status with step "otp_required"
    And the user can continue without re-entering personal information

  @consent @fr4 @nfr_compliance
  Scenario: Consent required for marketing opt-in jurisdiction
    Given the jurisdiction requires explicit opt-in for marketing
    When the user submits the registration without checking the marketing consent box
    Then the submission is rejected with field error on "consent.marketing"
    And no registration.completed event is emitted

  @accessibility @fr10 @nfr_accessibility
  Scenario: Accessibility validation
    Given the registration UI is rendered in headless browser
    When automated accessibility checks are run
    Then there are no critical WCAG 2.1 AA violations
    And all form controls are reachable via keyboard navigation

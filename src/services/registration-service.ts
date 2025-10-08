/**
 * App: Customer Registration Module
 * Package: frontend.services
 * File: src/services/registration-service.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:08:28Z
 * Exports: fetchLandingContent, fetchRegistrationPolicy, startRegistration, sendOtp, verifyOtp, completeRegistration
 * Description: Server-side service layer coordinating registration API calls and cached landing content retrieval.
 */
import 'server-only';

import { getEnvConfig } from '@/lib/env';

type MetricHighlight = {
  readonly label: string;
  readonly value: string;
  readonly annotation: string;
};

type FeatureHighlight = {
  readonly title: string;
  readonly description: string;
};

export interface LandingContent {
  readonly heroHeading: string;
  readonly heroSubheading: string;
  readonly ctaLabel: string;
  readonly metrics: readonly MetricHighlight[];
  readonly features: readonly FeatureHighlight[];
}

export interface RegistrationPolicy {
  readonly passwordRules: readonly string[];
  readonly otpExpirationMinutes: number;
  readonly maxOtpAttempts: number;
}

export interface StartRegistrationPayload {
  readonly email: string;
  readonly password: string;
  readonly locale: string;
}

export interface StartRegistrationResponse {
  readonly registrationId: string;
  readonly nextStep: 'otp_required';
}

export interface SendOtpPayload {
  readonly registrationId: string;
  readonly channel: 'email' | 'sms';
}

export interface VerifyOtpPayload {
  readonly registrationId: string;
  readonly code: string;
}

export interface CompleteRegistrationPayload {
  readonly registrationId: string;
  readonly personal: {
    readonly firstName: string;
    readonly lastName: string;
    readonly country: string;
    readonly language: string;
  };
  readonly consent: {
    readonly marketing: boolean;
    readonly timestamp: string;
  };
  readonly preferences: {
    readonly commsChannel: 'email' | 'sms' | 'none';
  };
}

export interface CompleteRegistrationResponse {
  readonly customerId: string;
  readonly activated: boolean;
}

const { API_BASE } = getEnvConfig();

const headers = {
  'Content-Type': 'application/json',
  'X-RateLimit-Token': 'public-web'
};

async function handleResponse<T>(response: Response) {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'Registration service request failed');
  }
  return (await response.json()) as T;
}

export async function fetchLandingContent(): Promise<LandingContent> {
  return {
    heroHeading: 'Frictionless onboarding built for trust',
    heroSubheading:
      'Guide new customers from signup to activation with adaptive MFA, progressive profiling, and actionable analytics.',
    ctaLabel: 'Start registration',
    metrics: [
      {
        label: 'Conversion uplift',
        value: '↑ 24%',
        annotation: 'from automated friction detection'
      },
      {
        label: 'OTP success',
        value: '98%',
        annotation: 'delivery within 60 seconds'
      },
      {
        label: 'Audit ready',
        value: '100%',
        annotation: 'events captured end-to-end'
      }
    ],
    features: [
      {
        title: 'Progressive customer profile',
        description:
          'Collect only the required data at each step with configurable retention and consent policies.'
      },
      {
        title: 'Observability from day one',
        description:
          'Stream key registration metrics and audit events to your telemetry platform with zero additional code.'
      },
      {
        title: 'Compliance by default',
        description:
          'Enforce MFA, consent capture, and duplicate detection guardrails aligned with security review outcomes.'
      }
    ]
  };
}

export async function fetchRegistrationPolicy(): Promise<RegistrationPolicy> {
  return {
    passwordRules: [
      'At least 12 characters',
      'Requires upper, lower, number, and symbol',
      'No email or common dictionary terms'
    ],
    otpExpirationMinutes: 10,
    maxOtpAttempts: 5
  };
}

export async function startRegistration(
  payload: StartRegistrationPayload
): Promise<StartRegistrationResponse> {
  const response = await fetch(`${API_BASE}/api/register/start`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    next: {
      revalidate: 0,
      tags: ['registration-session']
    }
  });
  return handleResponse<StartRegistrationResponse>(response);
}

export async function sendOtp(payload: SendOtpPayload): Promise<void> {
  const response = await fetch(`${API_BASE}/api/otp/send`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    next: {
      revalidate: 0,
      tags: ['registration-session']
    }
  });
  await handleResponse<Record<string, unknown>>(response);
}

export async function verifyOtp(payload: VerifyOtpPayload): Promise<void> {
  const response = await fetch(`${API_BASE}/api/otp/verify`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    next: {
      revalidate: 0,
      tags: ['registration-session']
    }
  });
  await handleResponse<Record<string, unknown>>(response);
}

export async function completeRegistration(
  payload: CompleteRegistrationPayload
): Promise<CompleteRegistrationResponse> {
  const response = await fetch(`${API_BASE}/api/register/complete`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    next: {
      revalidate: 0,
      tags: ['registration-session']
    }
  });
  return handleResponse<CompleteRegistrationResponse>(response);
}

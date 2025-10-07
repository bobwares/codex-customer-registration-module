/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/services/registration-service.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: startRegistration, sendOtp, verifyOtp, completeRegistration
 * Description: In-memory domain service that simulates registration orchestration, OTP lifecycle, and consent capture.
 */
import { createHash, randomInt, randomUUID } from 'crypto';
import type {
  CompleteRegistrationInput,
  OtpVerificationInput,
  StartRegistrationInput
} from '@/features/registration/schemas';

interface RegistrationSession {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly locale: string;
  readonly channel: StartRegistrationInput['channel'];
  readonly phone?: string;
  readonly createdAt: number;
  otp: {
    code: string;
    expiresAt: number;
    attempts: number;
    sentAt: number;
  };
  verified: boolean;
  verificationTimestamp?: number;
  completion?: {
    firstName: string;
    lastName: string;
    country: string;
    language: string;
    marketingOptIn: boolean;
    communicationChannel: CompleteRegistrationInput['communicationChannel'];
    consentTimestamp: number;
  };
}

const sessions = new Map<string, RegistrationSession>();

const OTP_LENGTH = 6;
const OTP_EXPIRY_MS = 5 * 60 * 1000;
const OTP_RESEND_WINDOW_MS = 30 * 1000;

function now(): number {
  return Date.now();
}

function generateOtp(): string {
  return randomInt(0, 10 ** OTP_LENGTH).toString().padStart(OTP_LENGTH, '0');
}

function hashPassword(password: string): string {
  return createHash('sha256').update(password).digest('hex');
}

function requireSession(registrationId: string): RegistrationSession {
  const session = sessions.get(registrationId);
  if (!session) {
    throw new Error('Registration session not found. Restart the flow.');
  }

  return session;
}

function recordOtp(session: RegistrationSession, code: string): void {
  session.otp = {
    code,
    expiresAt: now() + OTP_EXPIRY_MS,
    attempts: 0,
    sentAt: now()
  };
}

export async function startRegistration(input: StartRegistrationInput) {
  const registrationId = randomUUID();
  const session: RegistrationSession = {
    id: registrationId,
    email: input.email,
    passwordHash: hashPassword(input.password),
    locale: input.locale,
    channel: input.channel,
    phone: input.phone,
    createdAt: now(),
    otp: {
      code: '000000',
      expiresAt: 0,
      attempts: 0,
      sentAt: 0
    },
    verified: false
  };

  const otpCode = generateOtp();
  recordOtp(session, otpCode);
  sessions.set(registrationId, session);

  return {
    registrationId,
    channel: session.channel,
    email: session.email,
    otpExpiresAt: new Date(session.otp.expiresAt).toISOString(),
    events: ['registration.started', 'registration.otp_sent'],
    debugCode: process.env.NODE_ENV === 'production' ? undefined : otpCode
  } as const;
}

export async function sendOtp(registrationId: string) {
  const session = requireSession(registrationId);

  if (now() - session.otp.sentAt < OTP_RESEND_WINDOW_MS) {
    throw new Error('Please wait a few seconds before requesting another code.');
  }

  const otpCode = generateOtp();
  recordOtp(session, otpCode);

  return {
    channel: session.channel,
    otpExpiresAt: new Date(session.otp.expiresAt).toISOString(),
    events: ['registration.otp_sent'],
    debugCode: process.env.NODE_ENV === 'production' ? undefined : otpCode
  } as const;
}

export async function verifyOtp(input: OtpVerificationInput) {
  const session = requireSession(input.registrationId);
  session.otp.attempts += 1;

  if (session.otp.attempts > 5) {
    throw new Error('Too many attempts. Please request a new code.');
  }

  if (session.otp.expiresAt < now()) {
    throw new Error('OTP expired. Request a new code.');
  }

  if (session.otp.code !== input.code) {
    throw new Error('Invalid verification code.');
  }

  session.verified = true;
  session.verificationTimestamp = now();

  return {
    events: ['registration.otp_verified']
  } as const;
}

export async function completeRegistration(input: CompleteRegistrationInput) {
  const session = requireSession(input.registrationId);

  if (!session.verified) {
    throw new Error('Verify the OTP before completing registration.');
  }

  session.completion = {
    firstName: input.firstName,
    lastName: input.lastName,
    country: input.country,
    language: input.language,
    marketingOptIn: input.marketingOptIn,
    communicationChannel: input.communicationChannel,
    consentTimestamp: now()
  };

  const customerId = `CUST-${randomInt(100_000, 999_999)}`;

  return {
    customerId,
    consentTimestamp: new Date(session.completion.consentTimestamp).toISOString(),
    events: ['registration.completed'],
    marketingOptIn: session.completion.marketingOptIn,
    communicationChannel: session.completion.communicationChannel,
    language: session.completion.language
  } as const;
}

/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/actions.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: startRegistrationAction, sendOtpAction, verifyOtpAction, completeRegistrationAction
 * Description: Server actions orchestrating registration mutations with validation, telemetry tags, and cache revalidation.
 */
'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import {
  completeRegistrationSchema,
  otpVerificationSchema,
  startRegistrationSchema,
  type CompleteRegistrationInput,
  type OtpVerificationInput,
  type StartRegistrationInput
} from './schemas';
import {
  completeRegistration,
  sendOtp,
  startRegistration,
  verifyOtp
} from '@/services/registration-service';

interface ActionSuccess<T> {
  readonly success: true;
  readonly data: T;
}

interface ActionError {
  readonly success: false;
  readonly error: string;
  readonly fieldErrors?: Record<string, string[]>;
}

export type ActionResult<T> = ActionSuccess<T> | ActionError;

function validationError<T>(error: any): ActionResult<T> {
  const flattened = error.flatten?.();
  if (flattened) {
    return {
      success: false,
      error: flattened.formErrors.join(' ') || 'Validation failed.',
      fieldErrors: flattened.fieldErrors as Record<string, string[]>
    };
  }

  return {
    success: false,
    error: error.message ?? 'Validation failed.'
  };
}

function handleException<T>(error: unknown): ActionResult<T> {
  if (error instanceof Error) {
    return {
      success: false,
      error: error.message
    };
  }

  return {
    success: false,
    error: 'Unexpected error occurred.'
  };
}

export interface StartRegistrationActionResult {
  readonly registrationId: string;
  readonly channel: StartRegistrationInput['channel'];
  readonly email: string;
  readonly otpExpiresAt: string;
  readonly events: string[];
  readonly debugCode?: string;
}

export async function startRegistrationAction(
  input: StartRegistrationInput
): Promise<ActionResult<StartRegistrationActionResult>> {
  const parsed = startRegistrationSchema.safeParse(input);
  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const result = await startRegistration(parsed.data);
    revalidateTag('registration:events');
    return { success: true, data: result };
  } catch (error) {
    return handleException(error);
  }
}

export interface SendOtpActionResult {
  readonly channel: StartRegistrationInput['channel'];
  readonly otpExpiresAt: string;
  readonly events: string[];
  readonly debugCode?: string;
}

export async function sendOtpAction(
  registrationId: string
): Promise<ActionResult<SendOtpActionResult>> {
  try {
    const result = await sendOtp(registrationId);
    revalidateTag('registration:events');
    return { success: true, data: result };
  } catch (error) {
    return handleException(error);
  }
}

export interface VerifyOtpActionResult {
  readonly events: string[];
}

export async function verifyOtpAction(
  input: OtpVerificationInput
): Promise<ActionResult<VerifyOtpActionResult>> {
  const parsed = otpVerificationSchema.safeParse(input);
  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const result = await verifyOtp(parsed.data);
    revalidateTag('registration:events');
    return { success: true, data: result };
  } catch (error) {
    return handleException(error);
  }
}

export interface CompleteRegistrationActionResult {
  readonly customerId: string;
  readonly consentTimestamp: string;
  readonly events: string[];
  readonly marketingOptIn: boolean;
  readonly communicationChannel: CompleteRegistrationInput['communicationChannel'];
  readonly language: string;
}

export async function completeRegistrationAction(
  input: CompleteRegistrationInput
): Promise<ActionResult<CompleteRegistrationActionResult>> {
  const parsed = completeRegistrationSchema.safeParse(input);
  if (!parsed.success) {
    return validationError(parsed.error);
  }

  try {
    const result = await completeRegistration(parsed.data);
    revalidateTag('registration:events');
    revalidatePath('/register');
    return { success: true, data: result };
  } catch (error) {
    return handleException(error);
  }
}

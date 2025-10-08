/**
 * App: Customer Registration Module
 * Package: frontend.actions
 * File: src/actions/registration-actions.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:08:46Z
 * Exports: createRegistration, requestOtpResend, verifyRegistrationOtp, completeRegistrationAction
 * Description: Server Actions coordinating registration mutations and cache invalidation semantics.
 */
'use server';

import { revalidateTag } from 'next/cache';

import {
  completeRegistration,
  sendOtp,
  startRegistration,
  verifyOtp
} from '@/services/registration-service';

export async function createRegistration(formData: FormData) {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const locale = String(formData.get('locale') ?? 'en-US');

  const response = await startRegistration({ email, password, locale });
  revalidateTag('registration-session');
  return response;
}

export async function requestOtpResend(registrationId: string, channel: 'email' | 'sms') {
  await sendOtp({ registrationId, channel });
  revalidateTag('registration-session');
}

export async function verifyRegistrationOtp(formData: FormData) {
  const registrationId = String(formData.get('registrationId'));
  const code = String(formData.get('code'));

  await verifyOtp({ registrationId, code });
  revalidateTag('registration-session');
  return { registrationId };
}

export async function completeRegistrationAction(formData: FormData) {
  const registrationId = String(formData.get('registrationId'));
  const firstName = String(formData.get('firstName'));
  const lastName = String(formData.get('lastName'));
  const country = String(formData.get('country'));
  const language = String(formData.get('language') ?? 'en-US');
  const marketing = formData.get('marketing') === 'on';
  const commsChannel = (formData.get('commsChannel') as 'email' | 'sms' | 'none') ?? 'email';

  const response = await completeRegistration({
    registrationId,
    personal: { firstName, lastName, country, language },
    consent: {
      marketing,
      timestamp: new Date().toISOString()
    },
    preferences: { commsChannel }
  });

  revalidateTag('registration-session');
  return response;
}

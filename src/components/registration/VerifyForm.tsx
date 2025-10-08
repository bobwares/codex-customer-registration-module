/**
 * App: Customer Registration Module
 * Package: frontend.components.registration
 * File: src/components/registration/VerifyForm.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:09:48Z
 * Exports: VerifyForm
 * Description: OTP verification form supporting resend and progression to the personalization step.
 */
'use client';

import { useEffect, useState, useTransition } from 'react';

import {
  requestOtpResend,
  verifyRegistrationOtp
} from '@/actions/registration-actions';
import { useRegistrationStore } from '@/state/registration-store';

interface VerifyFormProps {
  readonly prefillRegistrationId?: string;
  readonly prefillEmail?: string;
}

export function VerifyForm({ prefillRegistrationId, prefillEmail }: VerifyFormProps = {}) {
  const [isPending, startTransition] = useTransition();
  const [resendPending, startResend] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const registrationId = useRegistrationStore((state) => state.registrationId);
  const advanceStep = useRegistrationStore((state) => state.advanceStep);
  const setRegistrationId = useRegistrationStore((state) => state.setRegistrationId);
  const email = useRegistrationStore((state) => state.email);
  const setEmail = useRegistrationStore((state) => state.setEmail);

  useEffect(() => {
    if (prefillRegistrationId && !registrationId) {
      setRegistrationId(prefillRegistrationId);
    }
    if (prefillEmail && !email) {
      setEmail(prefillEmail);
    }
  }, [email, prefillEmail, prefillRegistrationId, registrationId, setEmail, setRegistrationId]);

  const activeRegistrationId = registrationId ?? prefillRegistrationId;
  const activeEmail = email ?? prefillEmail;

  if (!activeRegistrationId) {
    return (
      <p className="rounded-md bg-amber-50 px-4 py-3 text-sm text-amber-800">
        We could not locate an active registration session. Please start again.
      </p>
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    formData.set('registrationId', activeRegistrationId);
    startTransition(async () => {
      try {
        await verifyRegistrationOtp(formData);
        advanceStep('complete');
      } catch (submissionError) {
        console.error(submissionError);
        setError('The code you entered was invalid or expired. Please try again.');
      }
    });
  }

  function handleResend(channel: 'email' | 'sms') {
    setError(null);
    startResend(async () => {
      try {
        await requestOtpResend(activeRegistrationId, channel);
      } catch (resendError) {
        console.error(resendError);
        setError('Unable to resend the code right now. Wait a minute and retry.');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <p className="text-sm text-slate-600">
        Enter the 6-digit verification code we sent to{' '}
        <span className="font-semibold text-slate-900">{activeEmail}</span>. Codes expire in 10 minutes.
      </p>
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="code">
          Verification code
        </label>
        <input
          id="code"
          name="code"
          pattern="\\d{6}"
          inputMode="numeric"
          required
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 tracking-[0.3em] text-center text-lg font-semibold text-slate-900 shadow-sm focus:border-primary focus:outline-none"
          placeholder="000000"
        />
      </div>
      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleResend('email')}
            disabled={resendPending}
            className="text-sm font-medium text-primary hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Resend email
          </button>
          <button
            type="button"
            onClick={() => handleResend('sms')}
            disabled={resendPending}
            className="text-sm font-medium text-primary hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send SMS instead
          </button>
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Verifying…' : 'Verify code'}
        </button>
      </div>
    </form>
  );
}

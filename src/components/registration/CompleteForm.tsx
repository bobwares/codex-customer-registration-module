/**
 * App: Customer Registration Module
 * Package: frontend.components.registration
 * File: src/components/registration/CompleteForm.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:10:04Z
 * Exports: CompleteForm
 * Description: Captures personal information, consent, and preferences to finalize registration.
 */
'use client';

import { useEffect, useState, useTransition } from 'react';

import { completeRegistrationAction } from '@/actions/registration-actions';
import { useRegistrationStore } from '@/state/registration-store';

interface CompleteFormProps {
  readonly prefillRegistrationId?: string;
}

export function CompleteForm({ prefillRegistrationId }: CompleteFormProps = {}) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const registrationId = useRegistrationStore((state) => state.registrationId);
  const setRegistrationId = useRegistrationStore((state) => state.setRegistrationId);
  const advanceStep = useRegistrationStore((state) => state.advanceStep);

  useEffect(() => {
    if (prefillRegistrationId && !registrationId) {
      setRegistrationId(prefillRegistrationId);
    }
  }, [prefillRegistrationId, registrationId, setRegistrationId]);

  const activeRegistrationId = registrationId ?? prefillRegistrationId;

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
    setSuccessMessage(null);
    const formData = new FormData(event.currentTarget);
    formData.set('registrationId', activeRegistrationId);

    startTransition(async () => {
      try {
        const result = await completeRegistrationAction(formData);
        setSuccessMessage(`Registration complete. Customer ID ${result.customerId} activated.`);
        advanceStep('success');
      } catch (submissionError) {
        console.error(submissionError);
        setError('Something went wrong completing registration. Please retry.');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="firstName">
            Legal first name
          </label>
          <input
            id="firstName"
            name="firstName"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
            placeholder="Ada"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="lastName">
            Legal last name
          </label>
          <input
            id="lastName"
            name="lastName"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
            placeholder="Lovelace"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="country">
            Country or region
          </label>
          <select
            id="country"
            name="country"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
            defaultValue="US"
          >
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="language">
            Preferred language
          </label>
          <select
            id="language"
            name="language"
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
            defaultValue="en-US"
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Español</option>
            <option value="fr-FR">Français</option>
          </select>
        </div>
      </div>
      <div className="space-y-3 rounded-xl bg-slate-50 px-5 py-4">
        <label className="flex items-start gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            name="marketing"
            className="mt-1 h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
            defaultChecked
          />
          <span>
            I consent to receive onboarding guidance, security alerts, and product updates as permitted in my region.
          </span>
        </label>
        <div>
          <label className="block text-sm font-semibold text-slate-700" htmlFor="commsChannel">
            Preferred communication channel
          </label>
          <select
            id="commsChannel"
            name="commsChannel"
            className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
            defaultValue="email"
          >
            <option value="email">Email</option>
            <option value="sms">SMS</option>
            <option value="none">No marketing communications</option>
          </select>
        </div>
      </div>
      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      {successMessage ? (
        <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{successMessage}</p>
      ) : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Finalizing…' : 'Complete registration'}
      </button>
    </form>
  );
}

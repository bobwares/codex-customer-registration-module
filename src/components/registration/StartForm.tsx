/**
 * App: Customer Registration Module
 * Package: frontend.components.registration
 * File: src/components/registration/StartForm.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:09:34Z
 * Exports: StartForm
 * Description: Registration start form capturing account credentials and initiating the verification step.
 */
'use client';

import { useState, useTransition } from 'react';

import { createRegistration } from '@/actions/registration-actions';
import { useRegistrationStore } from '@/state/registration-store';
import type { RegistrationPolicy } from '@/services/registration-service';

interface StartFormProps {
  readonly policy: RegistrationPolicy;
}

export function StartForm({ policy }: StartFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const setRegistrationId = useRegistrationStore((state) => state.setRegistrationId);
  const setEmail = useRegistrationStore((state) => state.setEmail);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setError(null);
    startTransition(async () => {
      try {
        const result = await createRegistration(formData);
        setRegistrationId(result.registrationId);
        setEmail(String(formData.get('email')));
      } catch (submissionError) {
        console.error(submissionError);
        setError('We were unable to start registration. Please review your inputs and retry.');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
          Work email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
          placeholder="you@company.com"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
          Create password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={12}
          className="mt-2 w-full rounded-lg border border-slate-200 px-4 py-3 text-base shadow-sm focus:border-primary focus:outline-none"
          placeholder="Minimum 12 characters"
        />
        <p className="mt-2 text-sm text-slate-500">
          {policy.passwordRules.join(' • ')}
        </p>
      </div>
      <input type="hidden" name="locale" value="en-US" />
      {error ? <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p> : null}
      <button
        type="submit"
        disabled={isPending}
        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Starting…' : 'Start secure registration'}
      </button>
    </form>
  );
}

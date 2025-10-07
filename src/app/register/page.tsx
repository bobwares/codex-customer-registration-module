/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/register/page.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: metadata, revalidate, RegisterPage
 * Description: Server component hosting the interactive registration wizard with policy and reference data hydration.
 */
import type { Metadata } from 'next';
import { RegistrationFlow } from '@/features/registration/components/RegistrationFlow';
import { getPasswordPolicy } from '@/services/policy';
import { getRegistrationReferenceData } from '@/services/registration-reference';

export const metadata: Metadata = {
  title: 'Customer Registration – Create account',
  description:
    'Begin the secure onboarding journey by creating credentials, verifying OTP, and providing consent.'
};

export const revalidate = 300;

export default async function RegisterPage() {
  const [policy, reference] = await Promise.all([
    getPasswordPolicy(),
    getRegistrationReferenceData()
  ]);

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-12 px-6 py-16">
      <header className="space-y-4 text-center">
        <p className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
          Multi-factor secure onboarding
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Create your customer account
        </h1>
        <p className="text-base text-slate-600">
          Complete three guided steps: establish credentials, verify a one-time passcode, and
          capture personal information with compliant consent logging.
        </p>
      </header>
      <RegistrationFlow policy={policy} reference={reference} />
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow">
        <h2 className="text-2xl font-semibold text-slate-900">What to expect</h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-600">
          <li>
            <strong>Compliance ready:</strong> consent timestamps, marketing preferences, and
            audit events emitted on every milestone.
          </li>
          <li>
            <strong>Accessibility first:</strong> keyboard and screen reader friendly, with
            localized copy and OTP countdowns for clarity.
          </li>
          <li>
            <strong>Resilience:</strong> built-in OTP throttling, resend safeguards, and
            in-memory analytics for sandbox validation.
          </li>
        </ul>
      </section>
    </main>
  );
}

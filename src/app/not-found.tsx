/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/not-found.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: NotFound
 * Description: Handles unknown routes with accessible messaging and navigation guidance.
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">404</p>
      <h1 className="text-3xl font-semibold text-slate-900">We can\'t find that page</h1>
      <p className="text-slate-600">
        The requested resource is unavailable. Return to the registration overview to
        continue onboarding new customers.
      </p>
      <Link
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow"
        href="/"
      >
        Go back home
      </Link>
    </main>
  );
}

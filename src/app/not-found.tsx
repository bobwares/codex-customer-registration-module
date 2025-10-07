/**
 * App: Customer Registration Module
 * Package: src/app
 * File: not-found.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: NotFound
 * Description: Not found boundary delivering a helpful recovery path when registration routes are missing.
 */
export default function NotFound() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
      <h2 className="text-2xl font-semibold text-slate-900">We could not find that step</h2>
      <p className="mt-2 text-slate-600">
        The registration step you requested does not exist. Return to the overview to continue onboarding.
      </p>
      <a className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-600" href="/">
        Go to registration home
      </a>
    </div>
  );
}

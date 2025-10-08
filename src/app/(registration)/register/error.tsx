/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/error.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:13:54Z
 * Exports: RegisterError
 * Description: Scoped error boundary for the registration journey, preserving navigation context.
 */
'use client';

interface RegisterErrorProps {
  readonly error: Error;
  readonly reset: () => void;
}

export default function RegisterError({ error, reset }: RegisterErrorProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900">
      <h2 className="text-lg font-semibold">We couldn’t process that step.</h2>
      <p className="mt-2 text-sm">
        {error.message || 'Please retry the last action or restart the flow from the beginning.'}
      </p>
      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-card"
        >
          Retry step
        </button>
        <a
          href="/register"
          className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary"
        >
          Restart flow
        </a>
      </div>
    </div>
  );
}

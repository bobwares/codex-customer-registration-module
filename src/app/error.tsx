/**
 * App: Customer Registration Module
 * Package: src/app
 * File: error.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: ErrorFallback
 * Description: Client-side error boundary UI for unexpected failures during registration flows.
 */
'use client';

import { useEffect } from 'react';

export default function ErrorFallback({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Registration error boundary caught', error);
  }, [error]);

  return (
    <div className="rounded-xl border border-rose-200 bg-rose-50 p-6">
      <h2 className="text-2xl font-semibold text-rose-700">Something went wrong</h2>
      <p className="mt-2 text-rose-600">Please retry the last action. If the issue persists, contact support with the error reference.</p>
      <button
        type="button"
        className="mt-4 inline-flex items-center rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-600"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}

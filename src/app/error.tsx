/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/error.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:11:32Z
 * Exports: ErrorBoundary
 * Description: Global error boundary offering recovery affordances for unexpected render failures.
 */
'use client';

import { useEffect } from 'react';

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Application error', error);
  }, [error]);

  return (
    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-900">
      <h2 className="text-xl font-semibold">We ran into an unexpected issue.</h2>
      <p className="mt-2 text-sm">
        Please retry the last action. If the problem persists, share this code with support: {error.digest ?? 'N/A'}.
      </p>
      <button
        type="button"
        onClick={reset}
        className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-card"
      >
        Try again
      </button>
    </div>
  );
}

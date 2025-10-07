/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/error.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: ErrorBoundary
 * Description: Root error boundary surface that allows users to retry failed segments gracefully.
 */
'use client';

import { useEffect } from 'react';

interface ErrorBoundaryProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('App error boundary captured exception', error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-3xl font-semibold text-slate-900">Something went wrong</h1>
      <p className="text-slate-600">
        An unexpected error interrupted the registration experience. Please retry the last
        action or refresh the page.
      </p>
      <button
        type="button"
        className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow"
        onClick={reset}
      >
        Try again
      </button>
    </div>
  );
}

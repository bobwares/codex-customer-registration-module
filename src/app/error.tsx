/**
 * App: Customer Registration Module
 * Package: src/app
 * File: error.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: ErrorBoundary
 * Description: Client boundary for surfaced errors in the App Router with a
 *              retry affordance and friendly messaging.
 */
"use client";

import { useEffect } from "react";

type ErrorBoundaryProps = {
  readonly error: Error & { readonly digest?: string };
  readonly reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps): JSX.Element {
  useEffect(() => {
    console.error("App Router error boundary", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold text-slate-900">Something went wrong</h1>
        <p className="text-slate-600">
          An unexpected error occurred while loading this page. Please try again. If the problem persists, contact
          support with the reference below.
        </p>
      </div>
      {error.digest ? <code className="rounded bg-slate-900 px-3 py-1 text-sm text-white">{error.digest}</code> : null}
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow transition hover:bg-brand-700"
      >
        Try again
      </button>
    </div>
  );
}

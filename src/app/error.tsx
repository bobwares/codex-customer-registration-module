/**
 * App: Customer Registration Module
 * Package: src/app
 * File: error.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: ErrorBoundary
 * Description: Presents a friendly fallback UI when unexpected errors occur in
 *              the registration flow and allows retrying the last action.
 */
"use client";

import { useEffect } from "react";

type ErrorBoundaryProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error("Registration UI error", error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
        Something went wrong
      </span>
      <h1 className="text-3xl font-semibold text-neutral-900">We hit a snag</h1>
      <p className="text-base text-neutral-600">
        Please try again. If the problem persists, contact support with reference code {error.digest ?? "N/A"}.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90"
      >
        Retry
      </button>
    </div>
  );
}

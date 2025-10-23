/**
 * App: Customer Registration Module
 * Package: src/app
 * File: error.tsx
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: ErrorBoundary
 * Description: Client component that presents a friendly fallback and allows retries when errors occur.
 */
"use client";

import { useEffect } from "react";

type ErrorBoundaryProps = {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-6 px-6">
      <h1 className="text-3xl font-bold text-white">Something went wrong</h1>
      <p className="text-slate-300">
        We were unable to load the registration experience. Please retry your request.
      </p>
      <button
        type="button"
        onClick={reset}
        className="w-fit rounded-full bg-sky-500 px-6 py-2 text-slate-950 font-semibold transition hover:bg-sky-400"
      >
        Try again
      </button>
    </section>
  );
}

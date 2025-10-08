/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/global-error.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:12:02Z
 * Exports: GlobalError
 * Description: Captures fatal streaming errors and offers navigation back to safety.
 */
'use client';

export default function GlobalError({ reset }: { readonly reset: () => void }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-white p-10 text-center text-red-900 shadow-lg">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-sm">
            Our engineering team has been notified. Try returning to the landing page or retry the last action.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-card"
            >
              Retry
            </button>
            <a
              href="/"
              className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-primary hover:text-primary"
            >
              Go home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

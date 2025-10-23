/**
 * App: Customer Registration Module
 * Package: src/app
 * File: not-found.tsx
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: NotFoundPage
 * Description: Presents a branded message when a user navigates to a missing route.
 */
export default function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold text-white">Page not found</h1>
      <p className="text-slate-300">
        The page you are looking for does not exist. Return to the registration dashboard to
        continue onboarding customers.
      </p>
      <a
        href="/"
        className="mx-auto inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
      >
        Go home
      </a>
    </section>
  );
}

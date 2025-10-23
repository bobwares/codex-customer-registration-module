/**
 * App: Customer Registration Module
 * Package: src/app
 * File: page.tsx
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: HomePage
 * Description: Renders the landing page that introduces the customer registration workflow.
 */
export default function HomePage() {
  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-10 px-6 py-16">
      <header className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-400">
          Customer Onboarding
        </p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">
          Register new customers in minutes.
        </h1>
        <p className="text-base text-slate-300 sm:text-lg">
          Streamline account creation, verify identity, and activate services with a
          frictionless experience tailored for modern businesses.
        </p>
      </header>
      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <a
          href="#"
          className="rounded-full bg-sky-500 px-8 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/40 transition hover:bg-sky-400"
        >
          Get started
        </a>
        <a
          href="#"
          className="rounded-full border border-slate-700 px-8 py-3 text-base font-semibold text-slate-200 transition hover:border-slate-500"
        >
          View documentation
        </a>
      </div>
      <div className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold text-white">Progress tracking</h2>
          <p className="mt-2 text-sm text-slate-400">
            Monitor every onboarding milestone with real-time status updates and alerts.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Secure identity checks</h2>
          <p className="mt-2 text-sm text-slate-400">
            Integrate verification providers and enforce policies without manual steps.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Analytics ready</h2>
          <p className="mt-2 text-sm text-slate-400">
            Surface conversion insights and optimize registration flows using built-in metrics.
          </p>
        </div>
      </div>
    </section>
  );
}

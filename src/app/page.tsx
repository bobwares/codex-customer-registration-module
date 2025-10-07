/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/page.tsx
 * Version: 0.2.0
 * Turns: 1,2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: Home
 * Description: Marketing overview that highlights the secure registration workflow and links to the interactive wizard.
 */
export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-16 px-6 py-24">
      <section className="space-y-6 text-center">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1 text-sm font-semibold text-brand-700">
          Secure digital onboarding
        </span>
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Register new customer accounts with confidence
        </h1>
        <p className="text-lg text-slate-600">
          Launch a guided signup flow that captures identity, preferences, and consent in
          minutes while meeting compliance guardrails from day one.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            className="rounded-lg bg-brand-600 px-6 py-3 text-base font-semibold text-white shadow hover:bg-brand-500"
            href="/register"
          >
            Launch registration wizard
          </a>
          <a className="text-base font-semibold text-brand-600" href="#observability">
            Review audit and analytics coverage
          </a>
        </div>
      </section>
      <section
        id="registration-flow"
        className="grid gap-10 rounded-3xl bg-white p-10 shadow-xl shadow-brand-100"
      >
        <header className="space-y-2">
          <h2 className="text-2xl font-semibold text-slate-900">Three-step secure onboarding</h2>
          <p className="text-slate-600">
            Customers verify email or SMS OTP, provide required personal details, and
            capture marketing consent in a single progressive form.
          </p>
        </header>
        <ol className="grid gap-6 sm:grid-cols-3">
          {["Start", "Verify", "Complete"].map((phase, index) => (
            <li key={phase} className="space-y-2 rounded-2xl border border-slate-200 p-6">
              <span className="text-sm font-semibold text-brand-600">Step {index + 1}</span>
              <h3 className="text-xl font-semibold text-slate-900">{phase}</h3>
              <p className="text-sm text-slate-600">
                {index === 0 &&
                  'Collect strong password credentials and locale to personalize guidance.'}
                {index === 1 &&
                  'Send OTP via preferred channel with throttling, expiry, and fallback flows.'}
                {index === 2 &&
                  'Capture personal information, consent, and analytics events for activation.'}
              </p>
            </li>
          ))}
        </ol>
      </section>
      <section id="observability" className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-900">Observability and compliance baked in</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {[
            'Real-time analytics for funnel and OTP performance',
            'Audit events for every registration milestone',
            'Accessibility testing integrated into CI/CD',
            'Rate limiting and fraud signals ready for tuning'
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow">
              <span className="mt-1 h-2 w-2 rounded-full bg-brand-500" aria-hidden />
              <p className="text-sm text-slate-600">{item}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

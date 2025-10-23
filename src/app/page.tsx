/**
 * App: Customer Registration Module
 * Package: src/app
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: HomePage
 * Description: Renders the marketing landing page for the customer
 *              registration experience with clear calls to action.
 */
import Link from "next/link";

function FeatureCard({ title, description }: { readonly title: string; readonly description: string }): JSX.Element {
  return (
    <div className="rounded-xl border border-slate-200 bg-white/80 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  );
}

const features = [
  {
    title: "Guided onboarding",
    description: "Step-by-step intake reduces drop-off with contextual help and validation."
  },
  {
    title: "Real-time validation",
    description: "Syncs with core systems using React Query for instant status updates."
  },
  {
    title: "Accessible by design",
    description: "Tailwind-powered UI meets WCAG AA with keyboard-friendly interactions."
  }
] as const;

export default function HomePage(): JSX.Element {
  return (
    <section className="mx-auto flex max-w-5xl flex-col gap-16 px-6 py-16">
      <div className="grid gap-10 md:grid-cols-[2fr,1fr] md:items-center">
        <div className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-brand-100 px-4 py-1 text-sm font-medium text-brand-700">
            Launch faster with confidence
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Create delightful customer registrations without the heavy lift
          </h1>
          <p className="text-lg text-slate-600">
            Kickstart your onboarding experience with a production-ready Next.js foundation, scalable architecture,
            and automated quality gates. Focus on the customer journey while the platform handles performance,
            accessibility, and resilience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="mailto:bobwares@outlook.com"
              className="inline-flex items-center justify-center rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-200 transition hover:bg-brand-700"
            >
              Request a demo
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-brand-200 bg-white/80 px-6 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-white"
            >
              Explore capabilities
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl">
          <h2 className="text-xl font-semibold text-slate-800">Launch checklist</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>✔️ CI pipeline with lint, typecheck, unit, and E2E suites</li>
            <li>✔️ Runtime environment parsing with zod validation</li>
            <li>✔️ Accessible defaults using semantic HTML and Tailwind</li>
            <li>✔️ Ready for React Query, Zustand, and form workflows</li>
          </ul>
        </div>
      </div>
      <div id="features" className="space-y-6">
        <h2 className="text-2xl font-semibold text-slate-900">Designed for modern onboarding teams</h2>
        <p className="text-slate-600">
          The foundation includes battle-tested libraries and architecture guidance so product teams can scale features
          without rewriting the core experience. Extend it with localized flows, analytics, and workflow automation with
          confidence.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

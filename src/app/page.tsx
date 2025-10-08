/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:10:22Z
 * Exports: revalidate, LandingPage
 * Description: Public landing page surfacing value propositions and entry point to the registration journey.
 */
import Link from 'next/link';

import { fetchLandingContent } from '@/services/registration-service';

export const revalidate = 900;

export default async function LandingPage() {
  const content = await fetchLandingContent();

  return (
    <div className="space-y-12">
      <section className="grid items-center gap-10 rounded-3xl border border-slate-200 bg-white p-10 shadow-card/50 md:grid-cols-2">
        <div className="space-y-6">
          <p className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Registration Accelerator
          </p>
          <h2 className="text-4xl font-bold text-slate-900 sm:text-5xl">{content.heroHeading}</h2>
          <p className="text-lg text-slate-600">{content.heroSubheading}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition hover:bg-blue-600"
            >
              {content.ctaLabel}
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary"
            >
              View flow
            </Link>
          </div>
        </div>
        <div className="grid gap-4">
          {content.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 shadow-inner"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {metric.label}
              </p>
              <p className="mt-2 text-4xl font-bold text-slate-900">{metric.value}</p>
              <p className="mt-1 text-sm text-slate-500">{metric.annotation}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="grid gap-6 md:grid-cols-3">
        {content.features.map((feature) => (
          <article
            key={feature.title}
            className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
            <p className="text-sm text-slate-600">{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}

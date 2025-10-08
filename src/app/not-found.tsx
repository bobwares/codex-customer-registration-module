/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/not-found.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:11:42Z
 * Exports: NotFound
 * Description: Handles unknown routes with guidance back to the registration landing page.
 */
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900">We couldn’t find that page.</h2>
      <p className="mt-3 text-sm text-slate-600">
        The requested resource is unavailable. Return to the onboarding experience and continue registration.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card"
      >
        Back to start
      </Link>
    </div>
  );
}

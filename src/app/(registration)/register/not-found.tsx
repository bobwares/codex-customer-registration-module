/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/not-found.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:14:06Z
 * Exports: RegisterNotFound
 * Description: Handles invalid registration routes by guiding users back to the flow entry point.
 */
import Link from 'next/link';

export default function RegisterNotFound() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-900">Registration step not available</h2>
      <p className="mt-2 text-sm text-slate-600">
        The requested step is invalid or expired. Continue from the main registration page to receive a new link.
      </p>
      <Link
        href="/register"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground shadow-card"
      >
        Back to registration
      </Link>
    </div>
  );
}

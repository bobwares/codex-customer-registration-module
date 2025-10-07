/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/loading.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: Loading
 * Description: Displays a friendly skeleton while server components stream registration content.
 */
export default function Loading() {
  return (
    <div className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-24">
      <div className="h-6 w-40 animate-pulse rounded-full bg-slate-200" />
      <div className="h-10 w-full animate-pulse rounded-2xl bg-slate-200" />
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-32 animate-pulse rounded-3xl bg-slate-200" />
        ))}
      </div>
    </div>
  );
}

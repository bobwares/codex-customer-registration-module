/**
 * App: Customer Registration Module
 * Package: src/app
 * File: loading.tsx
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: LoadingIndicator
 * Description: Displays a skeleton loader while server components stream registration data.
 */
export default function LoadingIndicator() {
  return (
    <section className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-8 px-6">
      <div className="h-4 w-32 animate-pulse rounded-full bg-slate-700" />
      <div className="space-y-4">
        <div className="h-10 w-3/4 animate-pulse rounded-3xl bg-slate-800" />
        <div className="h-10 w-2/3 animate-pulse rounded-3xl bg-slate-800" />
        <div className="h-10 w-1/2 animate-pulse rounded-3xl bg-slate-800" />
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="space-y-3 rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="h-5 w-3/4 animate-pulse rounded-full bg-slate-700" />
            <div className="h-4 w-full animate-pulse rounded-full bg-slate-800" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-800" />
          </div>
        ))}
      </div>
    </section>
  );
}

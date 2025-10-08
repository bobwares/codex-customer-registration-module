/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/loading.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:11:52Z
 * Exports: Loading
 * Description: Provides skeleton UI during streaming of server components.
 */
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-64 animate-pulse rounded-3xl bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
        <div className="h-40 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

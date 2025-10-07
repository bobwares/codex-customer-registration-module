/**
 * App: Customer Registration Module
 * Package: src/app
 * File: loading.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: Loading
 * Description: Loading boundary presenting a skeleton experience while registration data resolves.
 */
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-40 animate-pulse rounded-xl bg-slate-200" />
      <div className="h-64 animate-pulse rounded-xl bg-slate-200" />
    </div>
  );
}

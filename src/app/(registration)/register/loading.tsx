/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/loading.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:13:42Z
 * Exports: RegisterLoading
 * Description: Loading skeleton for registration step routes with multi-panel placeholders.
 */
export default function RegisterLoading() {
  return (
    <div className="space-y-6">
      <div className="h-32 animate-pulse rounded-3xl bg-slate-200" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
          <div className="h-48 animate-pulse rounded-2xl bg-slate-200" />
        </div>
        <div className="h-72 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    </div>
  );
}

/**
 * App: Customer Registration Module
 * Package: src/app
 * File: loading.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: Loading
 * Description: Suspense fallback presenting a loading indicator while
 *              server components resolve.
 */
export default function Loading(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <span className="h-12 w-12 animate-spin rounded-full border-4 border-brand-200 border-t-brand-600" aria-hidden />
      <p className="text-sm font-medium text-slate-600">Preparing your customer registration experience...</p>
    </div>
  );
}

/**
 * App: Customer Registration Module
 * Package: src/app
 * File: not-found.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: NotFoundPage
 * Description: Custom 404 boundary providing guidance when a requested
 *              resource cannot be located.
 */
export default function NotFoundPage(): JSX.Element {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-semibold text-slate-900">Page not found</h1>
      <p className="max-w-xl text-slate-600">
        The page you are looking for no longer exists or may have been moved. Return to the home page to continue
        building your registration experience.
      </p>
      <a
        href="/"
        className="rounded-full border border-brand-200 bg-white px-5 py-3 text-sm font-semibold text-brand-700 transition hover:border-brand-300 hover:bg-brand-50"
      >
        Back to home
      </a>
    </div>
  );
}

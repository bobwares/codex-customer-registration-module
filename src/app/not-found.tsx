/**
 * App: Customer Registration Module
 * Package: src/app
 * File: not-found.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: NotFound
 * Description: Displays a 404 experience for unknown routes within the
 *              registration flow and guides users back to the start page.
 */
export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-semibold text-neutral-900">Page not found</h1>
      <p className="text-base text-neutral-600">
        We could not locate that step. Double-check the link or return to the registration homepage.
      </p>
      <a
        href="/"
        className="rounded-lg border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-700 hover:border-primary hover:text-primary"
      >
        Back to registration
      </a>
    </div>
  );
}

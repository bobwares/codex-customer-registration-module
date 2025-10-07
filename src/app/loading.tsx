/**
 * App: Customer Registration Module
 * Package: src/app
 * File: loading.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: Loading
 * Description: Provides a loading placeholder to maintain perceived
 *              responsiveness while registration resources hydrate.
 */
export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" aria-hidden="true" />
      <p className="text-base text-neutral-600">Preparing your registration experience…</p>
    </div>
  );
}

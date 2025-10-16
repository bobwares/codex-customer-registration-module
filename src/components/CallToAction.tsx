/**
 * App: Customer Registration Module
 * Package: src/components
 * File: CallToAction.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: CallToAction
 * Description: Reusable call-to-action section presenting key registration actions.
 */
interface CallToActionProps {
  readonly headline: string;
  readonly body: string;
  readonly primaryLabel: string;
}

export function CallToAction({ headline, body, primaryLabel }: CallToActionProps) {
  return (
    <div className="rounded-3xl bg-primary-600 px-8 py-10 text-white shadow-lg">
      <h2 className="text-3xl font-semibold">{headline}</h2>
      <p className="mt-4 max-w-2xl text-lg text-primary-100">{body}</p>
      <button
        type="button"
        className="mt-6 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-primary-700 transition hover:bg-primary-50"
      >
        {primaryLabel}
      </button>
    </div>
  );
}

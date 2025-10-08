/**
 * App: Customer Registration Module
 * Package: frontend.components.registration
 * File: src/components/registration/StepProgress.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:09:18Z
 * Exports: StepProgress
 * Description: Client component visualizing the multi-step registration journey with contextual status.
 */
'use client';

import clsx from 'clsx';

import { useRegistrationStore, type RegistrationStep } from '@/state/registration-store';

const STEPS: RegistrationStep[] = ['start', 'verify', 'complete', 'success'];

const LABELS: Record<RegistrationStep, string> = {
  start: 'Account details',
  verify: 'Verify identity',
  complete: 'Personalization',
  success: 'Activation'
};

export function StepProgress() {
  const currentStep = useRegistrationStore((state) => state.currentStep);
  const lastCompleted = useRegistrationStore((state) => state.lastCompletedStep);

  return (
    <nav aria-label="Registration progress" className="mb-10">
      <ol className="flex flex-wrap gap-4">
        {STEPS.map((step, index) => {
          const isCurrent = currentStep === step;
          const isCompleted =
            lastCompleted &&
            (STEPS.indexOf(lastCompleted) >= index || currentStep === 'success');
          return (
            <li
              key={step}
              className={clsx(
                'flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                isCurrent && 'border-primary bg-primary text-primary-foreground shadow-card',
                !isCurrent && isCompleted && 'border-green-500 bg-green-50 text-green-700',
                !isCurrent && !isCompleted && 'border-slate-200 bg-white text-slate-500'
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-current text-xs">
                {index + 1}
              </span>
              <span>{LABELS[step]}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

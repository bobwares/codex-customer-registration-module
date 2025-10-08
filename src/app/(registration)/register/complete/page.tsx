/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/complete/page.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:11:08Z
 * Exports: dynamic, CompletePage
 * Description: Final registration step route capturing personal data, consent, and communication preferences.
 */
import { CompleteForm } from '@/components/registration/CompleteForm';
import { StepProgress } from '@/components/registration/StepProgress';

export const dynamic = 'force-dynamic';

interface CompletePageProps {
  readonly searchParams?: Record<string, string | string[]>;
}

export default function CompletePage({ searchParams }: CompletePageProps) {
  const registrationId = typeof searchParams?.registrationId === 'string' ? searchParams?.registrationId : undefined;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">Personalize your experience</h2>
        <p className="mt-2 text-sm text-slate-600">
          Provide the minimum profile attributes required at activation and set marketing preferences. You can update everything later from your profile.
        </p>
      </section>
      <StepProgress />
      <CompleteForm prefillRegistrationId={registrationId} />
    </div>
  );
}

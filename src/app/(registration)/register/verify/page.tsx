/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/verify/page.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:10:54Z
 * Exports: dynamic, VerifyPage
 * Description: Dedicated verification step route supporting deep linking from transactional emails.
 */
import { StepProgress } from '@/components/registration/StepProgress';
import { VerifyForm } from '@/components/registration/VerifyForm';

export const dynamic = 'force-dynamic';

interface VerifyPageProps {
  readonly searchParams?: Record<string, string | string[]>;
}

export default function VerifyPage({ searchParams }: VerifyPageProps) {
  const registrationId = typeof searchParams?.registrationId === 'string' ? searchParams?.registrationId : undefined;
  const email = typeof searchParams?.email === 'string' ? searchParams.email : undefined;

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">Verify your identity</h2>
        <p className="mt-2 text-sm text-slate-600">
          Enter the one-time code delivered to your preferred channel. You can request a resend if the code expires.
        </p>
      </section>
      <StepProgress />
      <VerifyForm prefillRegistrationId={registrationId} prefillEmail={email} />
    </div>
  );
}

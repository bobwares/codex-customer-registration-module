/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/page.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:10:38Z
 * Exports: dynamic, RegisterPage
 * Description: Server-driven registration orchestrator assembling multi-step forms and progress context.
 */
import { StepProgress } from '@/components/registration/StepProgress';
import { CompleteForm } from '@/components/registration/CompleteForm';
import { StartForm } from '@/components/registration/StartForm';
import { VerifyForm } from '@/components/registration/VerifyForm';
import { fetchRegistrationPolicy } from '@/services/registration-service';

export const dynamic = 'force-dynamic';

export default async function RegisterPage() {
  const policy = await fetchRegistrationPolicy();

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">Create your secure account</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Registration is a guided three-step flow that enforces adaptive MFA, duplicate detection, and consent capture.
        </p>
      </section>
      <StepProgress />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <StartForm policy={policy} />
          <VerifyForm />
          <CompleteForm />
        </div>
        <aside className="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
          <div>
            <h3 className="text-base font-semibold text-slate-900">Operational guardrails</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>MFA enforced at first login with configurable channel prioritization.</li>
              <li>Automatic throttling after five OTP attempts with progressive backoff.</li>
              <li>Audit trail emitted for every event: started, OTP sent, verified, completed.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-900">SLO snapshot</h3>
            <ul className="mt-3 space-y-2">
              <li><span className="font-semibold">Availability:</span> 99.9% monthly target.</li>
              <li><span className="font-semibold">OTP delivery:</span> 98% within 60 seconds.</li>
              <li><span className="font-semibold">Completion:</span> ≥ 70% conversion at launch.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

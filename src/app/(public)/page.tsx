/**
 * App: Customer Registration Module
 * Package: src/app/(public)
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: RegistrationLandingPage
 * Description: Landing page introducing the registration experience and guiding users into the flow.
 */
import { CallToAction } from "@/components/CallToAction";

export default function RegistrationLandingPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16">
      <section className="rounded-3xl bg-white p-10 shadow-sm">
        <h1 className="text-4xl font-semibold text-primary-700">
          Create your customer account
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Start a secure registration journey with multi-factor verification and
          tailored communication preferences.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-primary-600">
              Secure verification
            </h2>
            <p className="mt-2 text-slate-600">
              Email-first one time passcodes with SMS fallback keep your account
              safe from the beginning.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold text-primary-600">
              Preference awareness
            </h2>
            <p className="mt-2 text-slate-600">
              Choose communication channels, languages, and marketing consent to
              personalize your experience.
            </p>
          </div>
        </div>
      </section>
      <section className="rounded-3xl border border-dashed border-primary-200 bg-white/40 p-10">
        <h2 className="text-2xl font-semibold text-primary-700">Next steps</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-slate-600">
          <li>Verify your email address with a secure one-time passcode.</li>
          <li>Provide essential profile details and localization preferences.</li>
          <li>Confirm consent so we tailor communication to your needs.</li>
        </ol>
      </section>
      <CallToAction
        headline="Ready to continue?"
        body="Launch the guided registration flow to create your account, verify your identity, and set communication preferences in one secure session."
        primaryLabel="Start registration"
      />
    </main>
  );
}

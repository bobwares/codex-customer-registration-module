/**
 * App: Customer Registration Module
 * Package: src/app
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: HomePage
 * Description: Renders the landing screen introducing the secure registration
 *              flow and outlining the key steps for new customers.
 */
export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-5xl flex-col items-center justify-center gap-12 px-6 py-16">
      <section className="flex flex-col items-center gap-6 text-center">
        <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
          Start in three simple steps
        </span>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Register securely and activate your account in minutes
        </h1>
        <p className="max-w-2xl text-lg text-neutral-600">
          Provide your contact details, verify with a one-time passcode, and set your
          preferences so we can tailor communications from day one.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#start"
            className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow hover:bg-primary/90"
          >
            Begin registration
          </a>
          <a
            href="#learn-more"
            className="rounded-lg border border-neutral-300 px-6 py-3 text-base font-semibold text-neutral-700 hover:border-primary hover:text-primary"
          >
            Learn how it works
          </a>
        </div>
      </section>
      <section id="learn-more" className="grid w-full gap-6 sm:grid-cols-3">
        {["Create account", "Verify identity", "Set preferences"].map((step, index) => (
          <article
            key={step}
            className="flex h-full flex-col gap-3 rounded-xl border border-neutral-200 bg-white p-6 text-left shadow-sm"
          >
            <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
            <h2 className="text-xl font-semibold text-neutral-900">{step}</h2>
            <p className="text-sm text-neutral-600">
              {index === 0 && "Use your email and a strong password that meets our policy."}
              {index === 1 && "Confirm via secure OTP delivered to your chosen channel."}
              {index === 2 && "Select communication preferences and give consent with clarity."}
            </p>
          </article>
        ))}
      </section>
    </div>
  );
}

/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/components/RegistrationFlow.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: RegistrationFlow
 * Description: Client-side orchestrator for the three-step registration wizard leveraging server actions and Zustand state.
 */
'use client';

import { useMemo, useState, useTransition } from 'react';
import {
  type FieldValues,
  type Path,
  type UseFormReturn,
  useForm
} from 'react-hook-form';
import type { PasswordPolicy } from '@/services/policy';
import type { RegistrationReferenceData } from '@/services/registration-reference';
import {
  completeRegistrationSchema,
  otpVerificationSchema,
  startRegistrationSchema,
  type CompleteRegistrationInput,
  type OtpVerificationInput,
  type StartRegistrationInput
} from '../schemas';
import {
  completeRegistrationAction,
  sendOtpAction,
  startRegistrationAction,
  verifyOtpAction
} from '../actions';
import type { CompleteRegistrationActionResult } from '../actions';
import { createZodResolver } from '../resolvers';
import { useRegistrationStore } from '../state';

function applyFieldErrors<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  errors?: Record<string, string[]>
) {
  if (!errors) {
    return;
  }

  Object.entries(errors).forEach(([field, messages]) => {
    form.setError(field as Path<TFieldValues>, {
      type: 'server',
      message: messages.join(' ')
    });
  });
}

const steps = [
  { id: 'start', label: 'Account setup' },
  { id: 'verify', label: 'Verify identity' },
  { id: 'details', label: 'Personal details' },
  { id: 'success', label: 'Completed' }
] as const;

type StepId = (typeof steps)[number]['id'];

interface RegistrationFlowProps {
  readonly policy: PasswordPolicy;
  readonly reference: RegistrationReferenceData;
}

export function RegistrationFlow({ policy, reference }: RegistrationFlowProps) {
  const registrationState = useRegistrationStore();
  const [startError, setStartError] = useState<string | null>(null);
  const [otpError, setOtpError] = useState<string | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [otpNotice, setOtpNotice] = useState<string | null>(null);
  const [debugOtpCode, setDebugOtpCode] = useState<string | null>(null);
  const [completionDetails, setCompletionDetails] =
    useState<CompleteRegistrationActionResult | null>(null);

  const [isStarting, startTransition] = useTransition();
  const [isResending, resendTransition] = useTransition();
  const [isVerifying, verifyTransition] = useTransition();
  const [isCompleting, completeTransition] = useTransition();

  const defaultLocale = reference.languages[0]?.code ?? 'en-US';
  const defaultCountry = reference.countries[0]?.code ?? 'US';
  const defaultChannel = reference.marketingChannels[0]?.id ?? 'email';

  const startForm = useForm<StartRegistrationInput>({
    resolver: createZodResolver(startRegistrationSchema),
    defaultValues: {
      email: '',
      password: '',
      locale: defaultLocale,
      channel: 'email',
      phone: ''
    }
  });

  const otpForm = useForm<OtpVerificationInput>({
    resolver: createZodResolver(otpVerificationSchema),
    defaultValues: {
      registrationId: '',
      code: ''
    }
  });

  const detailsForm = useForm<CompleteRegistrationInput>({
    resolver: createZodResolver(completeRegistrationSchema),
    defaultValues: {
      registrationId: '',
      firstName: '',
      lastName: '',
      country: defaultCountry,
      language: defaultLocale,
      marketingOptIn: true,
      communicationChannel: defaultChannel
    }
  });

  const passwordRequirements = useMemo(() => {
    const requirements: string[] = [
      `Minimum length of ${policy.minLength} characters.`
    ];

    if (policy.requiresUppercase) {
      requirements.push('At least one uppercase letter.');
    }
    if (policy.requiresLowercase) {
      requirements.push('At least one lowercase letter.');
    }
    if (policy.requiresNumber) {
      requirements.push('At least one number.');
    }
    if (policy.requiresSymbol) {
      requirements.push('At least one special character.');
    }

    return requirements;
  }, [policy]);

  const channelLabel = useMemo(() => {
    return (
      reference.marketingChannels.find(
        (channel) => channel.id === registrationState.preferredChannel
      )?.label ?? registrationState.preferredChannel
    );
  }, [reference.marketingChannels, registrationState.preferredChannel]);

  const selectedAccountChannel = startForm.watch('channel');

  const resetFlow = () => {
    registrationState.reset();
    setStartError(null);
    setOtpError(null);
    setDetailsError(null);
    setOtpNotice(null);
    setDebugOtpCode(null);
    setCompletionDetails(null);
    startForm.reset({
      email: '',
      password: '',
      locale: defaultLocale,
      channel: 'email',
      phone: ''
    });
    otpForm.reset({ registrationId: '', code: '' });
    detailsForm.reset({
      registrationId: '',
      firstName: '',
      lastName: '',
      country: defaultCountry,
      language: defaultLocale,
      marketingOptIn: true,
      communicationChannel: defaultChannel
    });
  };

  const handleStart = startForm.handleSubmit((values) => {
    startTransition(async () => {
      setStartError(null);
      setOtpNotice(null);
      setDebugOtpCode(null);
      startForm.clearErrors();
      const result = await startRegistrationAction(values);
      if (!result.success) {
        applyFieldErrors(startForm, result.fieldErrors);
        setStartError(result.error);
        return;
      }

      registrationState.initialize({
        registrationId: result.data.registrationId,
        channel: result.data.channel,
        email: result.data.email,
        events: result.data.events
      });
      otpForm.clearErrors();
      otpForm.reset({
        registrationId: result.data.registrationId,
        code: ''
      });
      detailsForm.setValue('registrationId', result.data.registrationId);
      setOtpNotice(
        `OTP sent to ${result.data.channel === 'sms' ? 'phone' : 'email'} and expires at ${
          new Date(result.data.otpExpiresAt).toLocaleTimeString()
        }.`
      );
      setDebugOtpCode(result.data.debugCode ?? null);
    });
  });

  const handleResend = () => {
    if (!registrationState.registrationId) {
      return;
    }

    resendTransition(async () => {
      setOtpError(null);
      otpForm.clearErrors();
      const result = await sendOtpAction(registrationState.registrationId!);
      if (!result.success) {
        setOtpError(result.error);
        return;
      }

      registrationState.appendEvents(result.data.events);
      setOtpNotice(
        `New OTP sent via ${result.data.channel.toUpperCase()} and expires at ${
          new Date(result.data.otpExpiresAt).toLocaleTimeString()
        }.`
      );
      setDebugOtpCode(result.data.debugCode ?? null);
    });
  };

  const handleVerify = otpForm.handleSubmit((values) => {
    if (!registrationState.registrationId) {
      return;
    }

    verifyTransition(async () => {
      setOtpError(null);
      const result = await verifyOtpAction({
        ...values,
        registrationId: registrationState.registrationId!
      });
      if (!result.success) {
        applyFieldErrors(otpForm, result.fieldErrors);
        setOtpError(result.error);
        return;
      }

      registrationState.markVerified(result.data.events);
      setOtpNotice('Verification successful. Provide personal details to finish.');
    });
  });

  const handleComplete = detailsForm.handleSubmit((values) => {
    if (!registrationState.registrationId) {
      return;
    }

    completeTransition(async () => {
      setDetailsError(null);
      detailsForm.clearErrors();
      const result = await completeRegistrationAction({
        ...values,
        registrationId: registrationState.registrationId!
      });
      if (!result.success) {
        applyFieldErrors(detailsForm, result.fieldErrors);
        setDetailsError(result.error);
        return;
      }

      registrationState.complete({
        customerId: result.data.customerId,
        events: result.data.events
      });
      setCompletionDetails(result.data);
    });
  });

  const renderStep = (step: StepId) => {
    switch (step) {
      case 'start':
        return (
          <form className="space-y-6" onSubmit={handleStart}>
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="email">
                Work email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                {...startForm.register('email')}
              />
              {startForm.formState.errors.email && (
                <p className="mt-2 text-sm text-rose-600">
                  {startForm.formState.errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                {...startForm.register('password')}
              />
              {startForm.formState.errors.password && (
                <p className="mt-2 text-sm text-rose-600">
                  {startForm.formState.errors.password.message}
                </p>
              )}
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-500">
                {passwordRequirements.map((requirement) => (
                  <li key={requirement}>{requirement}</li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-slate-400">
                {policy.description} Last updated {new Date(policy.lastUpdated).toDateString()}.
              </p>
              {policy.prohibitedPhrases.length > 0 && (
                <p className="mt-2 text-xs text-slate-500">
                  Avoid common phrases such as {policy.prohibitedPhrases.join(', ')}.
                </p>
              )}
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="locale">
                  Preferred locale
                </label>
                <select
                  id="locale"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...startForm.register('locale')}
                >
                  {reference.languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.label}
                    </option>
                  ))}
                </select>
                {startForm.formState.errors.locale && (
                  <p className="mt-2 text-sm text-rose-600">
                    {startForm.formState.errors.locale.message}
                  </p>
                )}
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-700">OTP delivery</span>
                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      value="email"
                      className="h-4 w-4"
                      {...startForm.register('channel')}
                    />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-sm text-slate-700">
                    <input
                      type="radio"
                      value="sms"
                      className="h-4 w-4"
                      {...startForm.register('channel')}
                    />
                    SMS
                  </label>
                </div>
                {selectedAccountChannel === 'sms' && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700" htmlFor="phone">
                      Mobile number (international format)
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                      placeholder="+1 555 0100"
                      {...startForm.register('phone')}
                    />
                    {startForm.formState.errors.phone && (
                      <p className="mt-2 text-sm text-rose-600">
                        {startForm.formState.errors.phone.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            {startError && <p className="text-sm text-rose-600">{startError}</p>}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isStarting}
            >
              {isStarting ? 'Starting…' : 'Continue to verification'}
            </button>
          </form>
        );
      case 'verify':
        return (
          <form className="space-y-6" onSubmit={handleVerify}>
            <p className="text-sm text-slate-600">
              We sent an OTP to {registrationState.email}. Enter the six-digit code to verify
              your identity. Need a new one? Resend below.
            </p>
            <input type="hidden" {...otpForm.register('registrationId')} />
            {otpNotice && (
              <div className="rounded-lg border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
                {otpNotice}
              </div>
            )}
            {debugOtpCode && (
              <p className="text-xs text-slate-500">
                Developer note: use code <strong>{debugOtpCode}</strong> in this sandbox.
              </p>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700" htmlFor="otp-code">
                Verification code
              </label>
              <input
                id="otp-code"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base tracking-[0.5em] focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                maxLength={6}
                {...otpForm.register('code')}
              />
              {otpForm.formState.errors.code && (
                <p className="mt-2 text-sm text-rose-600">
                  {otpForm.formState.errors.code.message}
                </p>
              )}
            </div>
            {otpError && <p className="text-sm text-rose-600">{otpError}</p>}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={isVerifying}
              >
                {isVerifying ? 'Verifying…' : 'Verify code'}
              </button>
              <button
                type="button"
                onClick={handleResend}
                className="text-sm font-semibold text-brand-600 disabled:cursor-not-allowed disabled:text-slate-400"
                disabled={isResending}
              >
                {isResending ? 'Sending…' : 'Resend code'}
              </button>
            </div>
          </form>
        );
      case 'details':
        return (
          <form className="space-y-6" onSubmit={handleComplete}>
            <input type="hidden" {...detailsForm.register('registrationId')} />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="first-name">
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  autoComplete="given-name"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...detailsForm.register('firstName')}
                />
                {detailsForm.formState.errors.firstName && (
                  <p className="mt-2 text-sm text-rose-600">
                    {detailsForm.formState.errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="last-name">
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  autoComplete="family-name"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...detailsForm.register('lastName')}
                />
                {detailsForm.formState.errors.lastName && (
                  <p className="mt-2 text-sm text-rose-600">
                    {detailsForm.formState.errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="country">
                  Country/region
                </label>
                <select
                  id="country"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...detailsForm.register('country')}
                >
                  {reference.countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {detailsForm.formState.errors.country && (
                  <p className="mt-2 text-sm text-rose-600">
                    {detailsForm.formState.errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700" htmlFor="language">
                  Preferred language
                </label>
                <select
                  id="language"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...detailsForm.register('language')}
                >
                  {reference.languages.map((language) => (
                    <option key={language.code} value={language.code}>
                      {language.label}
                    </option>
                  ))}
                </select>
                {detailsForm.formState.errors.language && (
                  <p className="mt-2 text-sm text-rose-600">
                    {detailsForm.formState.errors.language.message}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  {...detailsForm.register('marketingOptIn')}
                />
                <span>
                  I agree to receive marketing communications. Consent is logged with a
                  timestamp and can be withdrawn at any time.
                </span>
              </label>
              {detailsForm.formState.errors.marketingOptIn && (
                <p className="mt-2 text-sm text-rose-600">
                  {detailsForm.formState.errors.marketingOptIn.message}
                </p>
              )}
              <div className="mt-4">
                <label className="block text-sm font-medium text-slate-700" htmlFor="communicationChannel">
                  Preferred communication channel
                </label>
                <select
                  id="communicationChannel"
                  className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-base focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
                  {...detailsForm.register('communicationChannel')}
                >
                  {reference.marketingChannels.map((channel) => (
                    <option key={channel.id} value={channel.id}>
                      {channel.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-slate-500">
                  {reference.marketingChannels.find(
                    (channel) => channel.id === detailsForm.watch('communicationChannel')
                  )?.description || ''}
                </p>
              </div>
            </div>
            {detailsError && <p className="text-sm text-rose-600">{detailsError}</p>}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-brand-500 disabled:cursor-not-allowed disabled:bg-slate-300"
              disabled={isCompleting}
            >
              {isCompleting ? 'Creating account…' : 'Create account'}
            </button>
          </form>
        );
      case 'success':
        return (
          <div className="space-y-6">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-6 py-5 text-emerald-800">
              <h3 className="text-lg font-semibold">Registration complete</h3>
              <p className="mt-2 text-sm">
                Customer ID <strong>{registrationState.customerId}</strong> is ready to use.
                Consent logged at {completionDetails?.consentTimestamp} with marketing channel
                {completionDetails?.communicationChannel}.
              </p>
            </div>
            <section aria-live="polite" className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-700">Event timeline</h4>
              <ol className="space-y-2 text-sm text-slate-600">
                {registrationState.events.map((event, index) => (
                  <li key={`${event}-${index}`} className="rounded-lg bg-white px-4 py-2 shadow">
                    {event}
                  </li>
                ))}
              </ol>
            </section>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-lg border border-brand-200 px-4 py-2 text-sm font-semibold text-brand-700 hover:bg-brand-50"
              onClick={resetFlow}
            >
              Start another registration
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10">
      <nav aria-label="Progress">
        <ol className="grid gap-3 sm:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.id}
              className={`rounded-xl border px-4 py-3 text-sm font-semibold ${
                registrationState.step === step.id
                  ? 'border-brand-300 bg-brand-50 text-brand-700'
                  : 'border-slate-200 bg-white text-slate-500'
              }`}
            >
              {step.label}
            </li>
          ))}
        </ol>
      </nav>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-brand-100">
        {renderStep(registrationState.step)}
      </div>
      {registrationState.step !== 'start' && registrationState.step !== 'success' && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-6 py-4 text-sm text-slate-600">
          <p>
            Channel preference: <strong>{channelLabel}</strong>. OTPs sent to{' '}
            {registrationState.preferredChannel === 'sms' ? 'mobile number' : 'email'}.
          </p>
        </div>
      )}
    </div>
  );
}

export default RegistrationFlow;

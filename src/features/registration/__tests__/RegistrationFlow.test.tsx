/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/__tests__/RegistrationFlow.test.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: none
 * Description: Validates the multi-step registration flow transitions and error handling using mocked server actions.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { act, screen, waitFor } from '@testing-library/react';
import { RegistrationFlow } from '@/features/registration/components/RegistrationFlow';
import { renderWithProviders } from '@/test-utils/render';
import { useRegistrationStore } from '@/features/registration/state';
import type {
  CompleteRegistrationActionResult,
  SendOtpActionResult,
  StartRegistrationActionResult,
  VerifyOtpActionResult
} from '@/features/registration/actions';

vi.mock('@/features/registration/actions', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    startRegistrationAction: vi.fn(),
    sendOtpAction: vi.fn(),
    verifyOtpAction: vi.fn(),
    completeRegistrationAction: vi.fn()
  };
});

const mockedActions = vi.mocked(
  await import('@/features/registration/actions')
);

const passwordPolicy = {
  minLength: 12,
  requiresNumber: true,
  requiresUppercase: true,
  requiresLowercase: true,
  requiresSymbol: true,
  prohibitedPhrases: ['password'],
  description: 'Strong passwords keep accounts safe.',
  lastUpdated: '2025-09-15T00:00:00Z'
};

const referenceData = {
  countries: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' }
  ],
  languages: [
    { code: 'en-US', label: 'English (United States)' },
    { code: 'fr-CA', label: 'French (Canada)' }
  ],
  marketingChannels: [
    { id: 'email', label: 'Email', description: 'Email updates.' },
    { id: 'sms', label: 'SMS', description: 'SMS alerts.' },
    { id: 'none', label: 'None', description: 'Transactional only.' }
  ]
} as const;

describe('RegistrationFlow', () => {
  beforeEach(() => {
    useRegistrationStore.getState().reset();
  });

  afterEach(() => {
    vi.clearAllMocks();
    useRegistrationStore.getState().reset();
  });

  it('completes the happy path when server actions succeed', async () => {
    const startPayload: StartRegistrationActionResult = {
      registrationId: '11111111-1111-1111-1111-111111111111',
      channel: 'email',
      email: 'jane@example.com',
      otpExpiresAt: new Date(Date.now() + 300_000).toISOString(),
      events: ['registration.started', 'registration.otp_sent'],
      debugCode: '123456'
    };
    const resendPayload: SendOtpActionResult = {
      channel: 'email',
      otpExpiresAt: new Date(Date.now() + 300_000).toISOString(),
      events: ['registration.otp_sent'],
      debugCode: '654321'
    };
    const verifyPayload: VerifyOtpActionResult = {
      events: ['registration.otp_verified']
    };
    const completePayload: CompleteRegistrationActionResult = {
      customerId: 'CUST-123456',
      consentTimestamp: new Date().toISOString(),
      events: ['registration.completed'],
      marketingOptIn: true,
      communicationChannel: 'email',
      language: 'en-US'
    };

    mockedActions.startRegistrationAction.mockResolvedValue({
      success: true,
      data: startPayload
    });
    mockedActions.sendOtpAction.mockResolvedValue({ success: true, data: resendPayload });
    mockedActions.verifyOtpAction.mockResolvedValue({ success: true, data: verifyPayload });
    mockedActions.completeRegistrationAction.mockResolvedValue({
      success: true,
      data: completePayload
    });

    renderWithProviders(<RegistrationFlow policy={passwordPolicy} reference={referenceData} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/work email/i), 'jane@example.com');
    await user.type(screen.getByLabelText(/password/i), 'Str0ngP@ssword!');
    await user.selectOptions(screen.getByLabelText(/preferred locale/i), 'en-US');

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /continue to verification/i }));
    });

    await waitFor(() => {
      expect(mockedActions.startRegistrationAction).toHaveBeenCalled();
    });
    await screen.findByText(/developer note/i);

    await act(async () => {
      await user.type(screen.getByLabelText(/verification code/i), '123456');
      await user.click(screen.getByRole('button', { name: /verify code/i }));
    });

    await waitFor(() => {
      expect(mockedActions.verifyOtpAction).toHaveBeenCalled();
    });

    await user.clear(screen.getByLabelText(/first name/i));
    await user.type(screen.getByLabelText(/first name/i), 'Jane');
    await user.clear(screen.getByLabelText(/last name/i));
    await user.type(screen.getByLabelText(/last name/i), 'Doe');
    await user.selectOptions(screen.getByLabelText(/country/i), 'US');
    await user.selectOptions(screen.getByLabelText(/preferred language/i), 'en-US');

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /create account/i }));
    });

    await waitFor(() => {
      expect(mockedActions.completeRegistrationAction).toHaveBeenCalled();
    });

    expect(await screen.findByText(/registration complete/i)).toBeInTheDocument();
    expect(screen.getByText(/CUST-123456/)).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBeGreaterThan(0);
  });

  it('surfaces server validation errors to the user', async () => {
    mockedActions.startRegistrationAction.mockResolvedValue({
      success: false,
      error: 'Validation failed.',
      fieldErrors: { email: ['Email already exists.'] }
    });

    renderWithProviders(<RegistrationFlow policy={passwordPolicy} reference={referenceData} />);

    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/work email/i), 'taken@example.com');
    await user.type(screen.getByLabelText(/password/i), 'AnotherStr0ng!');

    await act(async () => {
      await user.click(screen.getByRole('button', { name: /continue to verification/i }));
    });

    expect(await screen.findByText(/email already exists/i)).toBeInTheDocument();
    expect(mockedActions.startRegistrationAction).toHaveBeenCalled();
  });
});

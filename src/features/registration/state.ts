/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/state.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: RegistrationStep, useRegistrationStore
 * Description: Zustand store coordinating registration wizard progress, session metadata, and emitted events.
 */
'use client';

import { create } from 'zustand';
import type { StartRegistrationInput } from './schemas';

export type RegistrationStep = 'start' | 'verify' | 'details' | 'success';

interface RegistrationStore {
  readonly step: RegistrationStep;
  readonly registrationId: string | null;
  readonly preferredChannel: StartRegistrationInput['channel'];
  readonly email: string | null;
  readonly verified: boolean;
  readonly customerId: string | null;
  readonly events: string[];
  initialize(payload: {
    registrationId: string;
    channel: StartRegistrationInput['channel'];
    email: string;
    events: string[];
  }): void;
  appendEvents(events: string[]): void;
  markVerified(events: string[]): void;
  complete(payload: { customerId: string; events: string[] }): void;
  setStep(step: RegistrationStep): void;
  reset(): void;
}

export const useRegistrationStore = create<RegistrationStore>((set) => ({
  step: 'start',
  registrationId: null,
  preferredChannel: 'email',
  email: null,
  verified: false,
  customerId: null,
  events: [],
  initialize: ({ registrationId, channel, email, events }) =>
    set({
      registrationId,
      preferredChannel: channel,
      email,
      step: 'verify',
      verified: false,
      events: [...events]
    }),
  appendEvents: (events) =>
    set((state) => ({
      events: [...state.events, ...events]
    })),
  markVerified: (events) =>
    set((state) => ({
      verified: true,
      step: 'details',
      events: [...state.events, ...events]
    })),
  complete: ({ customerId, events }) =>
    set((state) => ({
      customerId,
      step: 'success',
      events: [...state.events, ...events]
    })),
  setStep: (step) => set({ step }),
  reset: () =>
    set({
      step: 'start',
      registrationId: null,
      preferredChannel: 'email',
      email: null,
      verified: false,
      customerId: null,
      events: []
    })
}));

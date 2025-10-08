/**
 * App: Customer Registration Module
 * Package: frontend.state
 * File: src/state/registration-store.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:09:02Z
 * Exports: useRegistrationStore
 * Description: Zustand store tracking multi-step registration progress and server action outcomes.
 */
'use client';

import { create } from 'zustand';

export type RegistrationStep = 'start' | 'verify' | 'complete' | 'success';

interface RegistrationState {
  readonly registrationId?: string;
  readonly currentStep: RegistrationStep;
  readonly email?: string;
  readonly lastCompletedStep?: RegistrationStep;
  setRegistrationId: (id: string) => void;
  advanceStep: (step: RegistrationStep) => void;
  reset: () => void;
  setEmail: (email: string) => void;
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  currentStep: 'start',
  setRegistrationId: (id) => set({ registrationId: id, currentStep: 'verify', lastCompletedStep: 'start' }),
  advanceStep: (step) => set({ currentStep: step, lastCompletedStep: step }),
  reset: () => set({ registrationId: undefined, currentStep: 'start', email: undefined, lastCompletedStep: undefined }),
  setEmail: (email) => set({ email })
}));

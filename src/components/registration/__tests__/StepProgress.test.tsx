/**
 * App: Customer Registration Module
 * Package: frontend.components.registration.tests
 * File: src/components/registration/__tests__/StepProgress.test.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:13:16Z
 * Exports: StepProgress test suite
 * Description: Validates that the registration progress indicator reflects store state transitions.
 */
import { render, screen } from '@testing-library/react';
import { act } from 'react';

import { StepProgress } from '../StepProgress';
import { useRegistrationStore } from '@/state/registration-store';

describe('StepProgress', () => {
  it('renders all steps in order', () => {
    render(<StepProgress />);

    expect(screen.getByText('Account details')).toBeInTheDocument();
    expect(screen.getByText('Verify identity')).toBeInTheDocument();
    expect(screen.getByText('Personalization')).toBeInTheDocument();
    expect(screen.getByText('Activation')).toBeInTheDocument();
  });

  it('highlights the verify step when store advances', () => {
    render(<StepProgress />);

    act(() => {
      useRegistrationStore.getState().advanceStep('verify');
    });

    const verifyStep = screen.getByText('Verify identity');
    expect(verifyStep.closest('li')).toHaveClass('border-primary');
  });
});

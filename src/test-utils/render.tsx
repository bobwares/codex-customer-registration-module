/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/test-utils/render.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: renderWithProviders
 * Description: Testing utility that renders React components with default providers and returns helpers.
 */
import type { ReactElement } from 'react';
import { render } from '@testing-library/react';

export function renderWithProviders(ui: ReactElement) {
  return render(ui);
}

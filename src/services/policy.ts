/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/services/policy.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: PasswordPolicy, getPasswordPolicy
 * Description: Supplies password policy metadata for registration guidance and validation messaging.
 */
export interface PasswordPolicy {
  readonly minLength: number;
  readonly requiresNumber: boolean;
  readonly requiresUppercase: boolean;
  readonly requiresLowercase: boolean;
  readonly requiresSymbol: boolean;
  readonly prohibitedPhrases: readonly string[];
  readonly description: string;
  readonly lastUpdated: string;
}

const passwordPolicy: PasswordPolicy = {
  minLength: 12,
  requiresNumber: true,
  requiresUppercase: true,
  requiresLowercase: true,
  requiresSymbol: true,
  prohibitedPhrases: ['password', '123456', 'qwerty', 'letmein'],
  description:
    'Passwords must be unique, strong, and never reused across customer or internal systems.',
  lastUpdated: '2025-09-15T00:00:00Z'
};

export async function getPasswordPolicy(): Promise<PasswordPolicy> {
  return passwordPolicy;
}

/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/services/registration-reference.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: RegistrationReferenceData, getRegistrationReferenceData
 * Description: Provides country, language, and messaging channel reference data for the registration flow.
 */
export interface RegistrationReferenceData {
  readonly countries: readonly { code: string; name: string }[];
  readonly languages: readonly { code: string; label: string }[];
  readonly marketingChannels: readonly {
    id: 'email' | 'sms' | 'none';
    label: string;
    description: string;
  }[];
}

const referenceData: RegistrationReferenceData = {
  countries: [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'AU', name: 'Australia' }
  ],
  languages: [
    { code: 'en-US', label: 'English (United States)' },
    { code: 'en-CA', label: 'English (Canada)' },
    { code: 'fr-CA', label: 'French (Canada)' }
  ],
  marketingChannels: [
    {
      id: 'email',
      label: 'Email',
      description: 'Standard marketing email updates with consent tracking.'
    },
    {
      id: 'sms',
      label: 'SMS',
      description: 'Text message notifications for transactional and marketing events.'
    },
    {
      id: 'none',
      label: 'None',
      description: 'No marketing outreach; transactional communications only.'
    }
  ]
};

export async function getRegistrationReferenceData(): Promise<RegistrationReferenceData> {
  return referenceData;
}

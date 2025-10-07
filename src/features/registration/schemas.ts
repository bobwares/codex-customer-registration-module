/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/schemas.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: otpChannelSchema, startRegistrationSchema, otpVerificationSchema, completeRegistrationSchema,
 *          StartRegistrationInput, OtpVerificationInput, CompleteRegistrationInput
 * Description: Defines validation schemas for each registration step shared by server actions and client forms.
 */
import { z } from 'zod';

export const otpChannelSchema = z.enum(['email', 'sms']);

export const startRegistrationSchema = z
  .object({
    email: z.string().email({ message: 'Enter a valid email address.' }),
    password: z
      .string()
      .min(12, { message: 'Password must be at least 12 characters.' })
      .regex(/[A-Z]/, { message: 'Include at least one uppercase letter.' })
      .regex(/[a-z]/, { message: 'Include at least one lowercase letter.' })
      .regex(/\d/, { message: 'Include at least one number.' })
      .regex(/[^A-Za-z0-9]/, { message: 'Include at least one special character.' }),
    locale: z.string().min(2, { message: 'Select a locale.' }),
    channel: otpChannelSchema,
    phone: z
      .string()
      .trim()
      .optional()
      .transform((value) => (value ? value.replace(/[^+\d]/g, '') : undefined))
  })
  .superRefine((data, ctx) => {
    if (data.channel === 'sms' && !data.phone) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Phone number is required to receive SMS codes.',
        path: ['phone']
      });
    }
  });

export const otpVerificationSchema = z.object({
  registrationId: z.string().uuid(),
  code: z
    .string()
    .trim()
    .length(6, { message: 'OTP must be 6 digits.' })
});

export const completeRegistrationSchema = z.object({
  registrationId: z.string().uuid(),
  firstName: z.string().min(1, { message: 'First name is required.' }).max(100),
  lastName: z.string().min(1, { message: 'Last name is required.' }).max(100),
  country: z.string().length(2, { message: 'Select a country.' }),
  language: z.string().min(2, { message: 'Select a preferred language.' }),
  marketingOptIn: z.boolean(),
  communicationChannel: z.enum(['email', 'sms', 'none'])
});

export type OtpChannel = z.infer<typeof otpChannelSchema>;
export type StartRegistrationInput = z.infer<typeof startRegistrationSchema>;
export type OtpVerificationInput = z.infer<typeof otpVerificationSchema>;
export type CompleteRegistrationInput = z.infer<typeof completeRegistrationSchema>;

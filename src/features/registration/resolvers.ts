/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/features/registration/resolvers.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:46:55Z
 * Exports: createZodResolver
 * Description: Provides a lightweight React Hook Form resolver backed by Zod without relying on external packages.
 */
import type { Resolver } from 'react-hook-form';
import { z } from 'zod';

export function createZodResolver<TSchema extends z.ZodTypeAny>(
  schema: TSchema
): Resolver<z.infer<TSchema>> {
  return async (values) => {
    const result = schema.safeParse(values);

    if (result.success) {
      return {
        values: result.data,
        errors: {}
      };
    }

    const flattened = result.error.flatten();
    const fieldErrors: Record<string, { type: string; message: string }> = {};

    for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
      if (messages && messages.length > 0) {
        fieldErrors[field] = {
          type: 'manual',
          message: messages.join(' ')
        };
      }
    }

    return {
      values: {} as z.infer<TSchema>,
      errors: fieldErrors as any
    };
  };
}

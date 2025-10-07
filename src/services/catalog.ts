/**
 * App: Customer Registration Module
 * Package: src/services
 * File: catalog.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: CatalogProduct, fetchFeaturedProducts, fetchProducts
 * Description: Service abstraction orchestrating catalog data retrieval for registration steps with cache-aware fetch helpers.
 */
import 'server-only';
import { cache } from 'react';
import { getEnv } from '@/lib/env';
import type { Product } from '@/components/ui/ProductList';

type CatalogResponse = {
  id: string;
  name: string;
  description: string;
  focus: string;
}[];

const FALLBACK_PRODUCTS: CatalogResponse = [
  {
    id: 'fr-1',
    name: 'Account Creation',
    description: 'Collect email and password, initialize registration ID, and emit registration.started event.',
    focus: 'FR-1 / Analytics'
  },
  {
    id: 'fr-2',
    name: 'OTP Verification',
    description: 'Send OTP via email or SMS, enforce expiry/attempt limits, and capture verification success metrics.',
    focus: 'FR-2 / Security'
  },
  {
    id: 'fr-3',
    name: 'PII Capture',
    description: 'Gather personal information, validate inline, and persist consent timestamp.',
    focus: 'FR-3 / Compliance'
  },
  {
    id: 'fr-6',
    name: 'Resend Policies',
    description: 'Implement resend throttle, countdown UI, and event instrumentation for retries.',
    focus: 'FR-6 / Reliability'
  }
];

const baseUrl = getEnv('API_BASE', 'http://localhost:3000');

async function requestProducts(endpoint: string): Promise<Product[]> {
  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 900, tags: ['products'] }
    });
    if (!response.ok) {
      throw new Error(`Catalog request failed with status ${response.status}`);
    }
    const data = (await response.json()) as CatalogResponse;
    return data;
  } catch (error) {
    console.warn('Falling back to static catalog due to error', error);
    return FALLBACK_PRODUCTS;
  }
}

export const fetchProducts = cache(() => requestProducts('/api/catalog/registration-steps'));

export const fetchFeaturedProducts = cache(async () => {
  const products = await requestProducts('/api/catalog/registration-featured');
  return products.slice(0, 3);
});

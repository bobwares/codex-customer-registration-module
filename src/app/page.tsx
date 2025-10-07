/**
 * App: Customer Registration Module
 * Package: src/app
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: HomePage
 * Description: Landing page introducing the registration flow and showcasing featured registration steps with product list preview.
 */
import Link from 'next/link';
import ProductList from '@/components/ui/ProductList';
import { fetchFeaturedProducts } from '@/services/catalog';

export default async function HomePage() {
  const products = await fetchFeaturedProducts();

  return (
    <div className="space-y-8">
      <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6">
        <h1 className="text-3xl font-semibold text-slate-900">Register a new customer account</h1>
        <p className="mt-4 text-slate-600">
          Start the onboarding journey with MFA verification, compliant consent capture, and analytics instrumentation ready from
          day one.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-white font-medium hover:bg-blue-600"
            href="/products"
          >
            Explore registration steps
          </Link>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-primary px-4 py-2 text-primary font-medium hover:bg-blue-50"
            href="#funnel"
          >
            View instrumentation plan
          </a>
        </div>
      </section>

      <section className="rounded-xl bg-white shadow-sm border border-slate-200 p-6" id="funnel">
        <h2 className="text-2xl font-semibold text-slate-900">Funnel overview</h2>
        <p className="mt-2 text-slate-600">
          Track customer progress from initial registration through OTP verification and consent. Data flows directly into
          analytics and audit pipelines.
        </p>
        <ProductList products={products} />
      </section>
    </div>
  );
}

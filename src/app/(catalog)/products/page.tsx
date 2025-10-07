/**
 * App: Customer Registration Module
 * Package: src/app/(catalog)/products
 * File: page.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: ProductsPage
 * Description: Catalog route showing detailed registration funnel steps fetched from the catalog service.
 */
import ProductList from '@/components/ui/ProductList';
import { fetchProducts } from '@/services/catalog';

export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <section className="space-y-4">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold text-slate-900">Registration steps catalog</h1>
        <p className="text-slate-600">
          Review each onboarding milestone, required data, and instrumentation hooks before implementing UI forms.
        </p>
      </header>
      <ProductList products={products} variant="detailed" />
    </section>
  );
}

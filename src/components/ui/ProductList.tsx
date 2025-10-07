/**
 * App: Customer Registration Module
 * Package: src/components/ui
 * File: ProductList.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: ProductList
 * Description: Presentational component rendering registration step cards with cart interactions for planning.
 */
'use client';

import { useMemo } from 'react';
import { useCart } from '@/store/useCart';

export type Product = {
  id: string;
  name: string;
  description: string;
  focus: string;
};

interface ProductListProps {
  products: Product[];
  variant?: 'summary' | 'detailed';
}

export default function ProductList({ products, variant = 'summary' }: ProductListProps) {
  const { items, addItem, removeItem } = useCart();
  const cartIds = useMemo(() => new Set(items.map((item) => item.id)), [items]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {products.map((product) => {
        const inCart = cartIds.has(product.id);
        return (
          <article key={product.id} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <header className="space-y-1">
              <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
              <p className="text-sm text-slate-500">{product.focus}</p>
            </header>
            <p className="mt-3 text-sm text-slate-600">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <button
                type="button"
                className="rounded-md border border-primary px-3 py-1 text-sm font-medium text-primary hover:bg-blue-50"
                onClick={() => (inCart ? removeItem(product.id) : addItem(product))}
              >
                {inCart ? 'Remove from plan' : 'Add to plan'}
              </button>
              {variant === 'detailed' && (
                <span className="text-xs text-slate-500">Cart count: {items.length}</span>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

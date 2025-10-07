/**
 * App: Customer Registration Module
 * Package: src/store
 * File: useCart.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: useCart
 * Description: Zustand store managing a lightweight planning cart for registration steps selection.
 */
'use client';

import { create } from 'zustand';
import type { Product } from '@/components/ui/ProductList';

type CartState = {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
};

export const useCart = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: state.items.some((existing) => existing.id === item.id)
        ? state.items
        : [...state.items, item]
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((existing) => existing.id !== id)
    }))
}));

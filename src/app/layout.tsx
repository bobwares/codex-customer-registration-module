/**
 * App: Customer Registration Module
 * Package: src/app
 * File: layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: metadata, RootLayout
 * Description: Defines the global HTML structure, metadata, and shared
 *              styling for the Next.js App Router.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Registration",
  description: "Register new customers online with a modern onboarding flow."
};

type RootLayoutProps = {
  readonly children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gradient-to-br from-brand-50 via-white to-brand-100 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="bg-white/70 backdrop-blur border-b border-slate-200">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
              <span className="text-lg font-semibold text-brand-700">
                Customer Registration Module
              </span>
              <span className="text-sm text-slate-500">Secure &amp; streamlined onboarding</span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="bg-white/70 backdrop-blur border-t border-slate-200">
            <div className="mx-auto max-w-5xl px-6 py-4 text-sm text-slate-500">
              &copy; {new Date().getFullYear()} Customer Registration Module. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

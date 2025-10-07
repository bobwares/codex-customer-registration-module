/**
 * App: Customer Registration Module
 * Package: src/app
 * File: layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: metadata, RootLayout
 * Description: Root layout defining the HTML skeleton, metadata, and shared theming for the registration module application.
 */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Customer Registration Portal',
  description: 'Launchpad for secure customer onboarding with OTP verification and consent capture.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen">
          <header className="bg-white/80 backdrop-blur border-b border-slate-200">
            <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
              <span className="text-xl font-semibold text-slate-900">Customer Registration</span>
              <span className="text-sm text-slate-500">MFA protected onboarding</span>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
        </div>
      </body>
    </html>
  );
}

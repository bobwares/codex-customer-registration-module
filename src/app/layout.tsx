/**
 * App: Customer Registration Module
 * Package: frontend.app
 * File: src/app/layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:07:56Z
 * Exports: metadata, RootLayout
 * Description: Root layout wiring global metadata, fonts, and structural wrappers for the application.
 */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Customer Registration Portal',
  description:
    'Streamlined onboarding that guides customers through secure account creation and verification.',
  icons: {
    icon: '/favicon.ico'
  }
};

interface RootLayoutProps {
  readonly children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="bg-slate-50">
      <body className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100">
        <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-10">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                Customer Platform
              </p>
              <h1 className="text-2xl font-bold text-slate-900">
                Customer Registration Module
              </h1>
            </div>
            <span className="rounded-full bg-primary/10 px-4 py-1 text-sm font-medium text-primary">
              Secure onboarding
            </span>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="mt-12 border-t border-slate-200 pt-6 text-sm text-slate-500">
            <p>&copy; {new Date().getUTCFullYear()} Customer Platform. All rights reserved.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}

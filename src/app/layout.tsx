/**
 * App: Customer Registration Module
 * Package: src/app
 * File: layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: metadata, RootLayout
 * Description: Provides the root HTML structure, metadata, and shared layout
 *              styling for the registration application.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Registration",
  description: "Create your account securely in minutes."
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-200 bg-white/80 backdrop-blur">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
              <span className="text-lg font-semibold text-primary">
                Customer Registration
              </span>
              <span className="text-sm text-neutral-500">Secure onboarding</span>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-200 bg-white/80 py-6">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
              <p>&copy; {new Date().getUTCFullYear()} Customer Platform. All rights reserved.</p>
              <nav className="flex gap-4">
                <a href="#accessibility">Accessibility</a>
                <a href="#privacy">Privacy</a>
              </nav>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

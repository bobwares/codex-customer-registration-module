/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: metadata, RootLayout
 * Description: Root layout applying global styles, metadata, and semantic document structure for the app router.
 */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Customer Registration',
  description: 'Create a secure customer account with verification and consent capture.'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

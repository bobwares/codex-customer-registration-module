/**
 * App: Customer Registration Module
 * Package: frontend.app.registration
 * File: src/app/(registration)/register/layout.tsx
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:11:20Z
 * Exports: metadata, RegisterLayout
 * Description: Layout applying consistent chrome and metadata for registration step routes.
 */
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register • Customer Registration Module',
  description:
    'Create a customer account with adaptive MFA, policy-compliant credentials, and granular consent capture.'
};

interface RegisterLayoutProps {
  readonly children: React.ReactNode;
}

export default function RegisterLayout({ children }: RegisterLayoutProps) {
  return <div className="space-y-8">{children}</div>;
}

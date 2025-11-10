/**
 * App: Customer Registration Module
 * Package: src/app
 * File: layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-11-10T20:52:42Z
 * Exports: metadata,RootLayout
 * Description: Defines the root HTML shell and metadata for the registration experience.
 */
import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Registration Health Plan",
  description:
    "Structured data and presentation for the sample gold health plan offered during registration.",
};

interface RootLayoutProps {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

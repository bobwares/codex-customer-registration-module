/**
 * App: Customer Registration Module
 * Package: src/app
 * File: layout.tsx
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: metadata, RootLayout
 * Description: Defines the root HTML structure and metadata for the Customer Registration Module UI.
 */
import type { ReactNode } from "react";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Customer Registration",
  description: "Create a secure customer account in minutes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

/**
 * App: Customer Registration Module
 * Package: customer-registration-module
 * File: src/app/api/health/route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: AI Coding Agent
 * Date: 2025-10-07T19:43:17Z
 * Exports: GET
 * Description: Provides a lightweight health probe indicating the Next.js application is running.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

/**
 * App: Customer Registration Module
 * Package: src/app/api/health
 * File: route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: gpt-5-codex
 * Date: 2025-10-07T00:00:00Z
 * Exports: GET
 * Description: Health check route confirming the UI runtime is operational for monitoring probes.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok' });
}

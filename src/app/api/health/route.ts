/**
 * App: Customer Registration Module
 * Package: frontend.api
 * File: src/app/api/health/route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:12:14Z
 * Exports: GET
 * Description: Health check route reporting service availability for automation probes.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ status: 'ok', timestamp: new Date().toISOString() }, { status: 200 });
}

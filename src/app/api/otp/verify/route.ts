/**
 * App: Customer Registration Module
 * Package: frontend.api
 * File: src/app/api/otp/verify/route.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:12:50Z
 * Exports: POST
 * Description: Mock OTP verification endpoint returning success for well-formed codes.
 */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { registrationId?: string; code?: string };

  if (!body.registrationId || !body.code) {
    return NextResponse.json({ error: 'Missing verification payload' }, { status: 400 });
  }

  if (!/^\d{6}$/.test(body.code)) {
    return NextResponse.json({ error: 'Invalid code format' }, { status: 422 });
  }

  return NextResponse.json({ status: 'verified' }, { status: 200, headers: { 'Cache-Control': 'no-store' } });
}

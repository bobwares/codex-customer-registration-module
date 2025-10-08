/**
 * App: Customer Registration Module
 * Package: frontend.api
 * File: src/app/api/otp/send/route.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:12:38Z
 * Exports: POST
 * Description: Mock OTP delivery endpoint enforcing simple rate-limit semantics for testing flows.
 */
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { registrationId?: string; channel?: string };

  if (!body.registrationId || !body.channel) {
    return NextResponse.json({ error: 'Missing registration context' }, { status: 400 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      'X-Mock-Otp-Channel': String(body.channel),
      'Cache-Control': 'no-store'
    }
  });
}

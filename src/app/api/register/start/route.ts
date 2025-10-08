/**
 * App: Customer Registration Module
 * Package: frontend.api
 * File: src/app/api/register/start/route.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:12:26Z
 * Exports: POST
 * Description: Mock registration start endpoint validating payload shape and returning a synthetic session identifier.
 */
import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string; locale?: string };

  if (!body.email || !body.password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const registrationId = randomUUID();

  return NextResponse.json(
    {
      registrationId,
      nextStep: 'otp_required' as const
    },
    {
      status: 202,
      headers: {
        'Cache-Control': 'no-store'
      }
    }
  );
}

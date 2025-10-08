/**
 * App: Customer Registration Module
 * Package: frontend.api
 * File: src/app/api/register/complete/route.ts
 * Version: 0.1.0
 * Turns: 2
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-08T00:13:02Z
 * Exports: POST
 * Description: Mock registration completion endpoint returning a synthetic customer identifier.
 */
import { randomUUID } from 'node:crypto';

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = (await request.json()) as { registrationId?: string };

  if (!body.registrationId) {
    return NextResponse.json({ error: 'Missing registrationId' }, { status: 400 });
  }

  return NextResponse.json(
    {
      customerId: randomUUID(),
      activated: true
    },
    { status: 201 }
  );
}

/**
 * App: Customer Registration Module
 * Package: src/app/api/health
 * File: route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T18:19:47Z
 * Exports: GET
 * Description: Provides a lightweight health endpoint for uptime monitoring and
 *              automation checks.
 */
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok" });
}

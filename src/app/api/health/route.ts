/**
 * App: Customer Registration Module
 * Package: src/app/api/health
 * File: route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-07T17:47:06Z
 * Exports: GET
 * Description: Provides a simple health check endpoint reporting operational status.
 */
import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({ status: "ok" }, { status: 200 });
}

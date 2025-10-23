/**
 * App: Customer Registration Module
 * Package: src/app/api/health
 * File: route.ts
 * Version: 0.1.0
 * Turns: 1
 * Author: Bobwares (bobwares@outlook.com)
 * Date: 2025-10-23T19:46:02Z
 * Exports: GET
 * Description: Health check endpoint used by infrastructure monitors to
 *              verify the UI service is operational.
 */
import { NextResponse } from "next/server";

export function GET(): NextResponse<{ status: string }> {
  return NextResponse.json({ status: "ok" });
}

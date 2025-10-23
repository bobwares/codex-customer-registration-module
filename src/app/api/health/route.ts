/**
 * App: Customer Registration Module
 * Package: src/app/api/health
 * File: route.ts
 * Version: 0.1.0
 * Turns: [1]
 * Author: gpt-5-codex
 * Date: 2025-10-23T20:17:48Z
 * Exports: GET
 * Description: Exposes a simple health endpoint that reports API readiness.
 */
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

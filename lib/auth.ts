import { NextResponse } from "next/server";

/**
 * Create a standardized error response
 */
export function createErrorResponse(message: string, status: number) {
  return NextResponse.json(
    {
      status: "error", 
      message
    },
    { status }
  );
} 
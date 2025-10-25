/**
 * Verify Email API Route
 * POST /api/auth/verify-email
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { uid } = body;

    if (!uid) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing user ID',
          message: 'User ID is required',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Verification email will be sent',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Verify email API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An error occurred during email verification',
      },
      { status: 500 }
    );
  }
}

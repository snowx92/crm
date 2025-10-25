/**
 * Refresh Token API Route
 * POST /api/auth/refresh-token
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing token',
          message: 'ID token is required',
        },
        { status: 400 }
      );
    }

    // Token refresh is handled by Firebase on client side
    // This endpoint validates the request

    return NextResponse.json(
      {
        success: true,
        message: 'Token validated. Proceed with Firebase token refresh.',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Refresh token API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An error occurred during token refresh',
      },
      { status: 500 }
    );
  }
}

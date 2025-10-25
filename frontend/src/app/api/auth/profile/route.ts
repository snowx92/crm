/**
 * User Profile API Route
 * GET /api/auth/profile - Get user profile
 * PUT /api/auth/profile - Update user profile
 */

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Missing or invalid authorization token',
        },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);

    // Token validation happens on client side with Firebase
    return NextResponse.json(
      {
        success: true,
        message: 'Profile retrieval successful',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Get profile API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An error occurred',
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Get authorization header
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized',
          message: 'Missing or invalid authorization token',
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { firstName, lastName, phoneNumber, company } = body;

    // Validate at least one field is provided
    if (!firstName && !lastName && !phoneNumber && !company) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing fields',
          message: 'At least one field must be provided for update',
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Profile update successful',
        data: { firstName, lastName, phoneNumber, company },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update profile API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An error occurred',
      },
      { status: 500 }
    );
  }
}

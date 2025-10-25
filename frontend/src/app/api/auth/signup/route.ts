/**
 * Signup API Route
 * POST /api/auth/signup
 */

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, phoneNumber, company } = body;

    // Validate required fields
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Email, password, firstName, and lastName are required',
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid email format',
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          error: 'Weak password',
          message: 'Password must be at least 6 characters long',
        },
        { status: 400 }
      );
    }

    // Return success (actual signup handled on client side with Firebase)
    return NextResponse.json(
      {
        success: true,
        message: 'Validation passed. Proceed with Firebase signup.',
        data: {
          email,
          firstName,
          lastName,
          phoneNumber,
          company,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Signup API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error.message || 'An error occurred during signup',
      },
      { status: 500 }
    );
  }
}

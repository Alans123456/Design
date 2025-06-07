// app/api/verify-token/route.js
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  try {
    const { token } = await request.json();
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Get the stored token from cookies
    const cookieStore = cookies();
    const storedToken = cookieStore.get('verification_token');

    if (!storedToken) {
      return NextResponse.json(
        { error: 'No verification token found. Please request a new verification email.' },
        { status: 400 }
      );
    }

    // Verify token matches
    if (token !== storedToken.value) {
      return NextResponse.json(
        { error: 'Invalid verification token. Please check your email for the correct link.' },
        { status: 400 }
      );
    }

    // Token is valid, clear it from cookies
    const response = NextResponse.json(
      { 
        message: 'Email verified successfully',
        verified: true 
      },
      { status: 200 }
    );
    
    // Clear the verification token cookie
    response.cookies.delete('verification_token');
    
    // Optionally set a verified cookie for future reference
    response.cookies.set('email_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'An error occurred during verification. Please try again.' },
      { status: 500 }
    );
  }
}
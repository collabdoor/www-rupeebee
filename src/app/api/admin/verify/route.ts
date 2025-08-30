import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, isTokenExpired } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { valid: false, message: 'Token is required' },
        { status: 400 }
      );
    }

    // Check if token is expired first (client-side safe check)
    if (isTokenExpired(token)) {
      return NextResponse.json(
        { valid: false, message: 'Token has expired' },
        { status: 401 }
      );
    }

    // Server-side verification
    const adminUser = verifyAdminToken(token);
    
    if (!adminUser) {
      return NextResponse.json(
        { valid: false, message: 'Invalid token' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      valid: true,
      user: {
        id: adminUser.id,
        expires_at: adminUser.expires_at
      }
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { valid: false, message: 'Token verification failed' },
      { status: 500 }
    );
  }
}

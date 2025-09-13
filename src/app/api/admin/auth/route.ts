import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials, generateAdminToken, getTokenExpirationTime } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const { adminId, psk } = await request.json();

    if (!adminId || !psk) {
      return NextResponse.json(
        { message: 'Admin ID and pre-shared key are required' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(adminId, psk);

    if (!isValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = generateAdminToken(adminId);
    const expiresAt = getTokenExpirationTime(token);

    return NextResponse.json({
      success: true,
      token,
      expires_at: expiresAt,
      message: 'Authentication successful'
    });

  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 500 }
    );
  }
}

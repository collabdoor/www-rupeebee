import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, isTokenExpired } from '@/lib/auth';
import { updateFeedbackStatus } from '@/lib/reviews-db';

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json(
        { message: 'Authorization token required' },
        { status: 401 }
      );
    }

    const adminUser = verifyAdminToken(token);
    if (!adminUser || isTokenExpired(token)) {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const { id, status, notes } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { message: 'Feedback ID and status are required' },
        { status: 400 }
      );
    }

    if (!['new', 'reviewed', 'in_progress', 'resolved', 'archived'].includes(status)) {
      return NextResponse.json(
        { message: 'Invalid status' },
        { status: 400 }
      );
    }

    const result = await updateFeedbackStatus(id, status, notes);

    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Update feedback error:', error);
    return NextResponse.json(
      { message: 'Failed to update feedback' },
      { status: 500 }
    );
  }
}

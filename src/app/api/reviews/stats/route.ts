import { NextResponse } from 'next/server';
import { getReviewsStats } from '@/lib/reviews-db';

export async function GET() {
  try {
    const stats = await getReviewsStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Get reviews stats error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews stats' },
      { status: 500 }
    );
  }
}

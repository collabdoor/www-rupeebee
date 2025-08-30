import { NextRequest, NextResponse } from 'next/server';
import { getReviews, getReviewsStats } from '@/lib/reviews-db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const rating_filter = searchParams.get('rating') ? parseInt(searchParams.get('rating')!) : undefined;
    const sort = (searchParams.get('sort') || 'newest') as 'newest' | 'oldest' | 'rating_high' | 'rating_low';

    if (searchParams.get('stats') === 'true') {
      const stats = await getReviewsStats();
      return NextResponse.json(stats);
    }

    const result = await getReviews(page, limit, rating_filter, sort);
    return NextResponse.json(result);

  } catch (error) {
    console.error('Get reviews error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

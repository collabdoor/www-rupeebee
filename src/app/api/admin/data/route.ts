import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminToken, isTokenExpired } from '@/lib/auth';
import { getAdminData } from '@/lib/reviews-db';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = 50;
    const typeParam = searchParams.get('type');
    const typeFilter = typeParam === 'all' || !typeParam ? undefined : typeParam as 'review' | 'feedback';
    const statusParam = searchParams.get('status');
    const statusFilter = statusParam === 'all' || !statusParam ? undefined : statusParam;
    const search = searchParams.get('search') || undefined;

    const result = await getAdminData(
      page,
      limit,
      typeFilter,
      statusFilter,
      search
    );

    return NextResponse.json(result);

  } catch (error) {
    console.error('Admin data error:', error);
    return NextResponse.json(
      { message: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { submitReview } from '@/lib/reviews-db';
import { supabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    // Verify the user is authenticated for review submission
    if (!token) {
      return NextResponse.json(
        { message: 'Authentication required to submit reviews' },
        { status: 401 }
      );
    }

    // Verify the session token with Supabase
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { message: 'Invalid authentication token' },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!submission.rating || !submission.review_text) {
      return NextResponse.json(
        { message: 'Rating and review text are required' },
        { status: 400 }
      );
    }

    // Validate rating range
    if (submission.rating < 1 || submission.rating > 5) {
      return NextResponse.json(
        { message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Validate review text length
    if (submission.review_text.length < 10 || submission.review_text.length > 500) {
      return NextResponse.json(
        { message: 'Review text must be between 10 and 500 characters' },
        { status: 400 }
      );
    }

    // Simple profanity filter (basic implementation)
    const profanityWords = ['spam', 'fake', 'scam']; // Add more as needed
    const containsProfanity = profanityWords.some(word => 
      submission.review_text.toLowerCase().includes(word)
    );

    if (containsProfanity) {
      return NextResponse.json(
        { message: 'Review contains inappropriate content' },
        { status: 400 }
      );
    }

    // Update submission with authenticated user info
    const authenticatedSubmission = {
      ...submission,
      email_phone: user.email || '',
      is_app_user: true
    };

    const result = await submitReview(authenticatedSubmission, token);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Submit review error:', error);
    return NextResponse.json(
      { message: 'Failed to submit review' },
      { status: 500 }
    );
  }
}

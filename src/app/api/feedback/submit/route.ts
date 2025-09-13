import { NextRequest, NextResponse } from 'next/server';
import { submitFeedback } from '@/lib/reviews-db';

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured');
    return true; // Allow submission if reCAPTCHA is not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const submission = await request.json();

    // Validate required fields
    if (!submission.category || !submission.message || !submission.recaptcha_token) {
      return NextResponse.json(
        { message: 'Category, message, and reCAPTCHA verification are required' },
        { status: 400 }
      );
    }

    // Validate category
    const validCategories = ['Bug Report', 'Feature Suggestion', 'General Feedback', 'Complaint', 'Praise'];
    if (!validCategories.includes(submission.category)) {
      return NextResponse.json(
        { message: 'Invalid category' },
        { status: 400 }
      );
    }

    // Validate message length
    if (submission.message.length < 10 || submission.message.length > 1000) {
      return NextResponse.json(
        { message: 'Message must be between 10 and 1000 characters' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA
    const isValidRecaptcha = await verifyRecaptcha(submission.recaptcha_token);
    if (!isValidRecaptcha) {
      return NextResponse.json(
        { message: 'reCAPTCHA verification failed' },
        { status: 400 }
      );
    }

    // Simple spam detection
    const spamKeywords = ['click here', 'free money', 'guaranteed', 'no risk'];
    const containsSpam = spamKeywords.some(keyword => 
      submission.message.toLowerCase().includes(keyword)
    );

    if (containsSpam) {
      return NextResponse.json(
        { message: 'Message contains spam content' },
        { status: 400 }
      );
    }

    const result = await submitFeedback(submission);

    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }

  } catch (error) {
    console.error('Submit feedback error:', error);
    return NextResponse.json(
      { message: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}

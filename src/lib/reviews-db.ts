import { supabase, supabaseAdmin } from './supabase';
import { Review, ReviewSubmission, FeedbackSubmission, ReviewsStats, AdminFeedbackReview } from '@/types/reviews';
import CryptoJS from 'crypto-js';

const HASH_SECRET = process.env.JWT_SECRET || 'fallback_secret';

function hashIdentifier(identifier: string): string {
  return CryptoJS.SHA256(identifier + HASH_SECRET).toString();
}

// Review operations
export async function getReviews(
  page: number = 1,
  limit: number = 10,
  rating_filter?: number,
  sort: 'newest' | 'oldest' | 'rating_high' | 'rating_low' = 'newest'
): Promise<{ reviews: Review[]; total: number }> {
  let query = supabase
    .from('reviews')
    .select('*', { count: 'exact' })
    .eq('status', 'approved');

  if (rating_filter) {
    query = query.eq('rating', rating_filter);
  }

  // Apply sorting
  switch (sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true });
      break;
    case 'rating_high':
      query = query.order('rating', { ascending: false });
      break;
    case 'rating_low':
      query = query.order('rating', { ascending: true });
      break;
    default:
      query = query.order('created_at', { ascending: false });
  }

  const { data, error, count } = await query
    .range((page - 1) * limit, page * limit - 1);

  if (error) {
    throw new Error(`Error fetching reviews: ${error.message}`);
  }

  return {
    reviews: data || [],
    total: count || 0
  };
}

export async function getReviewsStats(): Promise<ReviewsStats> {
  const { data: reviews, error } = await supabase
    .from('reviews')
    .select('rating')
    .eq('status', 'approved');

  if (error) {
    throw new Error(`Error fetching reviews stats: ${error.message}`);
  }

  if (!reviews || reviews.length === 0) {
    return {
      total_reviews: 0,
      average_rating: 0,
      rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const total_reviews = reviews.length;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  const average_rating = Math.round((sum / total_reviews) * 10) / 10;

  const rating_distribution = reviews.reduce((acc, review) => {
    acc[review.rating as keyof typeof acc] = (acc[review.rating as keyof typeof acc] || 0) + 1;
    return acc;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  return {
    total_reviews,
    average_rating,
    rating_distribution
  };
}

interface UserData {
  id?: string;
  email?: string;
  user_metadata?: {
    display_name?: string;
    avatar_url?: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export async function submitReview(submission: ReviewSubmission & { user?: UserData }): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    // Always use admin client for review submissions since we verify authentication in the API route
    // This bypasses RLS policies while maintaining security through API-level authentication
    const client = supabaseAdmin;

    // Check rate limiting
    if (submission.email_phone) {
      const hashedIdentifier = hashIdentifier(submission.email_phone);
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
      
      const { data: existingReviews } = await client
        .from('reviews')
        .select('id')
        .eq('user_identifier', hashedIdentifier)
        .gte('created_at', twentyFourHoursAgo);

      if (existingReviews && existingReviews.length > 0) {
        return { success: false, message: 'You can only submit one review per 24 hours.' };
      }
    }

    // Extract user display name and avatar from user object
    let displayName = 'RupeeBee User';
    let userAvatar = null;
    let rupeebeeUserId = null;

    if (submission.user) {
      // Check if user has RupeeBee user ID in metadata, fallback to Supabase user ID
      // Priority: custom rupeebee_user_id > metadata.sub > user.id
      rupeebeeUserId = submission.user.user_metadata?.rupeebee_user_id || 
                       submission.user.user_metadata?.sub || 
                       submission.user.id || 
                       null;
      
      // Get user avatar from Supabase auth (OAuth providers) or profile pictures storage
      userAvatar = submission.user.user_metadata?.avatar_url || 
                   submission.user.user_metadata?.picture || 
                   submission.user.user_metadata?.profile_picture_url ||
                   submission.user.user_metadata?.profile_picture ||
                   null;

      // Try to get name from user metadata first, then fall back to email
      const fullName = typeof submission.user.user_metadata?.full_name === 'string' ? submission.user.user_metadata.full_name :
                       typeof submission.user.user_metadata?.name === 'string' ? submission.user.user_metadata.name :
                       typeof submission.user.user_metadata?.display_name === 'string' ? submission.user.user_metadata.display_name :
                       typeof submission.user.user_metadata?.username === 'string' ? submission.user.user_metadata.username :
                       undefined;
      
      if (fullName) {
        displayName = fullName;
      } else if (submission.user.email) {
        // Extract first part of email as name
        displayName = submission.user.email.split('@')[0];
      }
      
      // If user is verified app user and has RupeeBee ID, enhance the display
      if (submission.is_app_user && rupeebeeUserId) {
        displayName = fullName || 
                     (typeof submission.user.user_metadata?.username === 'string' ? submission.user.user_metadata.username : null) ||
                     submission.user.email?.split('@')[0] || 'Verified RupeeBee User';
      } else if (submission.is_app_user) {
        displayName = fullName || 
                     (typeof submission.user.user_metadata?.username === 'string' ? submission.user.user_metadata.username : null) ||
                     submission.user.email?.split('@')[0] || 'Verified User';
      }
    }

    // Insert review
    const reviewData = {
      user_identifier: submission.email_phone ? hashIdentifier(submission.email_phone) : null,
      user_display_name: displayName,
      user_avatar: userAvatar,
      rupeebee_user_id: rupeebeeUserId,
      rating: submission.rating,
      review_text: submission.review_text,
      is_verified: submission.is_app_user,
      status: 'pending' as const
    };

    const { data, error } = await client
      .from('reviews')
      .insert([reviewData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { 
      success: true, 
      message: 'Thank you for your review! It will be published after moderation.',
      id: data.id 
    };
  } catch (error) {
    console.error('Error submitting review:', error);
    return { success: false, message: 'Failed to submit review. Please try again.' };
  }
}

export async function submitFeedback(submission: FeedbackSubmission): Promise<{ success: boolean; message: string; id?: string }> {
  try {
    const feedbackData = {
      category: submission.category,
      message: submission.message,
      contact_info: submission.contact_info || null,
      status: 'new' as const
    };

    // Use admin client to bypass RLS policies for public feedback submission
    const { data, error } = await supabaseAdmin
      .from('feedback')
      .insert([feedbackData])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { 
      success: true, 
      message: 'Thank you for your feedback! We will review it soon.',
      id: data.id 
    };
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return { success: false, message: 'Failed to submit feedback. Please try again.' };
  }
}

// Admin operations
export async function getAdminData(
  page: number = 1,
  limit: number = 50,
  type_filter?: 'review' | 'feedback',
  status_filter?: string,
  search?: string
): Promise<{ data: AdminFeedbackReview[]; total: number }> {
  try {
    const results: AdminFeedbackReview[] = [];
    let totalCount = 0;

    // If filtering by type, only fetch that type
    if (type_filter === 'review') {
      let reviewQuery = supabaseAdmin
        .from('reviews')
        .select('*', { count: 'exact' });

      if (status_filter && status_filter !== 'all') {
        reviewQuery = reviewQuery.eq('status', status_filter);
      }

      if (search) {
        reviewQuery = reviewQuery.or(`review_text.ilike.%${search}%,user_display_name.ilike.%${search}%`);
      }

      const { data: reviews, error: reviewError, count: reviewCount } = await reviewQuery
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (reviewError) {
        console.error('Error fetching reviews:', reviewError);
      } else {
        reviews?.forEach(review => {
          results.push({
            id: review.id,
            type: 'review',
            content: review.review_text,
            user_identifier: review.user_display_name,
            rating: review.rating,
            category: undefined,
            status: review.status,
            created_at: review.created_at,
            updated_at: review.updated_at
          });
        });
        totalCount = reviewCount || 0;
      }
    } else if (type_filter === 'feedback') {
      let feedbackQuery = supabaseAdmin
        .from('feedback')
        .select('*', { count: 'exact' });

      if (status_filter && status_filter !== 'all') {
        feedbackQuery = feedbackQuery.eq('status', status_filter);
      }

      if (search) {
        feedbackQuery = feedbackQuery.or(`message.ilike.%${search}%,contact_info.ilike.%${search}%,category.ilike.%${search}%`);
      }

      const { data: feedback, error: feedbackError, count: feedbackCount } = await feedbackQuery
        .order('created_at', { ascending: false })
        .range((page - 1) * limit, page * limit - 1);

      if (feedbackError) {
        console.error('Error fetching feedback:', feedbackError);
      } else {
        feedback?.forEach(item => {
          results.push({
            id: item.id,
            type: 'feedback',
            content: item.message,
            user_identifier: item.contact_info,
            rating: undefined,
            category: item.category,
            status: item.status,
            admin_notes: item.admin_notes,
            created_at: item.created_at,
            updated_at: item.updated_at
          });
        });
        totalCount = feedbackCount || 0;
      }
    } else {
      // Fetch both reviews and feedback
      const [reviewsResult, feedbackResult] = await Promise.all([
        supabaseAdmin
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit),
        supabaseAdmin
          .from('feedback')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(limit)
      ]);

      // Process reviews
      if (reviewsResult.data) {
        reviewsResult.data.forEach(review => {
          const shouldInclude = (!status_filter || status_filter === 'all' || review.status === status_filter) &&
            (!search || 
             review.review_text?.toLowerCase().includes(search.toLowerCase()) ||
             review.user_display_name?.toLowerCase().includes(search.toLowerCase()));

          if (shouldInclude) {
            results.push({
              id: review.id,
              type: 'review',
              content: review.review_text,
              user_identifier: review.user_display_name,
              rating: review.rating,
              category: undefined,
              status: review.status,
              created_at: review.created_at,
              updated_at: review.updated_at
            });
          }
        });
      }

      // Process feedback
      if (feedbackResult.data) {
        feedbackResult.data.forEach(item => {
          const shouldInclude = (!status_filter || status_filter === 'all' || item.status === status_filter) &&
            (!search || 
             item.message?.toLowerCase().includes(search.toLowerCase()) ||
             item.contact_info?.toLowerCase().includes(search.toLowerCase()) ||
             item.category?.toLowerCase().includes(search.toLowerCase()));

          if (shouldInclude) {
            results.push({
              id: item.id,
              type: 'feedback',
              content: item.message,
              user_identifier: item.contact_info,
              rating: undefined,
              category: item.category,
              status: item.status,
              admin_notes: item.admin_notes,
              created_at: item.created_at,
              updated_at: item.updated_at
            });
          }
        });
      }

      // Sort combined results by created_at
      results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      // Implement pagination for combined results
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedResults = results.slice(startIndex, endIndex);
      
      return {
        data: paginatedResults,
        total: results.length
      };
    }

    return {
      data: results,
      total: totalCount
    };
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return { data: [], total: 0 };
  }
}

export async function updateReviewStatus(id: string, status: 'approved' | 'rejected'): Promise<{ success: boolean; message: string }> {
  try {
    const { error } = await supabaseAdmin
      .from('reviews')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { success: true, message: `Review ${status} successfully.` };
  } catch (error) {
    console.error('Error updating review status:', error);
    return { success: false, message: 'Failed to update review status.' };
  }
}

export async function updateFeedbackStatus(id: string, status: string, admin_notes?: string): Promise<{ success: boolean; message: string }> {
  try {
    const updateData: { status: string; updated_at: string; admin_notes?: string } = { 
      status, 
      updated_at: new Date().toISOString() 
    };
    
    if (admin_notes !== undefined) {
      updateData.admin_notes = admin_notes;
    }

    const { error } = await supabaseAdmin
      .from('feedback')
      .update(updateData)
      .eq('id', id);

    if (error) {
      throw error;
    }

    return { success: true, message: 'Feedback updated successfully.' };
  } catch (error) {
    console.error('Error updating feedback status:', error);
    return { success: false, message: 'Failed to update feedback status.' };
  }
}

export async function getAdminStats(): Promise<{
  total_reviews: number;
  pending_reviews: number;
  avg_rating: number;
  total_feedback: number;
  new_feedback: number;
}> {
  try {
    const [reviewsResult, feedbackResult] = await Promise.all([
      supabaseAdmin.from('reviews').select('rating, status'),
      supabaseAdmin.from('feedback').select('status')
    ]);

    const reviews = reviewsResult.data || [];
    const feedback = feedbackResult.data || [];

    const approvedReviews = reviews.filter(r => r.status === 'approved');
    const avgRating = approvedReviews.length > 0 
      ? Math.round((approvedReviews.reduce((sum, r) => sum + r.rating, 0) / approvedReviews.length) * 10) / 10
      : 0;

    return {
      total_reviews: reviews.length,
      pending_reviews: reviews.filter(r => r.status === 'pending').length,
      avg_rating: avgRating,
      total_feedback: feedback.length,
      new_feedback: feedback.filter(f => f.status === 'new').length
    };
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return {
      total_reviews: 0,
      pending_reviews: 0,
      avg_rating: 0,
      total_feedback: 0,
      new_feedback: 0
    };
  }
}

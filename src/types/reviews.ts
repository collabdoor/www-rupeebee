export interface Review {
  id: string;
  user_identifier?: string;
  user_display_name: string;
  user_avatar?: string;
  rupeebee_user_id?: string;
  rating: number;
  review_text: string;
  is_verified: boolean;
  status: 'pending' | 'approved' | 'rejected';
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  category: 'Bug Report' | 'Feature Suggestion' | 'General Feedback' | 'Complaint' | 'Praise';
  message: string;
  contact_info?: string;
  status: 'new' | 'reviewed' | 'in_progress' | 'resolved' | 'archived';
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewSubmission {
  rating: number;
  review_text: string;
  email_phone?: string;
  is_app_user: boolean;
  recaptcha_token: string;
}

export interface FeedbackSubmission {
  category: string;
  message: string;
  contact_info?: string;
  recaptcha_token: string;
}

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface ReviewsStats {
  total_reviews: number;
  average_rating: number;
  rating_distribution: RatingDistribution;
}

export interface AdminUser {
  id: string;
  token: string;
  expires_at: number;
}

export interface AdminFeedbackReview {
  type: 'review' | 'feedback';
  id: string;
  user_identifier?: string;
  content: string;
  rating?: number;
  category?: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

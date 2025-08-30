'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Star, User, CheckCircle, LogIn, LogOut, Clock, Filter, AlertCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { Review, ReviewSubmission, ReviewsStats } from '@/types/reviews';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function StarRating({ rating, onChange, readonly = false, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
          } ${!readonly ? 'cursor-pointer hover:text-yellow-400' : ''}`}
          onClick={() => !readonly && onChange?.(star)}
        />
      ))}
    </div>
  );
}

interface RatingDistributionProps {
  stats: ReviewsStats;
}

function RatingDistribution({ stats }: RatingDistributionProps) {
  const { total_reviews, rating_distribution } = stats;

  return (
    <div className="space-y-3">
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = rating_distribution[rating as keyof typeof rating_distribution] || 0;
        const percentage = total_reviews > 0 ? (count / total_reviews) * 100 : 0;
        
        return (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 min-w-[60px]">
              <span className="text-sm text-rupeebee-medium-text">{rating}</span>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            </div>
            
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            
            <span className="text-sm text-rupeebee-medium-text min-w-[40px] text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function AuthPrompt() {
  const { signInWithGoogle, signInWithEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'choose' | 'google' | 'email'>('choose');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      setAuthError(null);
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
      setAuthError(error instanceof Error ? error.message : 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setAuthError('Please enter both email and password');
      return;
    }

    try {
      setIsLoading(true);
      setAuthError(null);
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Email sign in error:', error);
      setAuthError(error instanceof Error ? error.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-12"
    >
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md mx-auto">
        <LogIn className="w-16 h-16 text-rupeebee-medium-green mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-rupeebee-dark-text mb-4">
          Sign in to Write a Review
        </h3>
        <p className="text-rupeebee-medium-text mb-6">
          Only verified RupeeBee users can write reviews. Choose your sign-in method.
        </p>

        {loginMethod === 'choose' && (
          <div className="space-y-4">
            <Button
              onClick={() => setLoginMethod('google')}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              <div className="flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Continue with Google
              </div>
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">or</span>
              </div>
            </div>

            <Button
              onClick={() => setLoginMethod('email')}
              variant="outline"
              className="w-full border-rupeebee-medium-green text-rupeebee-medium-green hover:bg-rupeebee-light-beige"
            >
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Sign in with Email (Mobile App Users)
              </div>
            </Button>
          </div>
        )}

        {loginMethod === 'google' && (
          <div className="space-y-4">
            <Button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign in with Google
                </div>
              )}
            </Button>
            <Button
              onClick={() => setLoginMethod('choose')}
              variant="ghost"
              className="w-full text-gray-600"
            >
              ← Back to options
            </Button>
          </div>
        )}

        {loginMethod === 'email' && (
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="text-left">
              <Label htmlFor="email" className="text-rupeebee-dark-text">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="mt-1 focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                required
              />
            </div>
            
            <div className="text-left">
              <Label htmlFor="password" className="text-rupeebee-dark-text">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-1 focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>

            <Button
              type="button"
              onClick={() => setLoginMethod('choose')}
              variant="ghost"
              className="w-full text-gray-600"
            >
              ← Back to options
            </Button>
          </form>
        )}

        {authError && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
          >
            {authError}
          </motion.div>
        )}

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Don&apos;t have an account?{' '}
            <a 
              href="/download" 
              className="text-rupeebee-medium-green hover:text-rupeebee-dark-green font-medium"
            >
              Download the RupeeBee app
            </a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function WriteReviewForm() {
  const { user, signOut } = useAuth();
  const [reviewData, setReviewData] = useState<ReviewSubmission>({
    rating: 0,
    review_text: '',
    email_phone: user?.email || '',
    is_app_user: true,
    recaptcha_token: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleRatingChange = (rating: number) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (reviewData.rating === 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please select a rating.'
      });
      return;
    }

    if (reviewData.review_text.length < 10) {
      setSubmitStatus({
        type: 'error',
        message: 'Please write a review with at least 10 characters.'
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Get the session token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        setSubmitStatus({
          type: 'error',
          message: 'Please sign in again to submit your review.'
        });
        return;
      }

      const response = await fetch('/api/reviews/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          ...reviewData,
          email_phone: user?.email || ''
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        setReviewData({
          rating: 0,
          review_text: '',
          email_phone: user?.email || '',
          is_app_user: true,
          recaptcha_token: ''
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit review. Please try again.'
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-rupeebee-dark-text">
          Write Your Review
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-rupeebee-medium-text">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Verified User: {user?.email}</span>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="border-gray-300 text-rupeebee-medium-text hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label className="text-lg font-medium text-rupeebee-dark-text mb-3 block">
            Rating *
          </Label>
          <div className="flex items-center gap-3">
            <StarRating
              rating={reviewData.rating}
              onChange={handleRatingChange}
              size="lg"
            />
            <span className="text-rupeebee-medium-text">
              {reviewData.rating > 0 ? `${reviewData.rating} star${reviewData.rating !== 1 ? 's' : ''}` : 'Click to rate'}
            </span>
          </div>
        </div>

        {/* Review Text */}
        <div>
          <Label htmlFor="review-text" className="text-lg font-medium text-rupeebee-dark-text mb-3 block">
            Your Review *
          </Label>
          <textarea
            id="review-text"
            value={reviewData.review_text}
            onChange={(e) => setReviewData(prev => ({ ...prev, review_text: e.target.value }))}
            placeholder="Share your experience with RupeeBee..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rupeebee-medium-green focus:border-transparent text-rupeebee-dark-text resize-none"
            rows={4}
            maxLength={500}
            required
          />
          <p className="text-sm text-rupeebee-medium-text mt-2">
            {reviewData.review_text.length}/500 characters
          </p>
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border ${
              submitStatus.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : 'bg-red-50 border-red-200 text-red-800'
            }`}
          >
            <div className="flex items-center gap-3">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              <span>{submitStatus.message}</span>
            </div>
          </motion.div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || reviewData.rating === 0 || reviewData.review_text.length < 10}
          className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Submitting Review...
            </div>
          ) : (
            'Submit Review'
          )}
        </Button>
      </form>
    </motion.div>
  );
}

export default function ReviewsPage() {
  const { user, loading } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewsStats>({
    total_reviews: 0,
    average_rating: 0,
    rating_distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  });
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating_high' | 'rating_low'>('newest');

  const loadReviews = useCallback(async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
        sort: sortBy
      });
      
      if (ratingFilter) {
        params.append('rating_filter', ratingFilter.toString());
      }

      const response = await fetch(`/api/reviews?${params}`);
      const data = await response.json();

      if (reset) {
        setReviews(data.reviews);
        setPage(2);
      } else {
        setReviews(prev => [...prev, ...data.reviews]);
        setPage(prev => prev + 1);
      }
      
      setHasMore(data.reviews.length === 10);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoadingReviews(false);
    }
  }, [page, ratingFilter, sortBy]);

  const loadStats = useCallback(async () => {
    try {
      const response = await fetch('/api/reviews/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  useEffect(() => {
    loadStats();
    loadReviews(true);
  }, [loadStats, loadReviews, ratingFilter, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rupeebee-medium-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-rupeebee-dark-text mb-4">
            RupeeBee Reviews
          </h1>
          <p className="text-xl text-rupeebee-medium-text max-w-2xl mx-auto">
            Real reviews from verified RupeeBee users. Share your experience and help others make informed decisions.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Reviews Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-8">
                <h3 className="text-xl font-bold text-rupeebee-dark-text mb-6">
                  Overall Rating
                </h3>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-rupeebee-dark-text mb-2">
                    {stats.average_rating.toFixed(1)}
                  </div>
                  <StarRating rating={Math.round(stats.average_rating)} readonly size="lg" />
                  <p className="text-rupeebee-medium-text mt-2">
                    Based on {stats.total_reviews} review{stats.total_reviews !== 1 ? 's' : ''}
                  </p>
                </div>

                <RatingDistribution stats={stats} />
              </div>
            </motion.div>

            {/* Reviews List and Write Review */}
            <div className="lg:col-span-2 space-y-8">
              {/* Write Review Section */}
              {user ? <WriteReviewForm /> : <AuthPrompt />}

              {/* Filters and Sorting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-white rounded-xl border border-gray-100 p-4"
              >
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-rupeebee-medium-text" />
                    <span className="text-sm font-medium text-rupeebee-dark-text">Filters:</span>
                  </div>
                  
                  <select
                    value={ratingFilter || ''}
                    onChange={(e) => setRatingFilter(e.target.value ? parseInt(e.target.value) : null)}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-rupeebee-medium-green"
                    aria-label="Filter by rating"
                  >
                    <option value="">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating_high' | 'rating_low')}
                    className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-rupeebee-medium-green"
                    aria-label="Sort reviews"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="rating_high">Highest Rating</option>
                    <option value="rating_low">Lowest Rating</option>
                  </select>
                </div>
              </motion.div>

              {/* Reviews List */}
              <div className="space-y-6">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rupeebee-medium-green rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-rupeebee-dark-text">
                              {review.user_display_name}
                            </span>
                            {review.is_verified && (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            )}
                          </div>
                          <StarRating rating={review.rating} readonly size="sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-rupeebee-medium-text">
                        <Clock className="w-4 h-4" />
                        <span>
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-rupeebee-dark-text leading-relaxed mb-4">
                      {review.review_text}
                    </p>
                    
                    {review.helpful_count > 0 && (
                      <div className="flex items-center gap-2 text-sm text-rupeebee-medium-text">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful_count} found this helpful</span>
                      </div>
                    )}
                  </motion.div>
                ))}

                {loadingReviews && reviews.length === 0 && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rupeebee-medium-green mx-auto"></div>
                  </div>
                )}

                {!loadingReviews && reviews.length === 0 && (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-rupeebee-dark-text mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-rupeebee-medium-text">
                      Be the first to share your experience with RupeeBee!
                    </p>
                  </div>
                )}

                {hasMore && reviews.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={() => loadReviews()}
                      variant="outline"
                      className="border-rupeebee-medium-green text-rupeebee-medium-green hover:bg-rupeebee-medium-green hover:text-white"
                    >
                      Load More Reviews
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

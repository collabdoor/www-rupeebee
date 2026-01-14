'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Star, User, CheckCircle, Clock, Filter, ThumbsUp, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Review, ReviewsStats } from '@/types/reviews';
import Link from 'next/link';
import Image from 'next/image';

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
    lg: 'w-7 h-7'
  };

  return (
    <div className="flex items-center justify-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${sizeClasses[size]} ${
            star <= rating
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          } ${!readonly ? 'cursor-pointer hover:fill-yellow-300 hover:text-yellow-300 transition-colors' : ''} flex-shrink-0`}
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

  const getWidthClass = (percentage: number) => {
    if (percentage === 0) return 'w-0';
    if (percentage <= 10) return 'w-[10%]';
    if (percentage <= 20) return 'w-[20%]';
    if (percentage <= 30) return 'w-[30%]';
    if (percentage <= 40) return 'w-[40%]';
    if (percentage <= 50) return 'w-[50%]';
    if (percentage <= 60) return 'w-[60%]';
    if (percentage <= 70) return 'w-[70%]';
    if (percentage <= 80) return 'w-[80%]';
    if (percentage <= 90) return 'w-[90%]';
    return 'w-full';
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-800 mb-3">Rating Breakdown</h4>
      {[5, 4, 3, 2, 1].map((rating) => {
        const count = rating_distribution[rating as keyof typeof rating_distribution] || 0;
        const percentage = total_reviews > 0 ? (count / total_reviews) * 100 : 0;
        
        return (
          <div key={rating} className="flex items-center gap-3">
            <div className="flex items-center gap-1 min-w-[50px]">
              <span className="text-sm font-medium text-gray-800 w-2 text-center">{rating}</span>
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
            </div>
            
            <div className="flex-1 bg-gray-200 rounded-full h-2.5 relative overflow-hidden">
              <div 
                className={`bg-gradient-to-r from-yellow-400 to-yellow-500 h-2.5 rounded-full transition-all duration-300 ease-out ${getWidthClass(percentage)}`}
              />
            </div>
            
            <span className="text-xs text-gray-600 min-w-[35px] text-right">
              {count > 0 ? `${count}` : '0'}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function ReviewsPage() {
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

  // Stable function for loading stats
  const loadStats = useCallback(async () => {
    try {
      const response = await fetch('/api/reviews/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  // Stable function for loading reviews - uses current page via ref to avoid dependency
  const pageRef = useRef(page);
  pageRef.current = page;

  const loadReviews = useCallback(async (reset = false) => {
    try {
      const currentPage = reset ? 1 : pageRef.current;
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
  }, [ratingFilter, sortBy]); // Removed page dependency

  const loadMoreReviews = useCallback(() => {
    loadReviews(false);
  }, [loadReviews]);

  // Initial load and filter changes
  useEffect(() => {
    setPage(1);
    setLoadingReviews(true);
    loadReviews(true);
    loadStats();
  }, [ratingFilter, sortBy, loadReviews, loadStats]);

  if (loadingReviews) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 -mt-14 pt-14">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 mt-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            RupeeBee Reviews
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real reviews from verified RupeeBee users. Share your experience and help others make informed decisions.
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Reviews Stats - Fixed width sidebar */}
            <div className="xl:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8 h-fit">
                <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                  Overall Rating
                </h3>
                
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-gray-800 mb-3">
                    {stats.average_rating.toFixed(1)}
                  </div>
                  <div className="flex justify-center mb-3">
                    <StarRating rating={Math.round(stats.average_rating)} readonly size="lg" />
                  </div>
                  <p className="text-gray-600 text-sm">
                    Based on {stats.total_reviews} review{stats.total_reviews !== 1 ? 's' : ''}
                  </p>
                </div>

                <RatingDistribution stats={stats} />
                
                {/* Share Your Story Card */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-800 text-sm mb-1">Share Your Story</h4>
                      <p className="text-xs text-gray-600">Help others discover RupeeBee</p>
                    </div>
                    
                    <Link href="/reviews/write">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 font-medium transition-colors duration-200 text-sm">
                        <PenTool className="w-4 h-4 mr-2" />
                        Write Your Review
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews List - Wider content area */}
            <div className="xl:col-span-3 space-y-6">

              {/* Filters and Sorting */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">Filters:</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <select
                      value={ratingFilter || ''}
                      onChange={(e) => setRatingFilter(e.target.value ? parseInt(e.target.value) : null)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
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
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500"
                      aria-label="Sort reviews"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="rating_high">Highest Rating</option>
                      <option value="rating_low">Lowest Rating</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-xl border border-gray-200 p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {review.user_avatar ? (
                            <Image 
                              src={review.user_avatar} 
                              alt={review.user_display_name}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                                if (target.nextElementSibling) {
                                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                                }
                              }}
                            />
                          ) : null}
                          <div className={`w-full h-full bg-green-600 rounded-full flex items-center justify-center ${review.user_avatar ? 'hidden' : 'flex'}`}>
                            <User className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          {/* Mobile: Stack name and badges on first line, stars below */}
                          <div className="block sm:hidden">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-gray-800 truncate">
                                {review.user_display_name || 'RupeeBee User'}
                              </span>
                              {review.is_verified && (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mb-1">
                              {review.rupeebee_user_id && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                  App User
                                </span>
                              )}
                              <StarRating rating={review.rating} readonly size="sm" />
                            </div>
                            {review.is_verified && (
                              <span className="text-xs text-green-600 font-medium">
                                Verified RupeeBee User
                              </span>
                            )}
                          </div>
                          
                          {/* Desktop: All in one line */}
                          <div className="hidden sm:block">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold text-gray-800 truncate">
                                {review.user_display_name || 'RupeeBee User'}
                              </span>
                              {review.is_verified && (
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              )}
                              {review.rupeebee_user_id && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                  App User
                                </span>
                              )}
                              <div className="ml-2">
                                <StarRating rating={review.rating} readonly size="sm" />
                              </div>
                            </div>
                            {review.is_verified && (
                              <span className="text-xs text-green-600 font-medium">
                                Verified RupeeBee User
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0 ml-4">
                        <Clock className="w-4 h-4" />
                        <span className="hidden sm:inline">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                        <span className="sm:hidden">
                          {new Date(review.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-800 leading-relaxed mb-4 break-words">
                      {review.review_text}
                    </p>
                    
                    {review.helpful_count > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{review.helpful_count} found this helpful</span>
                      </div>
                    )}
                  </div>
                ))}

                {loadingReviews && reviews.length === 0 && (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  </div>
                )}

                {!loadingReviews && reviews.length === 0 && (
                  <div className="text-center py-12">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-gray-600">
                      Be the first to share your experience with RupeeBee!
                    </p>
                  </div>
                )}

                {hasMore && reviews.length > 0 && (
                  <div className="text-center">
                    <Button
                      onClick={loadMoreReviews}
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
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

'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Star, User, CheckCircle, LogIn, LogOut, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { supabase } from '@/lib/supabase';
import { ReviewSubmission } from '@/types/reviews';
import Link from 'next/link';
import ReCAPTCHA from 'react-google-recaptcha';

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
      // The redirect will happen automatically
    } catch (error) {
      console.error('Google sign in error:', error);
      setAuthError(error instanceof Error ? error.message : 'Failed to sign in with Google');
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
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="text-center mb-5">
          <LogIn className="w-12 h-12 text-rupeebee-medium-green mx-auto mb-3" />
          <h2 className="text-xl font-bold text-rupeebee-dark-text mb-3">
            Sign in to Write a Review
          </h2>
          <p className="text-rupeebee-medium-text text-sm">
            Only verified RupeeBee app users can write reviews. Please use the same account you created in the mobile app.
          </p>
        </div>

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
                Sign in with RupeeBee Account
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
                  Redirecting to Google...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Sign in with Google
                </div>
              )}
            </Button>
            
            {isLoading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm">
                <p className="font-medium">Redirecting to Google...</p>
                <p className="text-blue-600 text-xs mt-1">
                  You&apos;ll be redirected back here after signing in with Google.
                </p>
              </div>
            )}
            
            <Button
              onClick={() => setLoginMethod('choose')}
              variant="ghost"
              className="w-full text-gray-600"
              disabled={isLoading}
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
                className="mt-1 focus:outline-none focus:border-gray-400"
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
                className="mt-1 focus:outline-none focus:border-gray-400"
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

        <div className="mt-5 text-sm text-gray-500 text-center">
          <p>
            Don&apos;t have the RupeeBee app?{' '}
            <a 
              href="/download" 
              className="text-rupeebee-medium-green hover:text-rupeebee-dark-green font-medium"
            >
              Download it here
            </a>{' '}
            and sign up to write reviews.
          </p>
        </div>
      </div>
    </div>
  );
}

function WriteReviewForm() {
  const { user, isVerifiedAppUser, signOut } = useAuth();
  const recaptchaRef = useRef<ReCAPTCHA>(null);
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

  // Show verification warning if user is not a verified app user
  if (!isVerifiedAppUser) {
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-yellow-50 rounded-full flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-rupeebee-dark-text mb-3">
              RupeeBee App Required
            </h2>
            <p className="text-rupeebee-medium-text">
              Only verified RupeeBee app users can write reviews. Please download and sign up through the mobile app first.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-2">How to get verified:</h3>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Download the RupeeBee mobile app</li>
                <li>2. Sign up with the same Google account</li>
                <li>3. Complete your profile in the app</li>
                <li>4. Come back here to write your review</li>
              </ol>
            </div>

            <div className="flex gap-3">
              <Link href="/download" className="flex-1">
                <Button className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white">
                  Download RupeeBee App
                </Button>
              </Link>
              <Button
                onClick={signOut}
                variant="outline"
                className="flex-1 border-gray-300 text-rupeebee-medium-text hover:bg-gray-50"
              >
                Sign Out
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-rupeebee-medium-text">
                Already have the app?{' '}
                <button
                  onClick={() => window.location.reload()}
                  className="text-rupeebee-medium-green hover:text-rupeebee-dark-green font-medium"
                >
                  Refresh this page
                </button>{' '}
                after signing up in the app.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

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

    // Verify reCAPTCHA
    const recaptchaToken = recaptchaRef.current?.getValue();
    if (!recaptchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please complete the reCAPTCHA verification.'
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
          email_phone: user?.email || '',
          recaptcha_token: recaptchaToken
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
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        // Handle specific error codes
        if (result.error_code === 'NOT_APP_USER') {
          setSubmitStatus({
            type: 'error',
            message: 'Please download the RupeeBee app and complete your registration first.'
          });
          // Sign out the user so they see the verification prompt
          setTimeout(() => {
            signOut();
          }, 3000);
        } else {
          setSubmitStatus({
            type: 'error',
            message: result.message || 'Failed to submit review. Please try again.'
          });
        }
        // Reset reCAPTCHA on error
        recaptchaRef.current?.reset();
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.'
      });
      // Reset reCAPTCHA on error
      recaptchaRef.current?.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-rupeebee-dark-text">
            Write Your Review
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-rupeebee-medium-text">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="hidden sm:inline">Verified User: {user?.email}</span>
              <span className="sm:hidden">Verified</span>
            </div>
            <Button
              onClick={signOut}
              variant="outline"
              size="sm"
              className="border-gray-300 text-rupeebee-medium-text hover:bg-gray-50"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Rating */}
          <div>
            <Label className="text-base font-medium text-rupeebee-dark-text mb-2 block">
              Rating *
            </Label>
            <div className="flex items-center gap-3">
              <StarRating
                rating={reviewData.rating}
                onChange={handleRatingChange}
                size="md"
              />
              <span className="text-rupeebee-medium-text text-sm">
                {reviewData.rating > 0 ? `${reviewData.rating} star${reviewData.rating !== 1 ? 's' : ''}` : 'Click to rate'}
              </span>
            </div>
          </div>

          {/* Review Text */}
          <div>
            <Label htmlFor="review-text" className="text-base font-medium text-rupeebee-dark-text mb-2 block">
              Your Review *
            </Label>
            <textarea
              id="review-text"
              value={reviewData.review_text}
              onChange={(e) => setReviewData(prev => ({ ...prev, review_text: e.target.value }))}
              placeholder="Share your experience with RupeeBee..."
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-rupeebee-dark-text resize-none text-sm focus:outline-none focus:border-gray-400"
              rows={4}
              maxLength={500}
              required
            />
            <p className="text-xs text-rupeebee-medium-text mt-1">
              {reviewData.review_text.length}/500 characters
            </p>
          </div>

          {/* Status Messages */}
          {submitStatus.type && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-3 rounded-lg border ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {submitStatus.type === 'success' ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-red-600" />
                )}
                <span className="text-sm">{submitStatus.message}</span>
              </div>
            </motion.div>
          )}

          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <div className="transform scale-90">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}
                theme="light"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <Link href="/reviews" className="flex-1">
              <Button
                type="button"
                variant="outline"
                className="w-full border-gray-300 text-rupeebee-medium-text hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Reviews
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={isSubmitting || reviewData.rating === 0 || reviewData.review_text.length < 10}
              className="flex-1 bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                'Submit Review'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function WriteReviewPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rupeebee-medium-green"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-rupeebee-dark-text mb-3">
            Write a Review
          </h1>
          <p className="text-lg text-rupeebee-medium-text max-w-xl mx-auto">
            Share your experience with RupeeBee and help others make informed decisions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {user ? <WriteReviewForm /> : <AuthPrompt />}
        </motion.div>
      </div>
    </div>
  );
}

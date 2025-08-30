'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ReCAPTCHA from 'react-google-recaptcha';

const FEEDBACK_CATEGORIES = [
  'Bug Report',
  'Feature Suggestion', 
  'General Feedback',
  'Complaint',
  'Praise'
];

export default function FeedbackPage() {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [feedbackData, setFeedbackData] = useState({
    category: 'General Feedback',
    message: '',
    contact_info: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const handleInputChange = (field: string, value: string) => {
    setFeedbackData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedbackData.message.length < 10) {
      setSubmitStatus({
        type: 'error',
        message: 'Please provide more detailed feedback (at least 10 characters).'
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
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...feedbackData,
          recaptcha_token: recaptchaToken
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message
        });
        setFeedbackData({
          category: 'General Feedback',
          message: '',
          contact_info: ''
        });
        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit feedback. Please try again.'
        });
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
    <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige pt-24">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-rupeebee-medium-green rounded-full mb-4 mx-auto">
            <MessageSquare className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-rupeebee-dark-text mb-3">
            Share Your Feedback
          </h1>
          <p className="text-lg text-rupeebee-medium-text max-w-xl mx-auto">
            Help us improve RupeeBee by sharing your thoughts, suggestions, or reporting issues.
          </p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Category Selection */}
              <div>
                <Label htmlFor="category" className="text-base font-medium text-rupeebee-dark-text mb-2 block">
                  Feedback Category
                </Label>
                <select
                  id="category"
                  value={feedbackData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-rupeebee-dark-text text-sm focus:outline-none focus:border-gray-400"
                  required
                  aria-label="Select feedback category"
                >
                  {FEEDBACK_CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <Label htmlFor="message" className="text-base font-medium text-rupeebee-dark-text mb-2 block">
                  Your Message
                </Label>
                <textarea
                  id="message"
                  value={feedbackData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please share your feedback, suggestions, or report any issues..."
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-rupeebee-dark-text resize-none text-sm focus:outline-none focus:border-gray-400"
                  rows={4}
                  maxLength={1000}
                  required
                />
                <p className="text-xs text-rupeebee-medium-text mt-1">
                  {feedbackData.message.length}/1000 characters
                </p>
              </div>

              {/* Contact Information (Optional) */}
              <div>
                <Label htmlFor="contact" className="text-base font-medium text-rupeebee-dark-text mb-2 block">
                  Contact Email <span className="text-rupeebee-medium-text font-normal text-sm">(Optional)</span>
                </Label>
                <Input
                  id="contact"
                  type="email"
                  value={feedbackData.contact_info}
                  onChange={(e) => handleInputChange('contact_info', e.target.value)}
                  placeholder="your.email@example.com"
                  className="text-sm focus:outline-none focus:border-gray-400"
                />
                <p className="text-xs text-rupeebee-medium-text mt-1">
                  For follow-up if needed
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
              <Button
                type="submit"
                disabled={isSubmitting || feedbackData.message.length < 10}
                className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white py-2.5 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit Feedback
                  </div>
                )}
              </Button>
            </form>
          </div>
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-xl mx-auto mt-8"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h3 className="text-base font-semibold text-rupeebee-dark-text mb-2">
              What happens next?
            </h3>
            <ul className="space-y-1.5 text-rupeebee-medium-text text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-rupeebee-medium-green rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Reviewed within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-rupeebee-medium-green rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Bug reports prioritized by severity</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-rupeebee-medium-green rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Feature suggestions evaluated for releases</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-rupeebee-medium-green rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Follow-up via email if provided</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

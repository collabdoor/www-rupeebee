'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageSquare, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const FEEDBACK_CATEGORIES = [
  'Bug Report',
  'Feature Suggestion', 
  'General Feedback',
  'Complaint',
  'Praise'
];

export default function FeedbackPage() {
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

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
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
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Failed to submit feedback. Please try again.'
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
    <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige via-white to-rupeebee-light-beige">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-rupeebee-medium-green rounded-full mb-6 mx-auto">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-rupeebee-dark-text mb-4">
            Share Your Feedback
          </h1>
          <p className="text-xl text-rupeebee-medium-text max-w-2xl mx-auto">
            We value your input! Help us improve RupeeBee by sharing your thoughts, suggestions, or reporting any issues you&apos;ve encountered.
          </p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div>
                <Label htmlFor="category" className="text-lg font-medium text-rupeebee-dark-text mb-3 block">
                  Feedback Category
                </Label>
                <select
                  id="category"
                  value={feedbackData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rupeebee-medium-green focus:border-transparent text-rupeebee-dark-text"
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
                <Label htmlFor="message" className="text-lg font-medium text-rupeebee-dark-text mb-3 block">
                  Your Message
                </Label>
                <textarea
                  id="message"
                  value={feedbackData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder="Please share your feedback, suggestions, or report any issues you've experienced..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rupeebee-medium-green focus:border-transparent text-rupeebee-dark-text resize-none"
                  rows={6}
                  maxLength={1000}
                  required
                />
                <p className="text-sm text-rupeebee-medium-text mt-2">
                  {feedbackData.message.length}/1000 characters
                </p>
              </div>

              {/* Contact Information (Optional) */}
              <div>
                <Label htmlFor="contact" className="text-lg font-medium text-rupeebee-dark-text mb-3 block">
                  Contact Information <span className="text-rupeebee-medium-text font-normal">(Optional)</span>
                </Label>
                <Input
                  id="contact"
                  type="email"
                  value={feedbackData.contact_info}
                  onChange={(e) => handleInputChange('contact_info', e.target.value)}
                  placeholder="your.email@example.com (for follow-up if needed)"
                  className="focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                />
                <p className="text-sm text-rupeebee-medium-text mt-2">
                  We&apos;ll only use this to follow up on your feedback if necessary.
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
                disabled={isSubmitting || feedbackData.message.length < 10}
                className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
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
          className="max-w-2xl mx-auto mt-12"
        >
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-rupeebee-dark-text mb-3">
              What happens after you submit?
            </h3>
            <ul className="space-y-2 text-rupeebee-medium-text">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-rupeebee-medium-green rounded-full mt-2 flex-shrink-0"></div>
                <span>Your feedback is reviewed by our team within 24-48 hours</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-rupeebee-medium-green rounded-full mt-2 flex-shrink-0"></div>
                <span>Bug reports are prioritized based on severity and impact</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-rupeebee-medium-green rounded-full mt-2 flex-shrink-0"></div>
                <span>Feature suggestions are evaluated for future releases</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-rupeebee-medium-green rounded-full mt-2 flex-shrink-0"></div>
                <span>If you provided contact info, we may reach out for clarification</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

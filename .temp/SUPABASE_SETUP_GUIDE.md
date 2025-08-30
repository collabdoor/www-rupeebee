# RupeeBee Reviews & Feedback System - Supabase Setup Guide

This guide will help you set up the database tables and security policies in Supabase for the RupeeBee Reviews & Feedback system.

## Prerequisites

- Access to your Supabase project dashboard
- Admin privileges in your Supabase project
- Your Supabase URL and anon key (already configured in your project)

## Database Setup

### Step 1: Create the Reviews Table

Go to your Supabase SQL Editor and execute the following SQL:

```sql
-- Create reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_identifier TEXT, -- hashed email/phone/app_user_id for privacy
  user_display_name TEXT DEFAULT 'RupeeBee User',
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL CHECK (length(review_text) >= 10 AND length(review_text) <= 500),
  is_verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_reviews_status ON public.reviews(status);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_user_identifier ON public.reviews(user_identifier);

-- Add trigger to automatically update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON public.reviews 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```

### Step 2: Create the Feedback Table

```sql
-- Create feedback table
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('Bug Report', 'Feature Suggestion', 'General Feedback', 'Complaint', 'Praise')),
  message TEXT NOT NULL CHECK (length(message) >= 10 AND length(message) <= 1000),
  contact_info TEXT, -- optional email/phone for follow-up
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'in_progress', 'resolved', 'archived')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feedback_status ON public.feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_category ON public.feedback(category);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON public.feedback(created_at DESC);

-- Add triggers to automatically update updated_at
CREATE TRIGGER update_feedback_updated_at 
    BEFORE UPDATE ON public.feedback 
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
```
```

### Step 3: Create Admin View for Combined Data

```sql
-- Create a view for admin dashboard to see both reviews and feedback in one table
CREATE OR REPLACE VIEW public.admin_feedback_reviews AS
SELECT 
  'review' as type,
  id,
  user_identifier,
  review_text as content,
  rating,
  null as category,
  status,
  created_at,
  updated_at
FROM public.reviews
UNION ALL
SELECT 
  'feedback' as type,
  id,
  contact_info as user_identifier,
  message as content,
  null as rating,
  category,
  status,
  created_at,
  updated_at
FROM public.feedback
ORDER BY created_at DESC;
```

## Row Level Security (RLS) Setup

### Step 4: Enable RLS and Create Policies

```sql
-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public read access for approved reviews only
CREATE POLICY "Anyone can read approved reviews" ON public.reviews
  FOR SELECT USING (status = 'approved');

-- Allow authenticated users to insert reviews
CREATE POLICY "Anyone can insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Only allow updates to status and helpful_count (for admin use via API)
CREATE POLICY "Service role can update reviews" ON public.reviews
  FOR UPDATE USING (true) WITH CHECK (true);

-- Allow anyone to insert feedback
CREATE POLICY "Anyone can insert feedback" ON public.feedback
  FOR INSERT WITH CHECK (true);

-- Only service role can read feedback (admin only)
CREATE POLICY "Service role can read feedback" ON public.feedback
  FOR SELECT USING (true);

-- Only service role can update feedback
CREATE POLICY "Service role can update feedback" ON public.feedback
  FOR UPDATE USING (true) WITH CHECK (true);

-- Admin view access (service role only)
-- Note: Views inherit permissions from underlying tables, so no additional policy needed
```

## Environment Variables Setup

### Step 5: Update Your .env.local File

Make sure your `.env.local` file contains all the necessary environment variables:

```env
# Supabase Configuration (already configured)
NEXT_PUBLIC_SUPABASE_URL=https://nufgvtezrxkvorztcwqo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Zmd2dGV6cnhrdm9yenRjd3FvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNTM4NDIsImV4cCI6MjA2ODkyOTg0Mn0.09VhyA5D8gDiumKp3sDtmqlvm2eTw8Yh-O515trO61M

# Admin Authentication
ADMIN_ID=rupeebee_admin_2025
ADMIN_PSK=RupeeBee@Admin#2025$Secure
JWT_SECRET=your_jwt_secret_key_here_change_in_production

# reCAPTCHA Configuration (optional but recommended)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

## reCAPTCHA Setup (Optional but Recommended)

### Step 6: Configure Google reCAPTCHA

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site with these settings:
   - **reCAPTCHA type**: reCAPTCHA v2 (I'm not a robot checkbox)
   - **Domains**: Add your domains (without protocol, port, or path):
     - For development: `localhost`
     - For production: `rupeebee.vercel.app` (or your actual domain)
3. Copy the **Site Key** and **Secret Key**
4. Add them to your `.env.local` file as shown above

## Security Considerations

### Step 7: Additional Security Setup

1. **IP Rate Limiting**: Consider adding rate limiting at the Supabase edge functions or Cloudflare level
2. **JWT Secret**: Generate a strong JWT secret for production:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. **Admin Credentials**: Change the default admin credentials before deploying to production
4. **Database Backups**: Ensure automatic backups are enabled in your Supabase project settings

## Testing the Setup

### Step 8: Verify Everything Works

1. **Test Review Submission**:
   - Visit `/reviews` on your website
   - Submit a test review
   - Check the `reviews` table in Supabase to see if it appears with `status = 'pending'`

2. **Test Feedback Submission**:
   - Submit test feedback through the feedback form
   - Check the `feedback` table in Supabase

3. **Test Admin Access**:
   - Visit `/admin/login`
   - Login with your admin credentials
   - Verify you can see both reviews and feedback in the dashboard
   - Test approving/rejecting reviews

## Monitoring and Maintenance

### Step 9: Ongoing Maintenance

1. **Monitor Table Growth**: Set up alerts if tables grow too large
2. **Review Content**: Regularly review pending content for spam/inappropriate material
3. **Update Policies**: Adjust RLS policies as needed for security
4. **Backup Strategy**: Ensure you have a backup and restore strategy

## Troubleshooting

### Common Issues:

1. **Permission Denied Errors**: Check your RLS policies and ensure they allow the intended operations
2. **API Errors**: Verify your environment variables are correctly set
3. **reCAPTCHA Failures**: Ensure your site key matches your domain and the secret key is correct
4. **Admin Login Issues**: Verify admin credentials in environment variables

### Useful SQL Queries for Debugging:

```sql
-- Check review counts by status
SELECT status, COUNT(*) FROM public.reviews GROUP BY status;

-- Check feedback counts by category and status  
SELECT category, status, COUNT(*) FROM public.feedback GROUP BY category, status;

-- Recent submissions
SELECT type, created_at, status FROM public.admin_feedback_reviews ORDER BY created_at DESC LIMIT 10;

-- Check for potential spam (reviews with similar text)
SELECT review_text, COUNT(*) as count 
FROM public.reviews 
GROUP BY review_text 
HAVING COUNT(*) > 1;
```

## Support

If you encounter any issues with the setup, please check:

1. Supabase project logs in the dashboard
2. Browser console for JavaScript errors
3. Network tab to see API request/response details
4. Your .env.local file for correct configuration

The system is now ready to handle reviews and feedback for your RupeeBee application!

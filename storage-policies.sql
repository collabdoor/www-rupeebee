-- Storage Policies for RupeeBee Bank Modules
-- Run these commands in your Supabase SQL Editor

-- First, ensure RLS is enabled on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Drop any existing conflicting policies (optional - only if you're getting conflicts)
-- DROP POLICY IF EXISTS "Allow authenticated uploads to user-uploads" ON storage.objects;
-- DROP POLICY IF EXISTS "Allow public read for user-uploads" ON storage.objects;

-- Create policy for user-uploads bucket to allow authenticated uploads
CREATE POLICY "Allow authenticated uploads to user-uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'user-uploads' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to read their uploads
CREATE POLICY "Allow authenticated read for user-uploads" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'user-uploads' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to update their uploads
CREATE POLICY "Allow authenticated update for user-uploads" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'user-uploads' 
  AND auth.role() = 'authenticated'
);

-- Allow authenticated users to delete their uploads
CREATE POLICY "Allow authenticated delete for user-uploads" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'user-uploads' 
  AND auth.role() = 'authenticated'
);

-- Similar policies for temp-files bucket
CREATE POLICY "Allow authenticated uploads to temp-files" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'temp-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated read for temp-files" 
ON storage.objects FOR SELECT 
USING (
  bucket_id = 'temp-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated update for temp-files" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'temp-files' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Allow authenticated delete for temp-files" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'temp-files' 
  AND auth.role() = 'authenticated'
);

-- If you want to allow public read access to uploaded files, add these:
CREATE POLICY "Allow public read for user-uploads" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'user-uploads');

CREATE POLICY "Allow public read for temp-files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'temp-files');

-- Update bucket MIME type restrictions to allow PDFs and videos
-- Note: This might need to be done via the Supabase dashboard under Storage > Settings
-- Or you can try this SQL (may require superuser privileges):

-- UPDATE storage.buckets 
-- SET allowed_mime_types = ARRAY[
--   'application/pdf',
--   'video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo',
--   'video/x-ms-wmv', 'video/x-flv', 'video/webm', 'video/x-matroska',
--   'image/jpeg', 'image/png', 'image/gif', 'image/webp',
--   'text/plain'  -- for testing
-- ]
-- WHERE name IN ('user-uploads', 'temp-files');
#!/usr/bin/env node

/**
 * Supabase Storage Setup Script
 * 
 * This script sets up the required storage buckets for the application.
 * Run this after setting up your Supabase project.
 * 
 * Usage: npm run setup-storage
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

const BUCKETS = [
  {
    name: 'bank-modules',
    options: {
      public: true,
      allowedMimeTypes: [
        'application/pdf',
        'video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo',
        'video/x-ms-wmv', 'video/x-flv', 'video/webm', 'video/x-matroska'
      ],
      fileSizeLimit: 100 * 1024 * 1024 // 100MB (more reasonable limit)
    }
  },
  {
    name: 'user-uploads',
    options: {
      public: false,
      allowedMimeTypes: [
        'application/pdf',
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      fileSizeLimit: 50 * 1024 * 1024 // 50MB
    }
  },
  {
    name: 'temp-files',
    options: {
      public: false,
      fileSizeLimit: 25 * 1024 * 1024 // 25MB
    }
  }
];

async function setupBuckets() {
  console.log('🚀 Setting up Supabase storage buckets...\n');

  try {
    // List existing buckets
    const { data: existingBuckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Failed to list existing buckets: ${listError.message}`);
    }

    const existingBucketNames = existingBuckets?.map(bucket => bucket.name) || [];
    console.log('📋 Existing buckets:', existingBucketNames.length > 0 ? existingBucketNames.join(', ') : 'None');

    // Create buckets
    for (const bucket of BUCKETS) {
      if (existingBucketNames.includes(bucket.name)) {
        console.log(`✅ Bucket '${bucket.name}' already exists`);
        continue;
      }

      console.log(`📦 Creating bucket '${bucket.name}'...`);
      
      const { data, error } = await supabase.storage.createBucket(bucket.name, bucket.options);
      
      if (error) {
        console.error(`❌ Failed to create bucket '${bucket.name}': ${error.message}`);
      } else {
        console.log(`✅ Successfully created bucket '${bucket.name}'`);
      }
    }

    console.log('\n🎉 Storage setup completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Run the SQL commands in your Supabase SQL editor to set up storage policies');
    console.log('2. Test file uploads in your application');
    
    // Log the SQL commands
    console.log('\n📋 Storage Policy SQL (run in Supabase SQL Editor):');
    console.log('--------------------------------------------------------');
    console.log(getStoragePolicySQL());

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

function getStoragePolicySQL() {
  return `
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Bank modules bucket policies (public read, authenticated write)
CREATE POLICY "Public read access for bank-modules" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'bank-modules');

CREATE POLICY "Authenticated upload to bank-modules" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

CREATE POLICY "Bank users can update their files in bank-modules" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

CREATE POLICY "Bank users can delete their files in bank-modules" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

-- User uploads bucket policies (private access)
CREATE POLICY "Users can view their own files in user-uploads" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload to their own folder in user-uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own files in user-uploads" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own files in user-uploads" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Temp files bucket policies (authenticated access)
CREATE POLICY "Authenticated users can access temp-files" 
ON storage.objects FOR ALL 
USING (bucket_id = 'temp-files' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'temp-files' AND auth.role() = 'authenticated');
`;
}

// Run the setup
setupBuckets();
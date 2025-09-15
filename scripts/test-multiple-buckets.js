#!/usr/bin/env node

/**
 * Test Multiple Bucket Upload Strategy
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

// Use anon key to simulate client-side behavior
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testMultipleBuckets() {
  console.log('🧪 Testing multiple bucket upload strategy...\n');

  const bucketsToTry = [
    'user-uploads',
    'temp-files', 
    'rupeebee-assets',
    'community-images',
    'profile-pictures'
  ];

  const testContent = 'Test file for multiple bucket strategy';
  const testFile = new Blob([testContent], { type: 'text/plain' });
  const testPath = `test/multi-bucket-test-${Date.now()}.txt`;

  for (const bucket of bucketsToTry) {
    console.log(`📤 Trying upload to bucket: ${bucket}`);
    
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(testPath, testFile);

      if (error) {
        console.log(`❌ ${bucket}: ${error.message}`);
      } else {
        console.log(`✅ ${bucket}: Upload successful!`);
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from(bucket)
          .getPublicUrl(testPath);
        
        console.log(`🔗 Public URL: ${urlData.publicUrl}`);
        
        // Clean up
        await supabase.storage.from(bucket).remove([testPath]);
        console.log(`🧹 Cleaned up test file from ${bucket}\n`);
        
        // Success! We found a working bucket
        console.log(`🎉 SUCCESS: Bucket '${bucket}' is working for uploads!`);
        return bucket;
      }
    } catch (err) {
      console.log(`❌ ${bucket}: Unexpected error - ${err.message}`);
    }
  }
  
  console.log('❌ All buckets failed');
  return null;
}

testMultipleBuckets();
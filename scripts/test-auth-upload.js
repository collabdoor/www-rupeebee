#!/usr/bin/env node

/**
 * Test Upload with Authentication
 * This script tests if uploads work when the user is authenticated
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testWithAuth() {
  console.log('🔐 Testing upload with authentication...\n');

  // First, let's create a test user or sign in
  console.log('📝 Creating/signing in test user...');
  
  const testEmail = 'test.bank@rupeebee.com';
  const testPassword = 'TestPassword123!';

  // Try to sign up first (will fail if user exists, which is fine)
  await supabase.auth.signUp({
    email: testEmail,
    password: testPassword,
    options: {
      data: {
        role: 'bank',
        bank_name: 'Test Bank'
      }
    }
  });

  // Now sign in
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: testEmail,
    password: testPassword
  });

  if (authError) {
    console.error('❌ Authentication failed:', authError.message);
    return;
  }

  console.log('✅ Successfully authenticated as:', authData.user.email);

  // Now test uploads
  const bucketsToTry = ['user-uploads', 'temp-files'];
  
  for (const bucket of bucketsToTry) {
    console.log(`\n📤 Testing authenticated upload to: ${bucket}`);
    
    // Test with a PDF-like file
    const testContent = 'This is a test PDF content';
    const testFile = new Blob([testContent], { type: 'application/pdf' });
    const testPath = `bank-modules/test-bank/test-${Date.now()}.pdf`;

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
        console.log(`🧹 Cleaned up test file`);
        
        // Success! We found a working bucket
        console.log(`🎉 SUCCESS: Bucket '${bucket}' works with authentication!`);
        break;
      }
    } catch (err) {
      console.log(`❌ ${bucket}: Unexpected error - ${err.message}`);
    }
  }

  // Clean up - sign out
  await supabase.auth.signOut();
  console.log('\n🚪 Signed out');
}

testWithAuth();
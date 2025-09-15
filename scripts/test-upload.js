#!/usr/bin/env node

/**
 * Test Upload Functionality
 * This script tests the file upload functionality without running the full app
 */

require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUpload() {
  console.log('🧪 Testing file upload functionality...\n');

  try {
    // Test 1: List existing buckets
    console.log('📋 Listing existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError.message);
      return;
    }
    
    console.log('✅ Available buckets:', buckets.map(b => b.name).join(', '));
    
    // Test 2: Check if our target bucket exists
    const targetBucket = 'rupeebee-assets';
    const bucketExists = buckets.some(bucket => bucket.name === targetBucket);
    
    if (!bucketExists) {
      console.error(`❌ Target bucket '${targetBucket}' not found`);
      return;
    }
    
    console.log(`✅ Target bucket '${targetBucket}' exists`);
    
    // Test 3: Try to create a test file (small text file)
    console.log('\n📤 Testing file upload...');
    const testContent = 'This is a test file for RupeeBee bank modules';
    const testFile = new Blob([testContent], { type: 'text/plain' });
    const testPath = `bank-modules/test/test-${Date.now()}.txt`;
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(targetBucket)
      .upload(testPath, testFile);
    
    if (uploadError) {
      console.error('❌ Upload failed:', uploadError.message);
      return;
    }
    
    console.log('✅ File uploaded successfully:', uploadData.path);
    
    // Test 4: Generate public URL
    console.log('\n🔗 Generating public URL...');
    const { data: urlData } = supabase.storage
      .from(targetBucket)
      .getPublicUrl(testPath);
    
    console.log('✅ Public URL:', urlData.publicUrl);
    
    // Test 5: Clean up test file
    console.log('\n🧹 Cleaning up test file...');
    const { error: deleteError } = await supabase.storage
      .from(targetBucket)
      .remove([testPath]);
    
    if (deleteError) {
      console.warn('⚠️ Could not delete test file:', deleteError.message);
    } else {
      console.log('✅ Test file cleaned up');
    }
    
    console.log('\n🎉 All tests passed! File upload functionality is working.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Test database connection as well
async function testDatabase() {
  console.log('\n🗄️ Testing database connection...');
  
  try {
    // Test inserting a dummy module (we'll delete it after)
    const testModule = {
      bank_name: 'Test Bank',
      title: 'Test Module',
      description: 'This is a test module',
      category: 'Other',
      content_type: 'Article',
      language: 'English',
      difficulty_level: 'Beginner',
      estimated_duration: 5,
      tags: ['test'],
      is_published: false
    };
    
    const { data, error } = await supabase
      .from('bank_learning_modules')
      .insert([testModule])
      .select()
      .single();
    
    if (error) {
      console.error('❌ Database test failed:', error.message);
      return;
    }
    
    console.log('✅ Database insert successful, ID:', data.id);
    
    // Clean up test module
    const { error: deleteError } = await supabase
      .from('bank_learning_modules')
      .delete()
      .eq('id', data.id);
    
    if (deleteError) {
      console.warn('⚠️ Could not delete test module:', deleteError.message);
    } else {
      console.log('✅ Test module cleaned up');
    }
    
  } catch (error) {
    console.error('❌ Database test error:', error.message);
  }
}

async function main() {
  await testUpload();
  await testDatabase();
  console.log('\n✨ Test completed!');
}

main().catch(console.error);
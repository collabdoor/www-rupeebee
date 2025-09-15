#!/usr/bin/env node

/**
 * Test API Upload Functionality
 */

const FormData = require('form-data');
const fs = require('fs');
const fetch = require('node-fetch');

async function testAPIUpload() {
  console.log('🧪 Testing API upload functionality...\n');

  try {
    // Create a test file
    const testContent = 'This is a test PDF for API upload functionality';
    const testFilePath = './test-upload.pdf';
    fs.writeFileSync(testFilePath, testContent);

    console.log('📄 Created test file:', testFilePath);

    // Create form data
    const formData = new FormData();
    formData.append('file', fs.createReadStream(testFilePath), {
      filename: 'test-upload.pdf',
      contentType: 'application/pdf'
    });
    formData.append('bankName', 'Test Bank');
    formData.append('category', 'Investment');

    console.log('📤 Uploading via API...');

    // Upload via API
    const response = await fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();

    if (response.ok && result.success) {
      console.log('✅ Upload successful!');
      console.log('📁 Bucket:', result.data.bucket);
      console.log('📎 Path:', result.data.path);
      console.log('🔗 Public URL:', result.data.publicUrl);
    } else {
      console.log('❌ Upload failed:', result.error);
    }

    // Clean up test file
    fs.unlinkSync(testFilePath);
    console.log('🧹 Cleaned up test file');

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

// Check if server is running
fetch('http://localhost:4000/api/upload', { method: 'OPTIONS' })
  .then(() => {
    console.log('🚀 Server is running, starting test...\n');
    return testAPIUpload();
  })
  .catch(() => {
    console.log('❌ Server not running. Start with: pnpm run dev');
    console.log('Then run: pnpm run test-api-upload');
  });
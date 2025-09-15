import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { validateFile, generateFilePath, getFileType } from '@/lib/storage';

export async function POST(request: NextRequest) {
  try {
    // Get the form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const bankName = formData.get('bankName') as string;
    const category = formData.get('category') as string;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    if (!bankName) {
      return NextResponse.json(
        { error: 'Bank name is required' },
        { status: 400 }
      );
    }

    // Validate file type and size
    const fileType = getFileType(file.name);
    
    if (fileType === 'UNKNOWN') {
      return NextResponse.json(
        { error: 'Invalid file type. Only PDF and video files are allowed.' },
        { status: 400 }
      );
    }

    const validation = validateFile(file, fileType);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join('; ') },
        { status: 400 }
      );
    }

    // Generate file path
    const filePath = generateFilePath(file.name, bankName, category || 'general');

    // Try uploading to different buckets
    const bucketsToTry = [
      'user-uploads',
      'temp-files',
      'rupeebee-assets',
      'community-images'
    ];

    let uploadResult = null;
    let usedBucket = null;

    for (const bucket of bucketsToTry) {
      try {
        const { data, error } = await supabaseAdmin.storage
          .from(bucket)
          .upload(filePath, file, {
            upsert: false
          });

        if (!error && data) {
          uploadResult = data;
          usedBucket = bucket;
          break;
        }
      } catch (err) {
        // Continue to next bucket
        console.warn(`Upload to ${bucket} failed:`, err);
      }
    }

    if (!uploadResult || !usedBucket) {
      return NextResponse.json(
        { error: 'Failed to upload file to any available storage bucket' },
        { status: 500 }
      );
    }

    // Generate public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(usedBucket)
      .getPublicUrl(filePath);

    return NextResponse.json({
      success: true,
      data: {
        path: uploadResult.path,
        fullPath: uploadResult.fullPath,
        bucket: usedBucket,
        publicUrl: urlData.publicUrl
      }
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json(
      { error: 'Internal server error during file upload' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filePath = searchParams.get('path');
    const bucketName = searchParams.get('bucket') || 'rupeebee-assets';

    if (!filePath) {
      return NextResponse.json(
        { error: 'File path is required' },
        { status: 400 }
      );
    }

    // List of buckets to try in order
    const bucketsToTry = [
      bucketName, // User specified bucket first
      'rupeebee-assets',
      'rupeebee-backup', 
      'bank-learning-modules',
      'user-uploads'
    ];

    // Remove duplicates while preserving order
    const uniqueBuckets = [...new Set(bucketsToTry)];

    for (const bucket of uniqueBuckets) {
      try {
        // Check if file exists in this bucket
        const { data: fileData, error: downloadError } = await supabaseAdmin.storage
          .from(bucket)
          .download(filePath);

        if (!downloadError && fileData) {
          // File exists, generate public URL
          const { data: urlData } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(filePath);

          if (urlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              data: {
                publicUrl: urlData.publicUrl,
                bucket: bucket,
                path: filePath,
                size: fileData.size,
                type: fileData.type
              }
            });
          }
        }
      } catch (bucketError) {
        // Continue to next bucket if this one fails
        console.log(`Failed to access file in bucket ${bucket}:`, bucketError);
        continue;
      }
    }

    // File not found in any bucket
    return NextResponse.json(
      { 
        error: 'File not found in any available bucket',
        searched_buckets: uniqueBuckets,
        path: filePath
      },
      { status: 404 }
    );

  } catch (error) {
    console.error('Error accessing file:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paths, bucket = 'rupeebee-assets' } = body;

    if (!paths || !Array.isArray(paths)) {
      return NextResponse.json(
        { error: 'Paths array is required' },
        { status: 400 }
      );
    }

    const bucketsToTry = [
      bucket,
      'rupeebee-assets',
      'rupeebee-backup',
      'bank-learning-modules', 
      'user-uploads'
    ];

    const uniqueBuckets = [...new Set(bucketsToTry)];
    const results = [];

    for (const path of paths) {
      let found = false;
      
      for (const bucketName of uniqueBuckets) {
        try {
          const { data: fileData, error: downloadError } = await supabaseAdmin.storage
            .from(bucketName)
            .download(path);

          if (!downloadError && fileData) {
            const { data: urlData } = supabaseAdmin.storage
              .from(bucketName)
              .getPublicUrl(path);

            if (urlData?.publicUrl) {
              results.push({
                path,
                success: true,
                data: {
                  publicUrl: urlData.publicUrl,
                  bucket: bucketName,
                  path: path,
                  size: fileData.size,
                  type: fileData.type
                }
              });
              found = true;
              break;
            }
          }
        } catch (bucketError) {
          continue;
        }
      }

      if (!found) {
        results.push({
          path,
          success: false,
          error: 'File not found in any bucket'
        });
      }
    }

    return NextResponse.json({
      success: true,
      data: results
    });

  } catch (error) {
    console.error('Error in batch file access:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
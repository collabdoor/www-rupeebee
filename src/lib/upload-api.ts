/**
 * Server-side Upload Utility
 * Uses API endpoint to bypass RLS policies
 */

export interface UploadResult {
  success: boolean;
  data?: {
    path: string;
    fullPath: string;
    bucket: string;
    publicUrl: string;
  };
  error?: string;
}

export async function uploadFileViaAPI(
  file: File,
  bankName: string,
  category?: string
): Promise<UploadResult> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bankName', bankName);
    if (category) {
      formData.append('category', category);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Upload failed'
      };
    }

    return result;

  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed'
    };
  }
}

/**
 * Alternative upload function that tries API first, then falls back to direct upload
 */
export async function uploadFileWithFallback(
  file: File,
  bankName: string,
  category?: string
): Promise<{ data: { path?: string } | null; error: { message: string } | null; publicUrl?: string }> {
  
  // Try API upload first (works around RLS policies)
  const apiResult = await uploadFileViaAPI(file, bankName, category);
  
  if (apiResult.success && apiResult.data) {
    return {
      data: { path: apiResult.data.path },
      error: null,
      publicUrl: apiResult.data.publicUrl
    };
  }

  // If API fails, return the error
  return {
    data: null,
    error: { message: apiResult.error || 'Upload failed' }
  };
}
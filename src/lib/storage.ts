import { supabase, supabaseAdmin } from './supabase';

// Types for upload results
interface UploadError {
  message: string;
  details?: unknown;
}

interface UploadResult {
  data: unknown;
  error: UploadError | null;
  bucket?: string;
}

// Storage bucket names - with fallback strategy
export const STORAGE_BUCKETS = {
  BANK_MODULES: 'user-uploads', // Use existing working bucket for bank content (permanent)
  USER_UPLOADS: 'user-uploads', // Same bucket, organized by folder structure
  TEMP_FILES: 'temp-files', // For temporary files only (avoid for permanent content)
  FALLBACK: 'rupeebee-assets' // Fallback if others fail
} as const;

// Allowed file types
export const ALLOWED_FILE_TYPES = {
  PDF: ['.pdf'] as readonly string[],
  VIDEO: ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mkv'] as readonly string[],
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'] as readonly string[],
  DOCUMENT: ['.pdf', '.doc', '.docx', '.txt', '.rtf'] as readonly string[]
};

// Max file sizes (in bytes)
export const MAX_FILE_SIZES = {
  PDF: 50 * 1024 * 1024, // 50MB
  VIDEO: 100 * 1024 * 1024, // 100MB (reduced for better compatibility)
  IMAGE: 10 * 1024 * 1024, // 10MB
  DOCUMENT: 25 * 1024 * 1024 // 25MB
} as const;

/**
 * Initialize storage buckets if they don't exist
 * This should be called during application setup
 */
export async function initializeStorageBuckets() {
  const bucketsToCreate = Object.values(STORAGE_BUCKETS);
  
  for (const bucketName of bucketsToCreate) {
    try {
      // Check if bucket exists
      const { data: buckets, error: listError } = await supabaseAdmin.storage.listBuckets();
      
      if (listError) {
        console.error(`Error listing buckets: ${listError.message}`);
        continue;
      }

      const bucketExists = buckets?.some(bucket => bucket.name === bucketName);
      
      if (!bucketExists) {
        // Create bucket with appropriate settings
        const { error } = await supabaseAdmin.storage.createBucket(bucketName, {
          public: true,
          allowedMimeTypes: getDefaultAllowedMimeTypes(),
          fileSizeLimit: MAX_FILE_SIZES.VIDEO // Use largest limit as default
        });

        if (error) {
          console.error(`Error creating bucket ${bucketName}: ${error.message}`);
        } else {
          console.log(`Successfully created bucket: ${bucketName}`);
        }
      }
    } catch (error) {
      console.error(`Failed to initialize bucket ${bucketName}:`, error);
    }
  }
}

/**
 * Get default allowed MIME types for buckets
 */
function getDefaultAllowedMimeTypes(): string[] {
  return [
    // PDF
    'application/pdf',
    // Videos
    'video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo',
    'video/x-ms-wmv', 'video/x-flv', 'video/webm', 'video/x-matroska',
    // Images
    'image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml',
    // Documents
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', 'application/rtf'
  ];
}

/**
 * Validate file before upload
 */
export function validateFile(file: File, fileType: 'PDF' | 'VIDEO' | 'IMAGE' | 'DOCUMENT') {
  const errors: string[] = [];
  
  // Check file size
  const maxSize = MAX_FILE_SIZES[fileType];
  if (file.size > maxSize) {
    errors.push(`File size exceeds limit. Maximum allowed: ${formatFileSize(maxSize)}`);
  }
  
  // Check file extension
  const allowedExtensions = ALLOWED_FILE_TYPES[fileType];
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (!fileExtension || !allowedExtensions.includes(fileExtension as typeof allowedExtensions[number])) {
    errors.push(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Generate a safe file path for storage
 */
export function generateFilePath(originalName: string, bankName: string, category: string = 'general'): string {
  const timestamp = Date.now();
  const cleanBankName = bankName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const cleanCategory = category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
  const safeName = originalName.replace(/[^a-zA-Z0-9.]/g, '-').toLowerCase();
  
  return `bank-modules/${cleanBankName}/${cleanCategory}/${timestamp}-${safeName}`;
}

/**
 * Upload file directly to a known bucket without checking existence
 */
export async function uploadFileDirectly(
  file: File, 
  bucket: string,
  path: string,
  options: {
    validateFileType?: 'PDF' | 'VIDEO' | 'IMAGE' | 'DOCUMENT';
    upsert?: boolean;
  } = {}
) {
  try {
    // Validate file if type is specified
    if (options.validateFileType) {
      const validation = validateFile(file, options.validateFileType);
      if (!validation.isValid) {
        return {
          data: null,
          error: { message: validation.errors.join('; ') }
        };
      }
    }
    
    // Upload file directly to the bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: options.upsert || false
      });
    
    if (error) {
      // Provide more specific error messages
      let errorMessage = `Failed to upload file: ${error.message}`;
      
      if (error.message.includes('not found') || error.message.includes('does not exist')) {
        errorMessage = `Storage bucket '${bucket}' is not accessible. Please check your storage configuration.`;
      } else if (error.message.includes('policy') || error.message.includes('permission')) {
        errorMessage = `You don't have permission to upload to this storage bucket. Please ensure you are logged in.`;
      } else if (error.message.includes('size') || error.message.includes('large')) {
        errorMessage = `File is too large. Maximum size allowed: ${options.validateFileType === 'VIDEO' ? '500MB' : '50MB'}`;
      }
      
      return {
        data: null,
        error: { 
          message: errorMessage,
          details: error
        }
      };
    }
    
    return { data, error: null };
    
  } catch (error) {
    return {
      data: null,
      error: { 
        message: `Unexpected error during file upload: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error
      }
    };
  }
}

/**
 * Try multiple buckets in order until one works
 */
export async function uploadFileWithMultipleBuckets(
  file: File, 
  path: string,
  options: {
    validateFileType?: 'PDF' | 'VIDEO' | 'IMAGE' | 'DOCUMENT';
    upsert?: boolean;
  } = {}
): Promise<UploadResult> {
  
  // Try buckets in order of preference
  const bucketsToTry = [
    'user-uploads',     // Most likely to work (we created this)
    'temp-files',       // We created this too
    'rupeebee-assets',  // Existing bucket
    'community-images', // Existing bucket
    'profile-pictures'  // Existing bucket
  ];
  
  let lastError: UploadError | null = null;
  
  for (const bucket of bucketsToTry) {
    console.log(`Trying to upload to bucket: ${bucket}`);
    
    const result = await uploadFileDirectly(file, bucket, path, options);
    
    if (!result.error) {
      // Success! Return the result with the bucket name
      return { ...result, bucket };
    }
    
    lastError = result.error;
    console.warn(`Upload to ${bucket} failed:`, result.error.message);
  }
  
  // If all buckets failed, return the last error
  return {
    data: null,
    error: {
      message: `Upload failed to all available buckets. Last error: ${lastError?.message || 'Unknown error'}`,
      details: lastError
    }
  };
}
export async function uploadFileToStorage(
  file: File, 
  bucket: string, 
  path: string,
  options: {
    validateFileType?: 'PDF' | 'VIDEO' | 'IMAGE' | 'DOCUMENT';
    upsert?: boolean;
  } = {}
) {
  try {
    // Validate file if type is specified
    if (options.validateFileType) {
      const validation = validateFile(file, options.validateFileType);
      if (!validation.isValid) {
        return {
          data: null,
          error: { message: validation.errors.join('; ') }
        };
      }
    }
    
    // Upload file directly - let Supabase handle bucket existence
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        upsert: options.upsert || false
      });
    
    if (error) {
      // Provide more specific error messages
      let errorMessage = `Failed to upload file: ${error.message}`;
      
      if (error.message.includes('not found')) {
        errorMessage = `Storage bucket '${bucket}' is not accessible. Please check your storage configuration or contact support.`;
      } else if (error.message.includes('policy')) {
        errorMessage = `You don't have permission to upload to this storage bucket. Please check your authentication status.`;
      } else if (error.message.includes('size')) {
        errorMessage = `File is too large. Please check the file size limits.`;
      }
      
      return {
        data: null,
        error: { 
          message: errorMessage,
          details: error
        }
      };
    }
    
    return { data, error: null };
    
  } catch (error) {
    return {
      data: null,
      error: { 
        message: `Unexpected error during file upload: ${error instanceof Error ? error.message : 'Unknown error'}`,
        details: error
      }
    };
  }
}

/**
 * Get public URL for uploaded file
 */
export function getPublicFileUrl(bucket: string, path: string): string {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);
  
  return data.publicUrl;
}

/**
 * Delete file from storage
 */
export async function deleteFileFromStorage(bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .remove([path]);
  
  return { data, error };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Get file type from filename
 */
export function getFileType(filename: string): 'PDF' | 'VIDEO' | 'IMAGE' | 'DOCUMENT' | 'UNKNOWN' {
  const extension = '.' + filename.split('.').pop()?.toLowerCase();
  
  if (extension && ALLOWED_FILE_TYPES.PDF.includes(extension as typeof ALLOWED_FILE_TYPES.PDF[number])) return 'PDF';
  if (extension && ALLOWED_FILE_TYPES.VIDEO.includes(extension as typeof ALLOWED_FILE_TYPES.VIDEO[number])) return 'VIDEO';
  if (extension && ALLOWED_FILE_TYPES.IMAGE.includes(extension as typeof ALLOWED_FILE_TYPES.IMAGE[number])) return 'IMAGE';
  if (extension && ALLOWED_FILE_TYPES.DOCUMENT.includes(extension as typeof ALLOWED_FILE_TYPES.DOCUMENT[number])) return 'DOCUMENT';
  
  return 'UNKNOWN';
}
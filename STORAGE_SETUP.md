# Supabase Storage Setup & Troubleshooting Guide

## Overview

This guide helps you set up and troubleshoot Supabase storage for file uploads in the Banks Dashboard module.

## Quick Setup

### 1. Environment Variables

Ensure you have the following environment variables in your `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Run Storage Setup

```bash
npm run setup-storage
```

This will create the required storage buckets:
- `bank-modules` - For bank educational content (PDFs, videos)
- `user-uploads` - For user file uploads
- `temp-files` - For temporary file storage

### 3. Configure Storage Policies

Copy and run the following SQL in your Supabase SQL Editor:

```sql
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
```

## File Upload Specifications

### Supported File Types

#### PDFs
- **Extensions**: `.pdf`
- **Max Size**: 50MB
- **MIME Type**: `application/pdf`

#### Videos
- **Extensions**: `.mp4`, `.avi`, `.mov`, `.wmv`, `.flv`, `.webm`, `.mkv`
- **Max Size**: 500MB
- **MIME Types**: `video/mp4`, `video/avi`, `video/quicktime`, etc.

### Storage Structure

```
bank-modules/
├── bank-name/
│   ├── category/
│   │   ├── timestamp-filename.pdf
│   │   └── timestamp-filename.mp4
│   └── ...
└── ...
```

## Common Issues & Solutions

### 1. "Bucket not found" Error

**Symptoms**: Upload fails with "Bucket not found" message

**Solutions**:
1. Run the storage setup script: `npm run setup-storage`
2. Check if buckets exist in Supabase Dashboard > Storage
3. Manually create buckets if script fails:
   - Go to Supabase Dashboard > Storage
   - Create bucket named `bank-modules` with public access

### 2. "Unauthorized" Error

**Symptoms**: Upload fails with permission denied

**Solutions**:
1. Ensure user is authenticated before uploading
2. Check if storage policies are correctly set up
3. Verify the user has the correct role (bank role for bank modules)

### 3. File Too Large Error

**Symptoms**: Upload fails with file size error

**Solutions**:
1. Check file size limits in the table above
2. Compress large videos before uploading
3. Use appropriate file formats

### 4. Invalid File Type Error

**Symptoms**: Upload rejected due to file type

**Solutions**:
1. Ensure file has correct extension
2. Check if MIME type is in allowed list
3. Use supported file formats only

## Testing the Setup

### 1. Use the Test Component

Add the StorageTestComponent to any page to test the setup:

```tsx
import StorageTestComponent from '@/components/StorageTestComponent';

export default function TestPage() {
  return <StorageTestComponent />;
}
```

### 2. Manual Testing

1. Go to `/banks/dashboard`
2. Log in as a bank user
3. Navigate to "Upload" tab
4. Try uploading a PDF or video file
5. Check for any error messages

## File Organization

### Key Files

- `src/lib/storage.ts` - Storage utilities and validation
- `src/lib/storage-setup.ts` - Setup functions and SQL
- `src/components/banks/ModuleUploadForm.tsx` - Upload form component
- `scripts/setup-storage.js` - Setup script
- `src/components/StorageTestComponent.tsx` - Test component

### Environment Files

```
.env.local                    # Local environment variables
.env.example                  # Example environment file
```

## Security Considerations

### 1. File Validation
- All files are validated for type and size before upload
- Malicious file extensions are blocked
- MIME type validation prevents disguised files

### 2. Access Control
- Bank modules are publicly readable but require authentication to upload
- User uploads are private (users can only access their own files)
- Storage policies enforce these rules at the database level

### 3. File Naming
- Files are renamed with timestamps to prevent conflicts
- Special characters are sanitized in file paths
- Bank names and categories are sanitized for safe storage

## Performance Optimization

### 1. File Size Limits
- PDFs: 50MB max for reasonable loading times
- Videos: 500MB max for large educational content
- Consider CDN integration for large files

### 2. File Compression
- Encourage compressed video formats (MP4 with H.264)
- Use PDF optimization for smaller file sizes
- Consider implementing client-side compression

## Monitoring & Maintenance

### 1. Storage Usage
- Monitor storage usage in Supabase Dashboard
- Set up alerts for storage limits
- Implement cleanup for old temporary files

### 2. Error Tracking
- Check application logs for upload errors
- Monitor failed upload attempts
- Track user feedback on upload issues

## Support

If you encounter issues not covered in this guide:

1. Check Supabase project logs in the dashboard
2. Verify all environment variables are set correctly
3. Ensure your Supabase project has sufficient storage quota
4. Check the browser console for JavaScript errors

## API Reference

### Storage Functions

```typescript
// Upload file with validation
uploadFileToStorage(file, bucket, path, options)

// Get public URL for file
getPublicFileUrl(bucket, path)

// Validate file before upload
validateFile(file, fileType)

// Generate safe file path
generateFilePath(originalName, bankName, category)
```

For detailed API documentation, see the TypeScript definitions in `src/lib/storage.ts`.
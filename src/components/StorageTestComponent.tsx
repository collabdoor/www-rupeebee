'use client';

import { useState } from 'react';
import { uploadFileWithMultipleBuckets, getPublicFileUrl, validateFile, formatFileSize, getFileType } from '@/lib/storage';

export default function StorageTestComponent() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const runStorageTests = async () => {
    setIsLoading(true);
    const results: any[] = [];

    try {
      // Test 1: Check if buckets exist
      results.push({
        test: 'Bucket Existence Check',
        status: 'running',
        message: 'Checking if storage buckets exist...'
      });

      // We can't directly check bucket existence from client, but we can test upload
      results[results.length - 1] = {
        test: 'Bucket Existence Check',
        status: 'info',
        message: 'Bucket check requires upload test'
      };

      // Test 2: File validation
      results.push({
        test: 'File Validation',
        status: 'running',
        message: 'Testing file validation logic...'
      });

      // Create a mock file for testing
      const mockPdfFile = new File(['test'], 'test.pdf', { type: 'application/pdf' });
      const mockVideoFile = new File(['test'], 'test.mp4', { type: 'video/mp4' });
      const mockLargeFile = new File([new ArrayBuffer(100 * 1024 * 1024)], 'large.pdf', { type: 'application/pdf' });

      const pdfValidation = validateFile(mockPdfFile, 'PDF');
      const videoValidation = validateFile(mockVideoFile, 'VIDEO');
      const largeValidation = validateFile(mockLargeFile, 'PDF');

      results[results.length - 1] = {
        test: 'File Validation',
        status: pdfValidation.isValid && videoValidation.isValid && !largeValidation.isValid ? 'success' : 'error',
        message: `PDF: ${pdfValidation.isValid ? '✅' : '❌'}, Video: ${videoValidation.isValid ? '✅' : '❌'}, Large file rejected: ${!largeValidation.isValid ? '✅' : '❌'}`
      };

      // Test 3: File type detection
      results.push({
        test: 'File Type Detection',
        status: 'running',
        message: 'Testing file type detection...'
      });

      const pdfType = getFileType('document.pdf');
      const videoType = getFileType('video.mp4');
      const unknownType = getFileType('file.xyz');

      results[results.length - 1] = {
        test: 'File Type Detection',
        status: pdfType === 'PDF' && videoType === 'VIDEO' && unknownType === 'UNKNOWN' ? 'success' : 'error',
        message: `PDF: ${pdfType}, Video: ${videoType}, Unknown: ${unknownType}`
      };

      // Test 4: File size formatting
      results.push({
        test: 'File Size Formatting',
        status: 'running',
        message: 'Testing file size formatting...'
      });

      const formattedSize = formatFileSize(1024 * 1024);
      results[results.length - 1] = {
        test: 'File Size Formatting',
        status: formattedSize === '1 MB' ? 'success' : 'error',
        message: `1MB formatted as: ${formattedSize}`
      };

      setTestResults([...results]);

    } catch (error) {
      results.push({
        test: 'Overall Test',
        status: 'error',
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsLoading(false);
      setTestResults(results);
    }
  };

  const uploadTestFile = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.pdf,video/*';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setIsLoading(true);
      const results = [...testResults];

      try {
        results.push({
          test: 'File Upload Test',
          status: 'running',
          message: `Uploading ${file.name} (${formatFileSize(file.size)})...`
        });
        setTestResults([...results]);

        const fileType = getFileType(file.name);
        const filePath = `test/${Date.now()}-${file.name}`;

        const { data, error, bucket: usedBucket } = await uploadFileWithMultipleBuckets(
          file,
          filePath,
          { validateFileType: fileType === 'PDF' ? 'PDF' : 'VIDEO' }
        );

        if (error) {
          results[results.length - 1] = {
            test: 'File Upload Test',
            status: 'error',
            message: `Upload failed: ${error.message}`
          };
        } else {
          const publicUrl = getPublicFileUrl(usedBucket!, filePath);
          results[results.length - 1] = {
            test: 'File Upload Test',
            status: 'success',
            message: `Upload successful! Bucket: ${usedBucket}, URL: ${publicUrl}`
          };
        }

      } catch (error) {
        results[results.length - 1] = {
          test: 'File Upload Test',
          status: 'error',
          message: `Upload error: ${error instanceof Error ? error.message : 'Unknown error'}`
        };
      } finally {
        setIsLoading(false);
        setTestResults([...results]);
      }
    };
    fileInput.click();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Storage System Test</h2>
        
        <div className="space-y-4 mb-6">
          <button
            onClick={runStorageTests}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Running Tests...' : 'Run Storage Tests'}
          </button>

          <button
            onClick={uploadTestFile}
            disabled={isLoading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed ml-4"
          >
            Test File Upload
          </button>
        </div>

        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Test Results:</h3>
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  result.status === 'success'
                    ? 'bg-green-50 border-green-200 text-green-800'
                    : result.status === 'error'
                    ? 'bg-red-50 border-red-200 text-red-800'
                    : result.status === 'running'
                    ? 'bg-blue-50 border-blue-200 text-blue-800'
                    : 'bg-gray-50 border-gray-200 text-gray-800'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{result.test}:</span>
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      result.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : result.status === 'error'
                        ? 'bg-red-100 text-red-800'
                        : result.status === 'running'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {result.status.toUpperCase()}
                  </span>
                </div>
                <p className="mt-2 text-sm">{result.message}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h4 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h4>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Make sure your Supabase environment variables are set in .env.local</li>
            <li>2. Run: <code className="bg-yellow-100 px-1 rounded">npm run setup-storage</code></li>
            <li>3. Execute the SQL policies in your Supabase dashboard</li>
            <li>4. Test file uploads using the button above</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
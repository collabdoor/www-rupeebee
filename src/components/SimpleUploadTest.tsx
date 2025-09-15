/**
 * Simple Upload Test Component
 * Test the API upload functionality directly in the browser
 */

'use client';

import { useState } from 'react';
import { uploadFileWithFallback } from '@/lib/upload-api';
import { formatFileSize } from '@/lib/storage';

export default function SimpleUploadTest() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setResult(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setResult(null);

    try {
      const result = await uploadFileWithFallback(
        file,
        'Test Bank',
        'Investment'
      );

      setResult(result);
    } catch (error) {
      setResult({
        error: { message: error instanceof Error ? error.message : 'Upload failed' }
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">🧪 Simple Upload Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select a PDF or Video file:
          </label>
          <input
            type="file"
            accept=".pdf,video/*"
            onChange={handleFileSelect}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {file && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Selected: <strong>{file.name}</strong> ({formatFileSize(file.size)})
            </p>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Test Upload'}
        </button>

        {result && (
          <div className="mt-4">
            {result.error ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <h3 className="font-semibold text-red-800">Upload Failed</h3>
                <p className="text-red-700 text-sm mt-1">{result.error.message}</p>
              </div>
            ) : (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800">Upload Successful! 🎉</h3>
                <div className="text-green-700 text-sm mt-2 space-y-1">
                  {result.publicUrl && (
                    <p>
                      <strong>File URL:</strong>{' '}
                      <a 
                        href={result.publicUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {result.publicUrl}
                      </a>
                    </p>
                  )}
                  {result.data?.path && (
                    <p><strong>Storage Path:</strong> {result.data.path}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="font-semibold text-blue-800 mb-2">How to test:</h4>
        <ol className="text-blue-700 text-sm space-y-1">
          <li>1. Start development server: <code>pnpm run dev</code></li>
          <li>2. Visit: <code>http://localhost:4000/test-upload</code></li>
          <li>3. Select a PDF or video file</li>
          <li>4. Click "Test Upload"</li>
        </ol>
      </div>
    </div>
  );
}
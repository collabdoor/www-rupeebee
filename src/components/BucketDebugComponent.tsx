'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BucketDebugComponent() {
  const [buckets, setBuckets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const checkBuckets = async () => {
    setLoading(true);
    setError('');
    
    try {
      const { data, error: bucketError } = await supabase.storage.listBuckets();
      
      if (bucketError) {
        setError(`Error listing buckets: ${bucketError.message}`);
      } else {
        setBuckets(data || []);
      }
    } catch (err) {
      setError(`Unexpected error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const testUpload = async (bucketName: string) => {
    try {
      const testContent = 'Test file content';
      const testFile = new Blob([testContent], { type: 'text/plain' });
      const testPath = `test-${Date.now()}.txt`;

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(testPath, testFile);

      if (error) {
        alert(`Upload to ${bucketName} failed: ${error.message}`);
      } else {
        alert(`Upload to ${bucketName} successful!`);
        
        // Clean up
        await supabase.storage.from(bucketName).remove([testPath]);
      }
    } catch (err) {
      alert(`Upload error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Storage Bucket Debug Tool</h2>
      
      <button
        onClick={checkBuckets}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
      >
        {loading ? 'Checking...' : 'Check Available Buckets'}
      </button>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {buckets.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Available Buckets:</h3>
          {buckets.map((bucket) => (
            <div key={bucket.id} className="border rounded p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{bucket.name}</h4>
                  <p className="text-sm text-gray-600">
                    ID: {bucket.id} | Public: {bucket.public ? 'Yes' : 'No'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Created: {new Date(bucket.created_at).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => testUpload(bucket.name)}
                  className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700"
                >
                  Test Upload
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
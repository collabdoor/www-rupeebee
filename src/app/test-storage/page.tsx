import BucketDebugComponent from '@/components/BucketDebugComponent';
import StorageTestComponent from '@/components/StorageTestComponent';

export default function StorageTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Storage System Testing</h1>
          <p className="text-gray-600">Debug and test the file upload functionality</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <BucketDebugComponent />
          <StorageTestComponent />
        </div>
      </div>
    </div>
  );
}
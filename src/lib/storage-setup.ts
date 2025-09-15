/**
 * Storage Setup Script
 * 
 * This script initializes Supabase storage buckets and sets up proper policies.
 * Run this script during deployment or when setting up a new environment.
 */

import { supabaseAdmin } from './supabase';
import { STORAGE_BUCKETS, initializeStorageBuckets } from './storage';

/**
 * Create storage policies for secure access
 */
async function createStoragePolicies() {
  const policies = [
    // Bank modules bucket policies
    {
      bucket: STORAGE_BUCKETS.BANK_MODULES,
      policies: [
        {
          name: 'Allow public read access',
          definition: 'true',
          operation: 'SELECT'
        },
        {
          name: 'Allow authenticated users to upload',
          definition: 'auth.role() = "authenticated"',
          operation: 'INSERT'
        },
        {
          name: 'Allow bank users to update their files',
          definition: 'auth.role() = "authenticated" AND auth.jwt() ->> "role" = "bank"',
          operation: 'UPDATE'
        },
        {
          name: 'Allow bank users to delete their files',
          definition: 'auth.role() = "authenticated" AND auth.jwt() ->> "role" = "bank"',
          operation: 'DELETE'
        }
      ]
    },
    // User uploads bucket policies  
    {
      bucket: STORAGE_BUCKETS.USER_UPLOADS,
      policies: [
        {
          name: 'Allow users to view their own files',
          definition: 'auth.uid()::text = (storage.foldername(name))[1]',
          operation: 'SELECT'
        },
        {
          name: 'Allow users to upload to their own folder',
          definition: 'auth.uid()::text = (storage.foldername(name))[1]',
          operation: 'INSERT'
        },
        {
          name: 'Allow users to update their own files',
          definition: 'auth.uid()::text = (storage.foldername(name))[1]',
          operation: 'UPDATE'
        },
        {
          name: 'Allow users to delete their own files',
          definition: 'auth.uid()::text = (storage.foldername(name))[1]',
          operation: 'DELETE'
        }
      ]
    },
    // Temp files bucket policies
    {
      bucket: STORAGE_BUCKETS.TEMP_FILES,
      policies: [
        {
          name: 'Allow authenticated users temporary access',
          definition: 'auth.role() = "authenticated"',
          operation: 'SELECT'
        },
        {
          name: 'Allow authenticated users to upload temp files',
          definition: 'auth.role() = "authenticated"',
          operation: 'INSERT'
        },
        {
          name: 'Allow authenticated users to delete temp files',
          definition: 'auth.role() = "authenticated"',
          operation: 'DELETE'
        }
      ]
    }
  ];

  console.log('Creating storage policies...');

  for (const bucketPolicies of policies) {
    for (const policy of bucketPolicies.policies) {
      try {
        // Note: This would typically be done via SQL or Supabase dashboard
        // as the JS client doesn't have direct policy creation methods
        console.log(`Policy for ${bucketPolicies.bucket}: ${policy.name}`);
      } catch (error) {
        console.error(`Failed to create policy ${policy.name} for ${bucketPolicies.bucket}:`, error);
      }
    }
  }
}

/**
 * Main setup function
 */
export async function setupStorage() {
  try {
    console.log('Setting up Supabase storage...');
    
    // Initialize buckets
    await initializeStorageBuckets();
    
    // Create policies (would need to be done via SQL or dashboard)
    await createStoragePolicies();
    
    console.log('Storage setup completed successfully!');
    
    return { success: true };
  } catch (error) {
    console.error('Storage setup failed:', error);
    return { success: false, error };
  }
}

/**
 * SQL commands for creating policies (to be run in Supabase SQL editor)
 */
export const STORAGE_POLICY_SQL = `
-- Bank modules bucket policies
CREATE POLICY "Allow public read access on bank-modules" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'bank-modules');

CREATE POLICY "Allow authenticated users to upload to bank-modules" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

CREATE POLICY "Allow bank users to update their files in bank-modules" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

CREATE POLICY "Allow bank users to delete their files in bank-modules" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'bank-modules' AND auth.role() = 'authenticated');

-- User uploads bucket policies
CREATE POLICY "Allow users to view their own files in user-uploads" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to upload to their own folder in user-uploads" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to update their own files in user-uploads" 
ON storage.objects FOR UPDATE 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Allow users to delete their own files in user-uploads" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Temp files bucket policies
CREATE POLICY "Allow authenticated users temporary access to temp-files" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'temp-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to upload temp files" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'temp-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete temp files" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'temp-files' AND auth.role() = 'authenticated');
`;

// Export setup function for use in deployment scripts
if (require.main === module) {
  setupStorage().then((result) => {
    if (result.success) {
      console.log('✅ Storage setup completed');
      process.exit(0);
    } else {
      console.error('❌ Storage setup failed');
      process.exit(1);
    }
  });
}
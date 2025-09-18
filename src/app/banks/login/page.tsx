'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmail } from '@/lib/supabase';
import UnifiedAuthForm, { type AuthField } from '@/components/auth/UnifiedAuthForm';
import { Mail, Building } from 'lucide-react';

export default function BankLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const authFields: AuthField[] = [
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter your bank email address',
      required: true,
      icon: <Mail size={18} />
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
      required: true
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setError('');

    try {
      const { data, error } = await signInWithEmail(formData.email, formData.password);
      
      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        // Check if user has bank role - this should be set in user metadata
        const userMetadata = data.user.user_metadata;
        const role = userMetadata?.role;
        
        if (role === 'bank') {
          router.push('/banks/dashboard');
        } else {
          setError('Access denied. This portal is for banks only.');
        }
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnifiedAuthForm
      title="Welcome back"
      subtitle="Sign in to your bank portal"
      fields={authFields}
      submitText="Sign In"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      logoText="RupeeBee"
      logoIcon={<Building className="text-white h-6 w-6" />}
      backgroundTitle="Banking Portal"
      backgroundSubtitle="Secure access to your financial learning platform and module management"
    />
  );
}

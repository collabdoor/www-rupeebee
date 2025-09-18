'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUpWithEmail } from '@/lib/supabase';
import UnifiedAuthForm, { type AuthField } from '@/components/auth/UnifiedAuthForm';
import { Mail, Building, User, Phone } from 'lucide-react';

export default function BankSignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const authFields: AuthField[] = [
    {
      name: 'bankName',
      label: 'Bank Name',
      type: 'text',
      placeholder: 'Enter your bank name',
      required: true,
      icon: <Building size={18} />
    },
    {
      name: 'contactPerson',
      label: 'Contact Person',
      type: 'text',
      placeholder: 'Enter contact person name',
      required: true,
      icon: <User size={18} />
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'Enter bank email address',
      required: true,
      icon: <Mail size={18} />
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: 'Enter phone number',
      required: true,
      icon: <Phone size={18} />
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter password (min 6 characters)',
      required: true
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
      required: true
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await signUpWithEmail(
        formData.email, 
        formData.password,
        {
          role: 'bank',
          bank_name: formData.bankName,
          contact_person: formData.contactPerson,
          phone: formData.phone
        }
      );
      
      if (error) {
        setError(error.message);
        return;
      }

      if (data.user) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/banks/login');
        }, 3000);
      }
    } catch {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Your bank account has been created successfully. Please check your email to verify your account.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to login page in 3 seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <UnifiedAuthForm
      title="Join RupeeBee"
      subtitle="Create your bank learning portal account"
      fields={authFields}
      submitText="Create Account"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      logoText="RupeeBee"
      logoIcon={<Building className="text-white h-6 w-6" />}
      backgroundTitle="Bank Registration"
      backgroundSubtitle="Partner with us to provide financial education to millions of users across India"
    />
  );
}
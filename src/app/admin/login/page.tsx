'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UnifiedAuthForm, { type AuthField } from '@/components/auth/UnifiedAuthForm';
import { Lock, Shield } from 'lucide-react';

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const authFields: AuthField[] = [
    {
      name: 'adminId',
      label: 'Admin ID',
      type: 'text',
      placeholder: 'Enter admin ID',
      required: true,
      icon: <Lock size={18} />
    },
    {
      name: 'psk',
      label: 'Pre-Shared Key',
      type: 'password',
      placeholder: 'Enter pre-shared key',
      required: true,
      icon: <Lock size={18} />
    }
  ];

  const handleSubmit = async (formData: Record<string, string>) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          adminId: formData.adminId, 
          psk: formData.psk 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem('admin_token', data.token);
        localStorage.setItem('admin_expires', data.expires_at.toString());
        
        // Redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UnifiedAuthForm
      title="RupeeBee Admin"
      subtitle="Secure access to admin dashboard"
      fields={authFields}
      submitText="Sign In"
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
      logoText="RupeeBee"
      logoIcon={<Shield className="text-white h-6 w-6" />}
      backgroundTitle="Admin Portal"
      backgroundSubtitle="Secure administrative access with comprehensive monitoring and session management for platform oversight"
    />
  );
}

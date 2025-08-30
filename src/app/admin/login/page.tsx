'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Lock, Shield, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [adminId, setAdminId] = useState('');
  const [psk, setPsk] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adminId, psk }),
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
    <div className="min-h-screen bg-gradient-to-br from-rupeebee-light-beige to-rupeebee-light-gray flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-rupeebee-medium-green rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-rupeebee-dark-text mb-2">
              RupeeBee Admin
            </h1>
            <p className="text-rupeebee-medium-text">
              Secure access to admin dashboard
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="admin-id" className="block text-sm font-medium text-rupeebee-dark-text mb-2">
                Admin ID
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rupeebee-medium-text w-4 h-4" />
                <Input
                  id="admin-id"
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="Enter admin ID"
                  className="pl-10 focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="psk" className="block text-sm font-medium text-rupeebee-dark-text mb-2">
                Pre-Shared Key
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rupeebee-medium-text w-4 h-4" />
                <Input
                  id="psk"
                  type={showPassword ? 'text' : 'password'}
                  value={psk}
                  onChange={(e) => setPsk(e.target.value)}
                  placeholder="Enter pre-shared key"
                  className="pl-10 pr-10 focus:ring-rupeebee-medium-green focus:border-rupeebee-medium-green"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-rupeebee-medium-text hover:text-rupeebee-dark-text"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading || !adminId || !psk}
              className="w-full bg-rupeebee-medium-green hover:bg-rupeebee-dark-green text-white py-2 px-4 rounded-lg disabled:opacity-50 font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </div>
              ) : (
                'Sign In'
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-rupeebee-light-beige rounded-lg">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-rupeebee-medium-green flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-rupeebee-dark-text mb-1">
                  Security Notice
                </h3>
                <p className="text-xs text-rupeebee-medium-text">
                  This is a secure admin area. Your session will automatically expire after 8 hours of inactivity. 
                  All actions are logged for security purposes.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-rupeebee-medium-text">
            © 2025 RupeeBee. Admin access is restricted and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}

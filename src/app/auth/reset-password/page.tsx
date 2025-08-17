'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function ResetPasswordContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'verifying' | 'reset-form' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const verifyResetToken = async () => {
      try {
        const token = searchParams.get('token')
        const type = searchParams.get('type')

        if (!token || type !== 'recovery') {
          setStatus('error')
          setErrorMessage('Invalid reset link')
          return
        }

        // Verify the recovery token and establish a session
        const { data, error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: 'recovery',
        })

        if (error) {
          console.error('Token verification error:', error)
          setStatus('error')
          setErrorMessage('Invalid or expired reset link')
          return
        }

        console.log('Verification successful:', data)

        // Check if we have a valid session
        if (!data.session || !data.user) {
          console.error('No session established:', data)
          setStatus('error')
          setErrorMessage('Failed to establish session')
          return
        }

        console.log('Session established for user:', data.user.email)
        // Token is valid and session is established, show reset form
        setStatus('reset-form')
      } catch (err) {
        console.error('Unexpected error:', err)
        setStatus('error')
        setErrorMessage('An unexpected error occurred')
      }
    }

    verifyResetToken()
  }, [searchParams])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long')
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    try {
      // Double-check that we have a valid session
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        setErrorMessage('Session expired. Please request a new password reset.')
        setIsLoading(false)
        return
      }

      // Update the user's password
      const { data, error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
        return
      }

      if (!data.user) {
        setErrorMessage('Failed to update password')
        setIsLoading(false)
        return
      }

      // Sign out after password update for security
      await supabase.auth.signOut()

      setStatus('success')
      
      // Redirect to app after 3 seconds
      setTimeout(() => {
        const redirectTo = searchParams.get('redirect_to')
        if (redirectTo && redirectTo.startsWith('com.rupeebee://')) {
          window.location.href = redirectTo
        } else {
          window.location.href = 'com.rupeebee://auth/callback'
        }
      }, 3000)
    } catch (err) {
      console.error('Password update error:', err)
      setErrorMessage('Failed to update password')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* RupeeBee Logo/Branding */}
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🐝</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">RupeeBee</h1>
        </div>

        {/* Status Content */}
        {status === 'verifying' && (
          <div>
            <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying reset link...</h2>
            <p className="text-gray-600">Please wait while we validate your request.</p>
          </div>
        )}

        {status === 'reset-form' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Reset Your Password</h2>
            <p className="text-gray-600 mb-6">Enter your new password below.</p>
            
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter new password"
                  required
                  minLength={6}
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1 text-left">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Confirm new password"
                  required
                  minLength={6}
                />
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-700">{errorMessage}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 disabled:from-gray-400 disabled:to-gray-400 text-white rounded-lg transition-all duration-200 font-medium"
              >
                {isLoading ? 'Updating Password...' : 'Update Password'}
              </button>
            </form>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Password Updated!</h2>
            <p className="text-gray-600 mb-4">Your password has been successfully updated.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Redirecting to RupeeBee app...</span>
                <br />
                <span className="text-blue-600">You&apos;ll be automatically redirected in 3 seconds.</span>
              </p>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-red-800 mb-2">Reset Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                Please try requesting a new password reset or contact support if the problem persists.
              </p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Go to Home
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Having trouble?{' '}
            <a href="mailto:support@rupeebee.com" className="text-blue-500 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}

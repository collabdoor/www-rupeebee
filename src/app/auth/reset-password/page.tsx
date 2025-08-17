'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

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
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* RupeeBee Logo */}
        <div className="text-center mb-8">
          <Image
            src="https://nufgvtezrxkvorztcwqo.supabase.co/storage/v1/object/public/rupeebee-assets/logo-variants/green-dark-logo.webp"
            alt="RupeeBee"
            width={80}
            height={80}
            className="mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-gray-800">RupeeBee</h1>
        </div>

        <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm">
          {/* Status Content */}
          {status === 'verifying' && (
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Verifying reset link</h2>
              <p className="text-gray-600">Please wait while we validate your request.</p>
            </div>
          )}

          {status === 'reset-form' && (
            <div>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Reset your password</h2>
                <p className="text-gray-600">Enter your new password below.</p>
              </div>
              
              <form onSubmit={handlePasswordReset} className="space-y-6">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter new password"
                    required
                    minLength={6}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Updating password...' : 'Update password'}
                </button>
              </form>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Password updated successfully!</h2>
              <p className="text-gray-600 mb-6">Your password has been successfully updated.</p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <span className="font-medium">Redirecting to RupeeBee app...</span>
                  <br />
                  <span className="text-green-700">You&apos;ll be automatically redirected in 3 seconds.</span>
                </p>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Reset failed</h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  Please try requesting a new password reset or contact support if the problem persists.
                </p>
              </div>
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Go to Home
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="mailto:official.collabdoor@gmail.com" className="text-green-600 hover:text-green-700 font-medium">
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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  )
}

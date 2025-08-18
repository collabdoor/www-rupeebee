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

  const getPasswordStrength = (pwd: string) => {
    if (pwd.length < 6) return { strength: 0, text: 'Too short', color: 'text-red-600' }
    if (pwd.length < 8) return { strength: 1, text: 'Weak', color: 'text-orange-600' }
    if (pwd.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)) return { strength: 3, text: 'Strong', color: 'text-green-600' }
    if (pwd.match(/^(?=.*[a-z])(?=.*[A-Z])|(?=.*[a-z])(?=.*\d)|(?=.*[A-Z])(?=.*\d)/)) return { strength: 2, text: 'Medium', color: 'text-yellow-600' }
    return { strength: 1, text: 'Weak', color: 'text-orange-600' }
  }

  const passwordStrength = getPasswordStrength(password)
  const isFormValid = password.length >= 6 && password === confirmPassword

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

      console.log('Password updated successfully, user data:', data)

      // Get fresh session data after password update
      const { data: sessionData } = await supabase.auth.getSession()
      
      // Extract authentication session data
      const extractAuthSession = () => {
        const authParams = new URLSearchParams()
        
        if (sessionData.session?.access_token) {
          authParams.set('access_token', sessionData.session.access_token)
        }
        if (sessionData.session?.refresh_token) {
          authParams.set('refresh_token', sessionData.session.refresh_token)
        }
        authParams.set('type', 'recovery')
        authParams.set('user_id', data.user.id)
        
        return authParams.toString()
      }

      const authParams = extractAuthSession()
      console.log('Auth parameters for deep link:', authParams)

      setStatus('success')
      
      // Redirect to app after 2 seconds with auth parameters
      setTimeout(() => {
        const deepLink = `com.rupeebee://auth/callback#${authParams}`
        console.log('Redirecting to:', deepLink)
        
        window.location.href = deepLink
        
        // Fallback message if app doesn't open after 3 seconds
        setTimeout(() => {
          setStatus('error')
          setErrorMessage('App did not open automatically. Please open RupeeBee manually to complete login.')
        }, 3000)
      }, 2000)
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      password && password.length < 6 
                        ? 'border-red-200 focus:ring-red-500 focus:border-transparent' 
                        : 'border-gray-200 focus:ring-green-500 focus:border-transparent'
                    }`}
                    placeholder="Enter new password (minimum 6 characters)"
                    required
                    minLength={6}
                  />
                  
                  {password && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className={passwordStrength.color}>
                          Password strength: {passwordStrength.text}
                        </span>
                        <span className="text-gray-500">{password.length}/∞</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            passwordStrength.strength === 0 ? 'bg-red-500 w-1/4' :
                            passwordStrength.strength === 1 ? 'bg-orange-500 w-2/4' :
                            passwordStrength.strength === 2 ? 'bg-yellow-500 w-3/4' :
                            'bg-green-500 w-full'
                          }`}
                        />
                      </div>
                    </div>
                  )}
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
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                      confirmPassword && password !== confirmPassword
                        ? 'border-red-200 focus:ring-red-500 focus:border-transparent'
                        : 'border-gray-200 focus:ring-green-500 focus:border-transparent'
                    }`}
                    placeholder="Confirm new password"
                    required
                    minLength={6}
                  />
                  {confirmPassword && password !== confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                  )}
                  {confirmPassword && password === confirmPassword && password.length >= 6 && (
                    <p className="mt-1 text-sm text-green-600">✓ Passwords match</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium mb-2">Password requirements:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className={`flex items-center ${password.length >= 6 ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className="mr-2">{password.length >= 6 ? '✓' : '○'}</span>
                      At least 6 characters long
                    </li>
                    <li className={`flex items-center ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className="mr-2">{password.length >= 8 ? '✓' : '○'}</span>
                      8+ characters recommended
                    </li>
                    <li className={`flex items-center ${password.match(/[A-Z]/) ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className="mr-2">{password.match(/[A-Z]/) ? '✓' : '○'}</span>
                      Include uppercase letter (recommended)
                    </li>
                    <li className={`flex items-center ${password.match(/\d/) ? 'text-green-600' : 'text-gray-500'}`}>
                      <span className="mr-2">{password.match(/\d/) ? '✓' : '○'}</span>
                      Include number (recommended)
                    </li>
                  </ul>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <p className="text-sm text-red-700">{errorMessage}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Updating password...
                    </span>
                  ) : (
                    'Update password'
                  )}
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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Password reset successful!</h2>
              <p className="text-gray-600 mb-6">Your password has been successfully updated.</p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm">
                  <span className="font-medium">Logging you in...</span>
                  <br />
                  <span className="text-green-700">Redirecting to RupeeBee with your new credentials...</span>
                </p>
              </div>
              
              {/* Manual redirect button */}
              <button
                onClick={async () => {
                  const { data: sessionData } = await supabase.auth.getSession()
                  const authParams = new URLSearchParams()
                  
                  if (sessionData.session?.access_token) {
                    authParams.set('access_token', sessionData.session.access_token)
                  }
                  if (sessionData.session?.refresh_token) {
                    authParams.set('refresh_token', sessionData.session.refresh_token)
                  }
                  authParams.set('type', 'recovery')
                  
                  window.location.href = `com.rupeebee://auth/callback#${authParams.toString()}`
                }}
                className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors mb-4"
              >
                Open RupeeBee App
              </button>
              
              <button
                onClick={() => router.push('/')}
                className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
              >
                Go to Home
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                {errorMessage.includes('App did not open') ? 'Login Ready!' : 'Reset Failed'}
              </h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <div className={`${errorMessage.includes('App did not open') ? 'bg-yellow-50 border-yellow-100' : 'bg-red-50 border-red-100'} border rounded-lg p-4 mb-6`}>
                <p className={`${errorMessage.includes('App did not open') ? 'text-yellow-800' : 'text-red-800'} text-sm`}>
                  {errorMessage.includes('App did not open') 
                    ? 'Your password was successfully reset! Please manually open the RupeeBee app to complete login.' 
                    : errorMessage.includes('expired') || errorMessage.includes('Invalid')
                      ? 'Please request a new password reset link from the app or website.'
                      : 'Please try again or contact support if the problem persists.'
                  }
                </p>
              </div>
              
              {errorMessage.includes('App did not open') ? (
                <div className="space-y-3">
                  <button
                    onClick={async () => {
                      const { data: sessionData } = await supabase.auth.getSession()
                      const authParams = new URLSearchParams()
                      
                      if (sessionData.session?.access_token) {
                        authParams.set('access_token', sessionData.session.access_token)
                      }
                      if (sessionData.session?.refresh_token) {
                        authParams.set('refresh_token', sessionData.session.refresh_token)
                      }
                      authParams.set('type', 'recovery')
                      
                      window.location.href = `com.rupeebee://auth/callback#${authParams.toString()}`
                    }}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Opening RupeeBee Again
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Go to Home
                  </button>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-left">
                    <p className="text-sm text-gray-700 font-medium mb-1">Can't find the app?</p>
                    <p className="text-sm text-gray-600">Download RupeeBee from the App Store or Google Play Store, then try the button above.</p>
                  </div>
                </div>
              ) : errorMessage.includes('expired') || errorMessage.includes('Invalid') ? (
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.href = 'com.rupeebee://auth/reset-password'}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Request New Password Reset
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Go to Home
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => window.location.reload()}
                    className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={() => router.push('/')}
                    className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
                  >
                    Go to Home
                  </button>
                </div>
              )}
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

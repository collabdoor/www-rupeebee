'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = searchParams.get('token')
        const type = searchParams.get('type')
        const redirectTo = searchParams.get('redirect_to')

        if (!token || !type) {
          setStatus('error')
          setErrorMessage('Missing verification token or type')
          return
        }

        // Verify the OTP token
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: type as 'signup' | 'email_change' | 'recovery' | 'invite' | 'magiclink',
        })

        if (error) {
          console.error('Verification error:', error)
          setStatus('error')
          setErrorMessage(error.message || 'Verification failed')
          return
        }

        // Success! Show success message and redirect
        setStatus('success')

        // Redirect after 2 seconds
        setTimeout(() => {
          if (redirectTo && redirectTo.startsWith('com.rupeebee://')) {
            // Deep link back to the app
            window.location.href = redirectTo
          } else {
            // Fallback redirect (shouldn't happen in normal flow)
            router.push('/')
          }
        }, 2000)
      } catch (err) {
        console.error('Unexpected error:', err)
        setStatus('error')
        setErrorMessage('An unexpected error occurred')
      }
    }

    verifyEmail()
  }, [searchParams, router])

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
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Verifying your email...</h2>
            <p className="text-gray-600">Please wait while we confirm your email address.</p>
          </div>
        )}

        {status === 'success' && (
          <div>
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-green-800 mb-2">Email Verified!</h2>
            <p className="text-gray-600 mb-4">Your email has been successfully verified.</p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <span className="font-medium">Redirecting to RupeeBee app...</span>
                <br />
                <span className="text-blue-600">You&apos;ll be automatically redirected in 2 seconds.</span>
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
            <h2 className="text-xl font-semibold text-red-800 mb-2">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-700">
                Please try signing up again or contact support if the problem persists.
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
        <div className="mt-8 pt-6 border-t border-gray-200">            <p className="text-xs text-gray-500">
              Having trouble? Contact us at{' '}
              <a href="mailto:support@rupeebee.com" className="text-blue-500 hover:underline">
                support@rupeebee.com
              </a>
            </p>
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>}>
      <VerifyContent />
    </Suspense>
  )
}

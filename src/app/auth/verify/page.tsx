'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

function VerifyContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = searchParams.get('token')
        const type = searchParams.get('type')
        const redirectTo = searchParams.get('redirect_to')

        if (!token || !type) {
          setStatus('error')
          setErrorMessage('Missing verification token or type')
          return
        }

        // Handle password recovery - redirect to reset password page
        if (type === 'recovery') {
          const resetUrl = `/auth/reset-password?token=${token}&type=${type}&redirect_to=${redirectTo || 'com.rupeebee://auth/callback'}`
          router.push(resetUrl)
          return
        }

        // Verify the OTP token (for signup, email_change, etc.)
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

    verifyToken()
  }, [searchParams, router])

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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Verifying your email</h2>
              <p className="text-gray-600">Please wait while we confirm your email address.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Email verified successfully!</h2>
              <p className="text-gray-600 mb-6">Your email has been successfully verified.</p>
              <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  <span className="font-medium">Redirecting to RupeeBee app...</span>
                  <br />
                  <span className="text-green-700">You&apos;ll be automatically redirected in 2 seconds.</span>
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
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Verification failed</h2>
              <p className="text-gray-600 mb-6">{errorMessage}</p>
              <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
                <p className="text-red-800 text-sm">
                  Please try signing up again or contact support if the problem persists.
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

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}

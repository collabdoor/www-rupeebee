'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { supabase } from '@/lib/supabase'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Processing authentication...')

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Handle the OAuth callback
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
          return
        }

        if (data.session) {
          // User is successfully authenticated
          setStatus('success')
          setMessage('Successfully signed in!')

          // Check if we have a return URL stored
          const returnUrl = localStorage.getItem('auth_return_url')
          localStorage.removeItem('auth_return_url')

          // Start countdown timer
          const timer = setInterval(() => {
            setCountdown((prev) => {
              if (prev <= 1) {
                clearInterval(timer)
                
                // If this was from the write review page, redirect back there
                if (returnUrl && returnUrl.includes('/reviews/write')) {
                  router.push(returnUrl)
                } else {
                  // Otherwise, redirect to home
                  router.push('/')
                }
                return 0
              }
              return prev - 1
            })
          }, 1000)

          return () => clearInterval(timer)
        } else {
          // No session found, something went wrong
          setStatus('error')
          setMessage('Authentication failed. Please try again.')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        setStatus('error')
        setMessage('Authentication failed. Please try again.')
      }
    }

    handleAuthCallback()
  }, [router])

  const handleManualRedirect = () => {
    const returnUrl = localStorage.getItem('auth_return_url')
    localStorage.removeItem('auth_return_url')
    
    if (returnUrl && returnUrl.includes('/reviews/write')) {
      router.push(returnUrl)
    } else {
      router.push('/')
    }
  }

  const handleGoHome = () => {
    router.push('/')
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

        <div className="bg-white border border-gray-100 rounded-lg p-8 shadow-sm text-center">
          {status === 'loading' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-50 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{message}</h2>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{message}</h2>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-sm mb-2">
                  <span className="font-medium">Redirecting in {countdown} seconds</span>
                </p>
                <p className="text-green-700 text-xs">
                  You&apos;ll be redirected to continue where you left off.
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleManualRedirect}
                  className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Continue Now
                </button>

                <button
                  onClick={handleGoHome}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="w-16 h-16 mx-auto mb-6 bg-red-50 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-6">{message}</h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/reviews/write')}
                  className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>

                <button
                  onClick={handleGoHome}
                  className="w-full px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-200 hover:border-gray-300 rounded-lg font-medium transition-colors"
                >
                  Go to Home
                </button>
              </div>
            </>
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

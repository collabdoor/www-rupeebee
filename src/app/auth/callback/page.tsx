'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          // Try to open the app, fallback to home
          window.location.href = 'com.rupeebee://auth/callback?verification=success&type=callback'
          setTimeout(() => {
            router.push('/')
          }, 1000)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

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
          <div className="w-16 h-16 mx-auto mb-6 bg-green-50 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 12l0 0" />
            </svg>
          </div>
          
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Opening RupeeBee app...</h2>
          
          <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
            <p className="text-green-800 text-sm mb-2">
              <span className="font-medium">Redirecting in {countdown} seconds</span>
            </p>
            <p className="text-green-700 text-xs">
              If the app doesn&apos;t open automatically, please open RupeeBee manually.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => {
                window.location.href = 'com.rupeebee://auth/callback?verification=success&type=callback'
              }}
              className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
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

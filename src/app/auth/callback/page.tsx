'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
          window.location.href = 'com.rupeebee://auth/callback'
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">🐝</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">RupeeBee</h1>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Opening RupeeBee App...</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-700 mb-2">
              <span className="font-medium">Redirecting in {countdown} seconds</span>
            </p>
            <p className="text-sm text-blue-600">
              If the app doesn&apos;t open automatically, please open RupeeBee manually.
            </p>
          </div>
          
          <button
            onClick={() => {
              window.location.href = 'com.rupeebee://auth/callback'
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-yellow-500 hover:from-blue-600 hover:to-yellow-600 text-white rounded-lg transition-all duration-200 font-medium"
          >
            Open RupeeBee App
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Having trouble?{' '}
            <button
              onClick={() => router.push('/')}
              className="text-blue-500 hover:underline"
            >
              Go to Home
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

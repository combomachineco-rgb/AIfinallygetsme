'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getUser, createClient } from '@/lib/supabase'

export default function CheckoutPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isCheckingPayment, setIsCheckingPayment] = useState(true)
  const [alreadyPaid, setAlreadyPaid] = useState(false)

  useEffect(() => {
    const checkAuthAndPayment = async () => {
      try {
        const user = await getUser()
        if (!user) {
          router.push('/login')
          return
        }
        setIsCheckingAuth(false)

        // Check if user already paid
        const supabase = createClient()
        const { data, error: fetchError } = await supabase
          .from('users')
          .select('payment_status')
          .eq('id', user.id)
          .single()

        if (fetchError) {
          console.error('Error checking payment status:', fetchError)
        } else if (data?.payment_status === 'paid') {
          setAlreadyPaid(true)
          router.push('/questions')
          return
        }

        setIsCheckingPayment(false)
      } catch (err) {
        setError('Failed to verify authentication')
        setIsCheckingAuth(false)
        setIsCheckingPayment(false)
      }
    }
    checkAuthAndPayment()
  }, [router])

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      // TODO: Call /api/create-checkout endpoint
      // const response = await fetch('/api/create-checkout', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      // })
      // const { url } = await response.json()
      // window.location.href = url

      setError('Stripe integration pending')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (isCheckingAuth || isCheckingPayment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">Complete Your Purchase</h1>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/50 border border-red-500 rounded-md">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Product Details */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-white mb-2">
                <span className="text-gray-500 line-through text-2xl mr-2">$49</span>
                $20
              </p>
              <p className="text-gray-400 text-sm">Launch pricing - limited to first 500</p>
              <p className="text-gray-400 mt-2">One-time payment. No subscription.</p>
            </div>

            <div className="bg-gray-700 rounded-md p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4">What's Included:</h2>
              <ul className="space-y-2 text-gray-300">
                <li>✅ Detailed base profile with your preferences</li>
                <li>✅ 5-10 expert personas you choose</li>
                <li>✅ Works with ChatGPT, Claude, Gemini, any AI</li>
                <li>✅ Lifetime account access</li>
                <li>✅ Copy-paste ready, use immediately</li>
                <li>✅ 7-day money-back guarantee</li>
              </ul>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-6 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
            >
              {loading ? 'Processing...' : 'Stripe integration pending'}
            </button>
            <p className="text-sm text-gray-400 mb-2">
              ✓ Secure payment via Stripe
            </p>
            <p className="text-sm text-gray-500">
              Not sure? Try risk-free. Full refund within 7 days. Keep the personas either way.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}


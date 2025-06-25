'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { generateAnonymousName } from '@/lib/auth-helpers'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Check terms acceptance for signup
    if (mode === 'signup' && !acceptedTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to create an account.')
      setLoading(false)
      return
    }

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        })

        if (error) throw error

        if (data.user) {
          // Create profile with anonymous display name
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email,
              anonymous_display_name: displayName || generateAnonymousName(),
              role: 'worker' // Default role
            })

          if (profileError) {
            console.error('Profile creation error:', profileError)
            throw profileError
          }
        }

        alert('Check your email for verification link!')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error
        router.push('/dashboard')
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {mode === 'signin' ? 'Sign In' : 'Sign Up'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-1">
              Anonymous Display Name (Optional)
            </label>
            <input
              type="text"
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="e.g., Anonymous Server 123"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            />
            <p className="text-xs text-gray-500 mt-1">
              Leave blank for auto-generated name. You can change this later.
            </p>
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
          />
        </div>

        {mode === 'signup' && (
          <div className="space-y-3">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                className="mt-0.5 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                required
              />
              <label htmlFor="acceptTerms" className="ml-3 text-sm text-gray-700">
                I agree to the{' '}
                <a href="/terms" target="_blank" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="/privacy" target="_blank" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>
            <p className="text-xs text-gray-500 ml-7">
              We prioritize worker anonymity and will never share your personal information with employers.
            </p>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded p-3">{error}</div>
        )}

        <button
          type="submit"
          disabled={loading || (mode === 'signup' && !acceptedTerms)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        {mode === 'signin' ? (
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <a href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Sign in
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
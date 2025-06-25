'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const [signingOut, setSigningOut] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    if (signingOut) return // Prevent double clicks
    
    try {
      setSigningOut(true)
      console.log('Starting sign out process...')
      
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        throw error
      }
      
      console.log('Sign out successful, redirecting...')
      // Force a full page refresh to clear all state
      window.location.href = '/'
    } catch (error) {
      console.error('Failed to sign out:', error)
      // Try to redirect anyway
      window.location.href = '/'
    }
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome back!
        </span>
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {signingOut ? 'Signing Out...' : 'Sign Out'}
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href="/auth/signin"
        className="text-gray-600 hover:text-gray-800 text-sm"
      >
        Sign In
      </a>
      <a
        href="/auth/signup"
        className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
      >
        Sign Up
      </a>
    </div>
  )
}
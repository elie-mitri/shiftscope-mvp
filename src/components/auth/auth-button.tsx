'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'

interface AuthButtonProps {
  user: User | null
}

export function AuthButton({ user }: AuthButtonProps) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          Welcome back!
        </span>
        <button
          onClick={handleSignOut}
          className="bg-gray-600 text-white px-4 py-2 rounded-md text-sm hover:bg-gray-700"
        >
          Sign Out
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
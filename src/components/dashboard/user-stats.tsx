// src/components/dashboard/user-stats.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface UserStats {
  totalReviews: number
  averageRating: number
}

export function UserStats() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    async function fetchUserData() {
      try {
        setLoading(true)
        setError(null)

        // Check authentication
        const supabase = createClient()
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError || !user) {
          setIsAuthenticated(false)
          return
        }

        setIsAuthenticated(true)
        setUserEmail(user.email)

        // Fetch user reviews and stats
        const response = await fetch('/api/user/reviews')
        
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }

        const data = await response.json()
        setStats(data.stats)

      } catch (err) {
        console.error('Error fetching user data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load user data')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="space-y-3">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <div className="mb-4">
          <span className="text-6xl">🔒</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sign In Required
        </h3>
        <p className="text-gray-600 mb-6">
          Please sign in to view your dashboard
        </p>
        <Link
          href="/auth/signin"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Sign In
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  const getStarDisplay = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile</h3>
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-700">Email:</span>
            <p className="text-gray-900">{userEmail}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-700">Member since:</span>
            <p className="text-gray-900">Recently joined</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Stats</h3>
        
        {stats && stats.totalReviews > 0 ? (
          <div className="space-y-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {stats.totalReviews}
              </div>
              <div className="text-sm text-gray-600">
                Review{stats.totalReviews !== 1 ? 's' : ''} Written
              </div>
            </div>
            
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="flex justify-center mb-2">
                {getStarDisplay(stats.averageRating)}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stats.averageRating}/5
              </div>
              <div className="text-sm text-gray-600">
                Average Rating Given
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="mb-4">
              <span className="text-4xl">📝</span>
            </div>
            <p className="text-gray-600 mb-4">
              You haven&apos;t written any reviews yet
            </p>
            <Link
              href="/restaurants"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Browse Restaurants
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
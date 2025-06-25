// src/components/dashboard/user-reviews.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Restaurant {
  id: string
  name: string
  address: string
  neighborhood: string
  borough: string
  cuisine_type: string
}

interface UserReview {
  id: string
  overall_rating: number
  review_text: string | null
  worker_role: string | null
  created_at: string
  restaurants: Restaurant
}

export function UserReviews() {
  const [reviews, setReviews] = useState<UserReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    async function fetchUserReviews() {
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

        // Fetch user reviews
        const response = await fetch('/api/user/reviews')
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }

        const data = await response.json()
        setReviews(data.reviews)

      } catch (err) {
        console.error('Error fetching user reviews:', err)
        setError(err instanceof Error ? err.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchUserReviews()
  }, [])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStarDisplay = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ))
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h3>
        <p className="text-gray-600">Please sign in to view your reviews</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Reviews</h3>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Your Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h3>
        <Link
          href="/restaurants"
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Write New Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <span className="text-6xl">📝</span>
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            No reviews yet
          </h4>
          <p className="text-gray-600 mb-6">
            Start by reviewing a restaurant where you&apos;ve worked
          </p>
          <Link
            href="/restaurants"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Restaurants
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
            >
              {/* Restaurant Info */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Link
                    href={`/restaurants/${review.restaurants.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {review.restaurants.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {review.restaurants.neighborhood}, {review.restaurants.borough}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center">
                    {getStarDisplay(review.overall_rating)}
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {review.overall_rating}/5
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDate(review.created_at)}
                  </div>
                </div>
              </div>

              {/* Review Content */}
              {review.review_text && (
                <div className="mb-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.review_text.length > 200 
                      ? `${review.review_text.substring(0, 200)}...` 
                      : review.review_text
                    }
                  </p>
                </div>
              )}

              {/* Review Details */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <div className="flex items-center gap-3">
                  {review.worker_role && (
                    <span className="bg-gray-100 rounded-full px-2 py-1">
                      {review.worker_role}
                    </span>
                  )}
                </div>
                
                <Link
                  href={`/restaurants/${review.restaurants.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Restaurant →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
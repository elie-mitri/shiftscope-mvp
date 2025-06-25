// src/components/admin/admin-reviews.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface Restaurant {
  id: string
  name: string
  neighborhood: string
  borough: string
}

interface AdminReview {
  id: string
  overall_rating: number
  review_text: string | null
  worker_role: string | null
  flagged: boolean
  created_at: string
  restaurant: Restaurant
}

export function AdminReviews() {
  const [reviews, setReviews] = useState<AdminReview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [showFlagged, setShowFlagged] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchReviews()
  }, [showFlagged])

  async function fetchReviews() {
    try {
      setLoading(true)
      setError(null)

      // Check authentication first
      const supabase = createClient()
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError || !user) {
        setIsAdmin(false)
        return
      }

      // Fetch reviews
      const params = new URLSearchParams()
      if (showFlagged) params.set('flagged', 'true')
      
      const response = await fetch(`/api/admin/reviews?${params.toString()}`)
      
      if (response.status === 403) {
        setIsAdmin(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch reviews')
      }

      setIsAdmin(true)
      const data = await response.json()
      setReviews(data.reviews)

    } catch (err) {
      console.error('Error fetching reviews:', err)
      setError(err instanceof Error ? err.message : 'Failed to load reviews')
    } finally {
      setLoading(false)
    }
  }

  async function handleReviewAction(reviewId: string, action: 'flag' | 'unflag' | 'delete') {
    try {
      setActionLoading(reviewId)
      
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} review`)
      }

      // Refresh the reviews list
      await fetchReviews()

    } catch (err) {
      console.error(`Error ${action}ing review:`, err)
      setError(err instanceof Error ? err.message : `Failed to ${action} review`)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Moderation</h2>
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

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Moderation</h2>
        <p className="text-gray-600">Admin access required</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Moderation</h2>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Review Moderation</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchReviews()}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
          <span className="text-xs text-gray-500">
            (Flagging system coming soon)
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <span className="text-6xl">✅</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {showFlagged ? 'No flagged reviews' : 'No recent reviews'}
          </h3>
          <p className="text-gray-600">
            {showFlagged 
              ? 'All reviews are clean and approved.'
              : 'No recent review activity to moderate.'
            }
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              {/* Review Header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <Link
                    href={`/restaurants/${review.restaurant.id}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    {review.restaurant.name}
                  </Link>
                  <p className="text-sm text-gray-600">
                    {review.restaurant.neighborhood}, {review.restaurant.borough}
                  </p>
                  <div className="flex items-center mt-1">
                    {getStarDisplay(review.overall_rating)}
                    <span className="ml-2 text-sm text-gray-600">
                      {formatDate(review.created_at)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              {review.review_text && (
                <div className="mb-3">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {review.review_text}
                  </p>
                </div>
              )}

              {/* Review Details & Actions */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {review.worker_role && (
                    <span className="bg-gray-100 rounded-full px-2 py-1">
                      {review.worker_role}
                    </span>
                  )}
                  <span>ID: {review.id.slice(0, 8)}...</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleReviewAction(review.id, 'flag')}
                    disabled={actionLoading === review.id}
                    className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded hover:bg-yellow-200 disabled:opacity-50"
                  >
                    {actionLoading === review.id ? 'Loading...' : 'Flag'}
                  </button>
                  
                  <button
                    onClick={() => handleReviewAction(review.id, 'delete')}
                    disabled={actionLoading === review.id}
                    className="px-3 py-1 bg-red-100 text-red-800 text-xs rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    {actionLoading === review.id ? 'Loading...' : 'Note Issue'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
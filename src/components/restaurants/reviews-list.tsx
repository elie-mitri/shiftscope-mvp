// src/components/restaurants/reviews-list.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Review } from '@/lib/types'

interface ReviewsListProps {
  restaurantId: string
}

interface ReviewWithProfile extends Review {
  profiles?: {
    anonymous_display_name: string
  }
}

export function ReviewsList({ restaurantId }: ReviewsListProps) {
  const [reviews, setReviews] = useState<ReviewWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/restaurants/${restaurantId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }

        const data = await response.json()
        setReviews(data.restaurant.reviews || [])

      } catch (err) {
        console.error('Error fetching reviews:', err)
        setError(err instanceof Error ? err.message : 'Failed to load reviews')
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [restaurantId])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
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
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border-b border-gray-200 pb-6 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/6 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Reviews {reviews.length > 0 && `(${reviews.length})`}
        </h2>
        <Link
          href={`/reviews/new?restaurant=${restaurantId}`}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          Write a Review
        </Link>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <span className="text-6xl">💬</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No reviews yet
          </h3>
          <p className="text-gray-600 mb-6">
            Be the first to share your experience working at this restaurant.
          </p>
          <Link
            href={`/reviews/new?restaurant=${restaurantId}`}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write the First Review
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              {/* Review Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getStarDisplay(review.overall_rating)}
                    <span className="text-sm text-gray-600">
                      Overall Rating
                    </span>
                  </div>
                  <div className="text-sm text-gray-600">
                    By {review.profiles?.anonymous_display_name || 'Anonymous Worker'} • {formatDate(review.created_at)}
                  </div>
                </div>
                
                {review.worker_role && (
                  <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                    {review.worker_role}
                  </span>
                )}
              </div>

              {/* Review Content */}
              {review.review_text && (
                <div className="mb-4">
                  <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                </div>
              )}

              {/* Rating Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Management:</span>
                  <div className="flex items-center gap-1">
                    {getStarDisplay(review.management_rating)}
                    <span className="ml-1 font-medium">{review.management_rating}/5</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Work-Life Balance:</span>
                  <div className="flex items-center gap-1">
                    {getStarDisplay(review.work_life_balance_rating)}
                    <span className="ml-1 font-medium">{review.work_life_balance_rating}/5</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Pay & Tipping:</span>
                  <div className="flex items-center gap-1">
                    {getStarDisplay(review.pay_tipping_rating)}
                    <span className="ml-1 font-medium">{review.pay_tipping_rating}/5</span>
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Scheduling:</span>
                  <div className="flex items-center gap-1">
                    {getStarDisplay(review.scheduling_rating)}
                    <span className="ml-1 font-medium">{review.scheduling_rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Employment Details & Flag Button */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex gap-4 text-sm text-gray-600">
                  {(review.employment_status || review.hours_per_week) && (
                    <>
                      {review.employment_status && (
                        <span>Status: {review.employment_status}</span>
                      )}
                      {review.hours_per_week && (
                        <span>Hours/week: {review.hours_per_week}</span>
                      )}
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => {
                    // Simple flag action - could be enhanced with confirmation dialog
                    if (confirm('Flag this review as inappropriate?')) {
                      fetch(`/api/admin/reviews/${review.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ action: 'flag' })
                      }).then(() => {
                        alert('Review flagged for moderation')
                      }).catch(() => {
                        alert('Failed to flag review')
                      })
                    }
                  }}
                  className="text-xs text-gray-400 hover:text-red-600 transition-colors"
                  title="Flag as inappropriate"
                >
                  🚩 Flag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
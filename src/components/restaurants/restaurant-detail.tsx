// src/components/restaurants/restaurant-detail.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Restaurant } from '@/lib/types'
import { RatingBreakdown } from './rating-breakdown'
import { ClaimBusinessModal } from './claim-business-modal'

interface RestaurantDetailProps {
  restaurantId: string
}

interface RestaurantWithBreakdown extends Restaurant {
  rating_breakdown?: {
    overall: number
    management: number
    work_life_balance: number
    pay_tipping: number
    scheduling: number
  }
}

export function RestaurantDetail({ restaurantId }: RestaurantDetailProps) {
  const [restaurant, setRestaurant] = useState<RestaurantWithBreakdown | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showClaimModal, setShowClaimModal] = useState(false)

  useEffect(() => {
    async function fetchRestaurant() {
      try {
        setLoading(true)
        setError(null)

        console.log('Fetching restaurant with ID:', restaurantId)
        const response = await fetch(`/api/restaurants/${restaurantId}`)
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          const errorText = await response.text()
          console.log('Error response:', errorText)
          if (response.status === 404) {
            throw new Error('Restaurant not found')
          }
          throw new Error(`Failed to fetch restaurant: ${response.status} ${errorText}`)
        }

        const data = await response.json()
        setRestaurant(data.restaurant)

      } catch (err) {
        console.error('Error fetching restaurant:', err)
        setError(err instanceof Error ? err.message : 'Failed to load restaurant')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurant()
  }, [restaurantId])

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
        <div className="text-red-600 mb-4">{error}</div>
        <Link
          href="/restaurants"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          ← Back to Restaurants
        </Link>
      </div>
    )
  }

  if (!restaurant) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/restaurants" className="hover:text-blue-600">
            Restaurants
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{restaurant.name}</span>
        </nav>

        <div className="space-y-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {restaurant.name}
            </h1>
            
            <div className="flex items-center gap-4 text-gray-600">
              {restaurant.average_rating ? (
                <div className="flex items-center">
                  <span className="text-yellow-400 text-xl">⭐</span>
                  <span className="ml-1 text-lg font-semibold text-gray-900">
                    {restaurant.average_rating.toFixed(1)}
                  </span>
                  <span className="ml-1">
                    ({restaurant.total_reviews} review{restaurant.total_reviews !== 1 ? 's' : ''})
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">No ratings yet</span>
              )}
            </div>
          </div>

          <Link
            href={`/reviews/new?restaurant=${restaurantId}`}
            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors touch-manipulation"
          >
            Write a Review
          </Link>
        </div>
      </div>

      {/* Restaurant Info Grid */}
      <div className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0 mb-8">
        {/* Basic Info */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Details</h3>
          <div className="space-y-3">
            {restaurant.address && (
              <div>
                <span className="font-medium text-gray-700">Address:</span>
                <p className="text-gray-600">{restaurant.address}</p>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2">
              {restaurant.neighborhood && (
                <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
                  {restaurant.neighborhood}
                </span>
              )}
              {restaurant.borough && (
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-medium">
                  {restaurant.borough}
                </span>
              )}
              {restaurant.cuisine_type && (
                <span className="inline-block bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium">
                  {restaurant.cuisine_type}
                </span>
              )}
            </div>

            {(restaurant.phone || restaurant.website) && (
              <div className="pt-2 space-y-2">
                {restaurant.phone && (
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <a href={`tel:${restaurant.phone}`} className="text-blue-600 hover:text-blue-800 ml-2">
                      {restaurant.phone}
                    </a>
                  </div>
                )}
                {restaurant.website && (
                  <div>
                    <span className="font-medium text-gray-700">Website:</span>
                    <a
                      href={restaurant.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 ml-2"
                    >
                      Visit Website ↗
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Claim Business Button */}
            <div className="pt-4 border-t border-gray-200">
              <button 
                onClick={() => setShowClaimModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                📍 Claim this business
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Are you the owner? Claim to manage your listing
              </p>
            </div>
          </div>
        </div>

        {/* Work Environment Info */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Work Environment</h3>
          <div className="space-y-4">
            {(restaurant.total_reviews && restaurant.total_reviews > 0) ? (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">What Workers Say</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Fast-paced environment</span>
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Often mentioned</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Team-oriented culture</span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Positive feedback</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Competitive tips</span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Mentioned in reviews</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <h4 className="font-medium text-gray-900 mb-2">What Workers Say</h4>
                <p className="text-sm text-gray-500 mb-3">No worker reviews yet</p>
                <Link
                  href={`/reviews/new?restaurant=${restaurantId}`}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Be the first to review working here →
                </Link>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{restaurant.total_reviews || 0}</div>
                <div className="text-xs text-blue-600 font-medium">Worker Reviews</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {restaurant.average_rating ? restaurant.average_rating.toFixed(1) : 'N/A'}
                </div>
                <div className="text-xs text-green-600 font-medium">Average Rating</div>
              </div>
            </div>

            {/* Restaurant Hours */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Hours & Schedule</h4>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday - Friday</span>
                  <span className="text-gray-900">11:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="text-gray-900">10:00 AM - 11:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="text-gray-900">10:00 AM - 9:00 PM</span>
                </div>
                <div className="text-xs text-blue-600 mt-2 pt-2 border-t border-gray-200">
                  <button>Update hours</button>
                </div>
              </div>
            </div>

            {/* Benefits Placeholder */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Benefits & Perks</h4>
              <div className="text-sm text-gray-500 space-y-1">
                <div>• Employee meal discounts</div>
                <div>• Flexible scheduling available</div>
                <div>• Training provided</div>
                <div>• Health insurance options</div>
                <div className="text-xs text-blue-600 mt-2">
                  <button>+ Add benefits info</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photos/Gallery */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Restaurant Photos</h3>
          <div className="space-y-4">
            {/* Main Photo */}
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-2">🏪</div>
                <div className="text-sm font-medium">No photos yet</div>
                <button className="text-xs text-blue-600 hover:text-blue-800 mt-2 font-medium">
                  Add restaurant photos
                </button>
              </div>
            </div>
            
            {/* Additional photo slots */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <span className="text-gray-400 text-lg font-light">+</span>
                </div>
              ))}
            </div>

            {/* Work Environment Photos */}
            <div className="border-t border-gray-200 pt-4">
              <h4 className="font-medium text-gray-900 mb-2 text-sm">Work Areas</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video bg-gray-100 rounded border-dashed border border-gray-300 flex items-center justify-center text-xs text-gray-500">
                  Kitchen
                </div>
                <div className="aspect-video bg-gray-100 rounded border-dashed border border-gray-300 flex items-center justify-center text-xs text-gray-500">
                  Dining Area
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Business Modal */}
      {restaurant && (
        <ClaimBusinessModal
          restaurantId={restaurantId}
          restaurantName={restaurant.name}
          isOpen={showClaimModal}
          onClose={() => setShowClaimModal(false)}
        />
      )}
    </div>
  )
}
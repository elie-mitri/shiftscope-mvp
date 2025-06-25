// src/components/restaurants/restaurant-list.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Restaurant } from '@/lib/types'

export function RestaurantList() {
  const searchParams = useSearchParams()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRestaurants() {
      try {
        setLoading(true)
        setError(null)

        // Build query parameters
        const params = new URLSearchParams()
        
        const search = searchParams.get('search')
        const borough = searchParams.get('borough')
        const cuisine = searchParams.get('cuisine')
        const neighborhood = searchParams.get('neighborhood')

        if (search) params.set('search', search)
        if (borough) params.set('borough', borough)
        if (cuisine) params.set('cuisine_type', cuisine)
        if (neighborhood) params.set('neighborhood', neighborhood)

        const queryString = params.toString()
        const url = `/api/restaurants${queryString ? `?${queryString}` : ''}`

        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error('Failed to fetch restaurants')
        }

        const data = await response.json()
        setRestaurants(data.restaurants || [])

      } catch (err) {
        console.error('Error fetching restaurants:', err)
        setError('Failed to load restaurants. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [searchParams])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (restaurants.length === 0) {
    const hasFilters = Array.from(searchParams.entries()).length > 0
    
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <span className="text-6xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {hasFilters ? 'No restaurants found' : 'No restaurants yet'}
        </h3>
        <p className="text-gray-600 mb-4">
          {hasFilters 
            ? 'Try adjusting your search or filters to find more results.'
            : 'Be the first to add restaurants to ShiftScope!'
          }
        </p>
        {hasFilters && (
          <Link
            href="/restaurants"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Clear filters
          </Link>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-gray-600">
          Found {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurants.map((restaurant) => (
          <Link
            key={restaurant.id}
            href={`/restaurants/${restaurant.id}`}
            className="block bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-6 group"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                {restaurant.name}
              </h3>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm">Reviews available</span>
              </div>
            </div>

            {restaurant.address && (
              <p className="text-sm text-gray-600 mb-3">{restaurant.address}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-3">
              {restaurant.neighborhood && (
                <span className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-700">
                  {restaurant.neighborhood}
                </span>
              )}
              {restaurant.borough && (
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1 text-xs font-medium">
                  {restaurant.borough}
                </span>
              )}
              {restaurant.cuisine_type && (
                <span className="inline-block bg-green-100 text-green-800 rounded-full px-2 py-1 text-xs font-medium">
                  {restaurant.cuisine_type}
                </span>
              )}
            </div>

            <div className="text-sm text-gray-600">
              <span className="italic">Click to view reviews</span>
            </div>

            <div className="mt-3 text-sm text-blue-600 group-hover:text-blue-800">
              View details →
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
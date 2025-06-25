// src/components/home/popular-restaurants.tsx
'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Restaurant } from '@/lib/types'
import { SeedDataButton } from './seed-data-button'
import { TestConnection } from './test-connection'

export function PopularRestaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPopularRestaurants() {
      try {
        // Fetch restaurants sorted by rating and review count
        const response = await fetch('/api/restaurants')
        if (response.ok) {
          const data = await response.json()
          setRestaurants(data.restaurants || [])
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPopularRestaurants()
  }, [])

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Popular Restaurants
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Popular Restaurants
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Recently reviewed restaurants in NYC
          </p>
        </div>

        {restaurants.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {restaurants.slice(0, 6).map((restaurant) => (
              <Link
                key={restaurant.id}
                href={`/restaurants/${restaurant.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  {restaurant.average_rating ? (
                    <div className="flex items-center">
                      <span className="text-yellow-400">⭐</span>
                      <span className="ml-1 text-sm font-medium text-gray-700">
                        {restaurant.average_rating.toFixed(1)}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm">No ratings yet</span>
                    </div>
                  )}
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {restaurant.neighborhood && (
                    <span className="inline-block bg-gray-100 rounded-full px-2 py-1 mr-2">
                      {restaurant.neighborhood}
                    </span>
                  )}
                  {restaurant.cuisine_type && (
                    <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                      {restaurant.cuisine_type}
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  {restaurant.total_reviews && restaurant.total_reviews > 0 ? (
                    <span>{restaurant.total_reviews} review{restaurant.total_reviews !== 1 ? 's' : ''}</span>
                  ) : (
                    <span className="italic">No reviews yet</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-12 space-y-4">
            <TestConnection />
            <SeedDataButton />
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/restaurants"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            View All Restaurants →
          </Link>
        </div>
      </div>
    </section>
  )
}
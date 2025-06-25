// src/app/restaurants/page.tsx
import { Suspense } from 'react'
import { RestaurantList } from '@/components/restaurants/restaurant-list'
import { SearchAndFilters } from '@/components/restaurants/search-and-filters'

export default function RestaurantsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            NYC Restaurant Reviews
          </h1>
          <p className="text-gray-600">
            Discover what it&apos;s really like to work at restaurants across New York City
          </p>
        </div>

        <Suspense fallback={<div>Loading filters...</div>}>
          <SearchAndFilters />
        </Suspense>

        <Suspense fallback={<div>Loading restaurants...</div>}>
          <RestaurantList />
        </Suspense>
      </div>
    </div>
  )
}
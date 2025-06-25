// src/components/restaurants/search-and-filters.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const NYC_BOROUGHS = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island']
const CUISINE_TYPES = ['Pizza', 'Deli', 'Italian', 'Chinese', 'American', 'Mexican', 'Japanese', 'Greek', 'Middle Eastern', 'Steakhouse', 'Gastropub', 'Food Market']

export function SearchAndFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  const [selectedBorough, setSelectedBorough] = useState(searchParams.get('borough') || '')
  const [selectedCuisine, setSelectedCuisine] = useState(searchParams.get('cuisine') || '')
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(searchParams.get('neighborhood') || '')
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'newest')
  const [minRating, setMinRating] = useState(searchParams.get('min_rating') || '')
  const [hasReviews, setHasReviews] = useState(searchParams.get('has_reviews') === 'true')
  const [neighborhoods, setNeighborhoods] = useState<string[]>([])
  const [showAdvanced, setShowAdvanced] = useState(false)

  // Fetch available neighborhoods
  useEffect(() => {
    async function fetchNeighborhoods() {
      try {
        const response = await fetch('/api/restaurants')
        if (response.ok) {
          const data = await response.json()
          const uniqueNeighborhoods = [...new Set(
            data.restaurants
              ?.map((r: { neighborhood: string }) => r.neighborhood)
              .filter((n: string) => n)
              .sort()
          )]
          setNeighborhoods(uniqueNeighborhoods)
        }
      } catch (error) {
        console.error('Error fetching neighborhoods:', error)
      }
    }
    fetchNeighborhoods()
  }, [])

  const updateURL = () => {
    const params = new URLSearchParams()
    
    if (searchQuery.trim()) params.set('search', searchQuery.trim())
    if (selectedBorough) params.set('borough', selectedBorough)
    if (selectedCuisine) params.set('cuisine', selectedCuisine)
    if (selectedNeighborhood) params.set('neighborhood', selectedNeighborhood)
    if (sortBy !== 'newest') params.set('sort', sortBy)
    if (minRating) params.set('min_rating', minRating)
    if (hasReviews) params.set('has_reviews', 'true')
    
    const queryString = params.toString()
    router.push(`/restaurants${queryString ? `?${queryString}` : ''}`)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL()
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedBorough('')
    setSelectedCuisine('')
    setSelectedNeighborhood('')
    setSortBy('newest')
    setMinRating('')
    setHasReviews(false)
    router.push('/restaurants')
  }

  const hasActiveFilters = searchQuery || selectedBorough || selectedCuisine || selectedNeighborhood || 
                          sortBy !== 'newest' || minRating || hasReviews

  const activeFilterCount = [
    searchQuery, selectedBorough, selectedCuisine, selectedNeighborhood, 
    minRating, hasReviews ? 'reviews' : null
  ].filter(Boolean).length + (sortBy !== 'newest' ? 1 : 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
      <form onSubmit={handleSearch} className="space-y-4">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search restaurants..."
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-600 text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors min-h-[48px] touch-manipulation"
          >
            Search
          </button>
        </div>

        {/* Filters */}
        <div className="space-y-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 sm:space-y-0">
          {/* Borough Filter */}
          <div>
            <label htmlFor="borough" className="block text-sm font-medium text-gray-900 mb-1">
              Borough
            </label>
            <select
              id="borough"
              value={selectedBorough}
              onChange={(e) => {
                setSelectedBorough(e.target.value)
                // Auto-update URL when filter changes
                setTimeout(updateURL, 100)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Boroughs</option>
              {NYC_BOROUGHS.map(borough => (
                <option key={borough} value={borough}>{borough}</option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-gray-900 mb-1">
              Cuisine Type
            </label>
            <select
              id="cuisine"
              value={selectedCuisine}
              onChange={(e) => {
                setSelectedCuisine(e.target.value)
                setTimeout(updateURL, 100)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Cuisines</option>
              {CUISINE_TYPES.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>

          {/* Neighborhood Filter */}
          <div>
            <label htmlFor="neighborhood" className="block text-sm font-medium text-gray-900 mb-1">
              Neighborhood
            </label>
            <select
              id="neighborhood"
              value={selectedNeighborhood}
              onChange={(e) => {
                setSelectedNeighborhood(e.target.value)
                setTimeout(updateURL, 100)
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            >
              <option value="">All Neighborhoods</option>
              {neighborhoods.map(neighborhood => (
                <option key={neighborhood} value={neighborhood}>{neighborhood}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Sort and Advanced Filters Toggle */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            {/* Sort Options */}
            <div>
              <label htmlFor="sort" className="block text-sm font-medium text-gray-900 mb-1">
                Sort by
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value)
                  setTimeout(updateURL, 100)
                }}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm text-gray-900"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="rating">Highest Rated</option>
                <option value="review_count">Most Reviews</option>
              </select>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
          </button>
        </div>

        {/* Advanced Filters */}
        {showAdvanced && (
          <div className="border-t border-gray-200 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Advanced Filters</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Minimum Rating */}
              <div>
                <label htmlFor="min_rating" className="block text-sm font-medium text-gray-900 mb-1">
                  Minimum Rating
                </label>
                <select
                  id="min_rating"
                  value={minRating}
                  onChange={(e) => {
                    setMinRating(e.target.value)
                    setTimeout(updateURL, 100)
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Any Rating</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                  <option value="2">2+ Stars</option>
                  <option value="1">1+ Stars</option>
                </select>
              </div>

              {/* Has Reviews Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Review Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={hasReviews}
                      onChange={(e) => {
                        setHasReviews(e.target.checked)
                        setTimeout(updateURL, 100)
                      }}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Has Reviews Only</span>
                  </label>
                </div>
              </div>

              {/* Placeholder for future filters */}
              <div className="flex items-end">
                <div className="text-xs text-gray-500">
                  More filters coming soon...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Summary and Clear */}
        {hasActiveFilters && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} applied
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
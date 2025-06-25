// src/components/home/hero-section.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push('/restaurants')
    }
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Know Before You Work
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Anonymous workplace reviews from NYC restaurant workers. 
            Find out about management, pay, scheduling, and work-life balance before you apply.
          </p>
          
          {/* Search Bar */}
          <div className="mt-10 max-w-lg mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search restaurants..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurants"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              Browse All Restaurants
            </Link>
            <Link
              href="/reviews/new"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Share Your Experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
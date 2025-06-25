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
            <span className="block">Find Your Next Workplace</span>
            <span className="block text-blue-600">in Seconds, Not Hours</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600">
            Search <strong>100+ NYC restaurants</strong> instantly. Anonymous workplace reviews covering management, pay, scheduling, and work-life balance.
          </p>
          
          {/* Competitive Advantage Callouts */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-300 shadow-sm">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-semibold text-gray-800">Searchable Database</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-300 shadow-sm">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-semibold text-gray-800">Mobile-Optimized</span>
            </div>
            <div className="flex items-center bg-white px-4 py-2 rounded-full border border-gray-300 shadow-sm">
              <span className="text-green-600 mr-2">✓</span>
              <span className="font-semibold text-gray-800">Complete NYC Coverage</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/restaurants"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
            >
              <span className="mr-2">🔍</span>
              Search 100+ Restaurants
            </Link>
            <Link
              href="/reviews/new"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-lg font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Share Your Experience
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
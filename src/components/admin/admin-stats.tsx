// src/components/admin/admin-stats.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface AdminStats {
  totalRestaurants: number
  totalReviews: number
  flaggedReviews: number
  totalUsers: number
  recentReviews: number
  recentRestaurants: number
}

export function AdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    async function fetchAdminStats() {
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

        // Fetch admin stats
        const response = await fetch('/api/admin/stats')
        
        if (response.status === 403) {
          setIsAdmin(false)
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch admin stats')
        }

        setIsAdmin(true)
        const data = await response.json()
        setStats(data.stats)

      } catch (err) {
        console.error('Error fetching admin stats:', err)
        setError(err instanceof Error ? err.message : 'Failed to load admin stats')
      } finally {
        setLoading(false)
      }
    }

    fetchAdminStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border p-6 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="mb-4">
          <span className="text-6xl">🔒</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Admin Access Required
        </h3>
        <p className="text-gray-600 mb-6">
          You need admin privileges to access this dashboard.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to Home
        </Link>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!stats) {
    return null
  }

  const statCards = [
    {
      title: 'Total Restaurants',
      value: stats.totalRestaurants,
      color: 'blue',
      description: `+${stats.recentRestaurants} this week`
    },
    {
      title: 'Total Reviews',
      value: stats.totalReviews,
      color: 'green',
      description: `+${stats.recentReviews} this week`
    },
    {
      title: 'Flagged Reviews',
      value: stats.flaggedReviews,
      color: 'red',
      description: 'Need attention'
    },
    {
      title: 'Total Users',
      value: stats.totalUsers,
      color: 'purple',
      description: 'Registered accounts'
    },
    {
      title: 'Recent Activity',
      value: stats.recentReviews + stats.recentRestaurants,
      color: 'yellow',
      description: 'Actions this week'
    },
    {
      title: 'Platform Health',
      value: stats.flaggedReviews === 0 ? '100%' : Math.round((1 - stats.flaggedReviews / Math.max(stats.totalReviews, 1)) * 100) + '%',
      color: 'indigo',
      description: 'Clean reviews'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-50 text-blue-600',
      green: 'bg-green-50 text-green-600',
      red: 'bg-red-50 text-red-600',
      purple: 'bg-purple-50 text-purple-600',
      yellow: 'bg-yellow-50 text-yellow-600',
      indigo: 'bg-indigo-50 text-indigo-600'
    }
    return colors[color as keyof typeof colors] || colors.blue
  }

  return (
    <div>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Platform Statistics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {card.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {card.description}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(card.color)}`}>
                <span className="text-xl">
                  {card.title.includes('Restaurant') ? '🏪' :
                   card.title.includes('Review') ? '📝' :
                   card.title.includes('User') ? '👥' :
                   card.title.includes('Activity') ? '📊' :
                   card.title.includes('Health') ? '💚' : '📈'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
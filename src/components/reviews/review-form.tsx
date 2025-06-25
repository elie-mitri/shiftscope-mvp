// src/components/reviews/review-form.tsx
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Restaurant } from '@/lib/types'
import { RatingInput } from './rating-input'
import { createClient } from '@/lib/supabase/client'

interface ReviewFormProps {
  preselectedRestaurantId?: string
}

interface ReviewFormData {
  restaurant_id: string
  management_rating: number
  work_life_balance_rating: number
  pay_tipping_rating: number
  scheduling_rating: number
  overall_rating: number
  review_text: string
  worker_role: string
  employment_status: string
  hours_per_week: string
  would_recommend: boolean | null
}

const WORKER_ROLES = [
  'Server/Waiter',
  'Host/Hostess', 
  'Bartender',
  'Cook/Chef',
  'Kitchen Staff',
  'Dishwasher',
  'Manager',
  'Barista',
  'Delivery Driver',
  'Other'
]

const EMPLOYMENT_STATUS = [
  'Current Employee',
  'Former Employee'
]

export function ReviewForm({ preselectedRestaurantId }: ReviewFormProps) {
  const router = useRouter()
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  const [formData, setFormData] = useState<ReviewFormData>({
    restaurant_id: preselectedRestaurantId || '',
    management_rating: 0,
    work_life_balance_rating: 0,
    pay_tipping_rating: 0,
    scheduling_rating: 0,
    overall_rating: 0,
    review_text: '',
    worker_role: '',
    employment_status: '',
    hours_per_week: '',
    would_recommend: null
  })

  // Check authentication status
  useEffect(() => {
    async function checkAuth() {
      const supabase = createClient()
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      console.log('Auth check result:', { user: !!user, authError })
      setIsAuthenticated(!!user)
      
      if (!user) {
        setError('You must be signed in to write a review.')
      }
    }
    checkAuth()
  }, [])

  // Fetch restaurants for dropdown
  useEffect(() => {
    async function fetchRestaurants() {
      try {
        const response = await fetch('/api/restaurants')
        if (response.ok) {
          const data = await response.json()
          setRestaurants(data.restaurants || [])
          
          // If preselected restaurant, find and set it
          if (preselectedRestaurantId && data.restaurants) {
            const preselected = data.restaurants.find((r: Restaurant) => r.id === preselectedRestaurantId)
            if (preselected) {
              setSelectedRestaurant(preselected)
            }
          }
        }
      } catch (error) {
        console.error('Error fetching restaurants:', error)
      }
    }
    fetchRestaurants()
  }, [preselectedRestaurantId])

  const handleInputChange = (field: keyof ReviewFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRestaurantChange = (restaurantId: string) => {
    const restaurant = restaurants.find(r => r.id === restaurantId)
    setSelectedRestaurant(restaurant || null)
    setFormData(prev => ({
      ...prev,
      restaurant_id: restaurantId
    }))
  }

  const validateForm = (): boolean => {
    if (!formData.restaurant_id) {
      setError('Please select a restaurant.')
      return false
    }

    const ratings = [
      formData.management_rating,
      formData.work_life_balance_rating,
      formData.pay_tipping_rating,
      formData.scheduling_rating,
      formData.overall_rating
    ]

    if (ratings.some(rating => rating === 0)) {
      setError('Please provide all required ratings.')
      return false
    }

    if (!formData.worker_role) {
      setError('Please select your worker role.')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!isAuthenticated) {
      setError('You must be signed in to write a review.')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          hours_per_week: formData.hours_per_week ? parseInt(formData.hours_per_week) : null
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error Response:', response.status, errorData)
        throw new Error(errorData.error || 'Failed to submit review')
      }

      // Success! Redirect to restaurant page
      router.push(`/restaurants/${formData.restaurant_id}?review=success`)

    } catch (err) {
      console.error('Error submitting review:', err)
      setError(err instanceof Error ? err.message : 'Failed to submit review')
    } finally {
      setLoading(false)
    }
  }

  if (isAuthenticated === false) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
        <div className="mb-4">
          <span className="text-6xl">🔒</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Sign In Required
        </h3>
        <p className="text-gray-600 mb-6">
          You must be signed in to write a review and help other workers.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/auth/signin"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Create Account
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Restaurant Selection */}
        <div>
          <label htmlFor="restaurant" className="block text-sm font-medium text-gray-900 mb-2">
            Restaurant *
          </label>
          {selectedRestaurant ? (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div>
                <div className="font-medium text-gray-900">{selectedRestaurant.name}</div>
                <div className="text-sm text-gray-600">{selectedRestaurant.address}</div>
                <div className="text-sm text-gray-600">
                  {selectedRestaurant.neighborhood}, {selectedRestaurant.borough}
                </div>
              </div>
              {!preselectedRestaurantId && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRestaurant(null)
                    setFormData(prev => ({ ...prev, restaurant_id: '' }))
                  }}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Change
                </button>
              )}
            </div>
          ) : (
            <select
              id="restaurant"
              value={formData.restaurant_id}
              onChange={(e) => handleRestaurantChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              required
            >
              <option value="">Select restaurant...</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name} - {restaurant.neighborhood}, {restaurant.borough}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Rating Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Your Experience</h3>
          <div className="space-y-6">
            <RatingInput
              label="Management"
              description="How would you rate the management team and leadership?"
              value={formData.management_rating}
              onChange={(value) => handleInputChange('management_rating', value)}
              required
            />
            
            <RatingInput
              label="Work-Life Balance"
              description="How well does this workplace respect your time and personal life?"
              value={formData.work_life_balance_rating}
              onChange={(value) => handleInputChange('work_life_balance_rating', value)}
              required
            />
            
            <RatingInput
              label="Pay & Tipping"
              description="How satisfied are you with the compensation and tip structure?"
              value={formData.pay_tipping_rating}
              onChange={(value) => handleInputChange('pay_tipping_rating', value)}
              required
            />
            
            <RatingInput
              label="Scheduling"
              description="How fair and predictable is the scheduling process?"
              value={formData.scheduling_rating}
              onChange={(value) => handleInputChange('scheduling_rating', value)}
              required
            />
            
            <RatingInput
              label="Overall Experience"
              description="Overall, how would you rate working at this restaurant?"
              value={formData.overall_rating}
              onChange={(value) => handleInputChange('overall_rating', value)}
              required
            />
          </div>
        </div>

        {/* Review Text */}
        <div>
          <label htmlFor="review_text" className="block text-sm font-medium text-gray-900 mb-2">
            Your Review
          </label>
          <textarea
            id="review_text"
            value={formData.review_text}
            onChange={(e) => handleInputChange('review_text', e.target.value)}
            placeholder="Share more details about your experience working here..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
          <p className="text-sm text-gray-600 mt-1">
            Optional: Help other workers by sharing specific details about your experience.
          </p>
        </div>

        {/* Worker Details */}
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="worker_role" className="block text-sm font-medium text-gray-900 mb-2">
              Your Role *
            </label>
            <select
              id="worker_role"
              value={formData.worker_role}
              onChange={(e) => handleInputChange('worker_role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select role...</option>
              {WORKER_ROLES.map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="employment_status" className="block text-sm font-medium text-gray-900 mb-2">
              Employment Status
            </label>
            <select
              id="employment_status"
              value={formData.employment_status}
              onChange={(e) => handleInputChange('employment_status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Status...</option>
              {EMPLOYMENT_STATUS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hours_per_week" className="block text-sm font-medium text-gray-900 mb-2">
              Hours per Week
            </label>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              id="hours_per_week"
              value={formData.hours_per_week}
              onChange={(e) => {
                // Only allow numeric input
                const value = e.target.value.replace(/[^0-9]/g, '')
                if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 80)) {
                  handleInputChange('hours_per_week', value)
                }
              }}
              placeholder="e.g. 30"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Would you recommend this workplace?
            </label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="would_recommend"
                  checked={formData.would_recommend === true}
                  onChange={() => handleInputChange('would_recommend', true)}
                  className="mr-2"
                />
                Yes, I would recommend it
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="would_recommend"
                  checked={formData.would_recommend === false}
                  onChange={() => handleInputChange('would_recommend', false)}
                  className="mr-2"
                />
                No, I would not recommend it
              </label>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <Link
            href={selectedRestaurant ? `/restaurants/${selectedRestaurant.id}` : '/restaurants'}
            className="text-gray-600 hover:text-gray-800"
          >
            ← Cancel
          </Link>
          
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  )
}
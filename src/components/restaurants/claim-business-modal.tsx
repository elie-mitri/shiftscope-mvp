// src/components/restaurants/claim-business-modal.tsx
'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ClaimBusinessModalProps {
  restaurantId: string
  restaurantName: string
  isOpen: boolean
  onClose: () => void
}

export function ClaimBusinessModal({ restaurantId, restaurantName, isOpen, onClose }: ClaimBusinessModalProps) {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Check authentication
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        alert('Please sign in to claim a business')
        return
      }

      // Submit claim request to API
      const response = await fetch('/api/admin/claims', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          restaurant_id: restaurantId,
          restaurant_name: restaurantName,
          ...formData
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit claim request')
      }

      setSubmitted(true)

    } catch (error) {
      console.error('Error submitting claim:', error)
      alert('Failed to submit claim request')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Claim {restaurantName}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Claim Request Submitted
              </h3>
              <p className="text-gray-600 mb-6">
                We&apos;ll review your request and contact you within 2-3 business days.
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h3 className="font-medium text-blue-900 mb-1">Business Owner Verification</h3>
                <p className="text-sm text-blue-700">
                  Claiming a business allows you to manage your restaurant&apos;s information, 
                  respond to reviews, and provide accurate details to potential workers.
                </p>
              </div>

              <div>
                <label htmlFor="ownerName" className="block text-sm font-medium text-gray-900 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="ownerName"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData(prev => ({ ...prev, ownerName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-1">
                  Business Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-900 mb-1">
                  Your Position *
                </label>
                <select
                  id="position"
                  required
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Select your role...</option>
                  <option value="owner">Owner</option>
                  <option value="manager">General Manager</option>
                  <option value="hr">HR Manager</option>
                  <option value="other">Other Authorized Representative</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-1">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  placeholder="Tell us more about your role at this restaurant..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-600"
                />
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
                We may request additional documentation to verify your relationship with this business.
              </div>

              <div className="flex justify-between pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Submitting...' : 'Submit Claim Request'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
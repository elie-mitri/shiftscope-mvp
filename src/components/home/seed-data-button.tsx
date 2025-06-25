'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function SeedDataButton() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const seedData = async () => {
    setLoading(true)
    setMessage('')
    
    try {
      const supabase = createClient()
      
      // Sample restaurants (including required borough field)
      const restaurants = [
        {
          name: 'Joe\'s Pizza',
          address: '14 Carmine St, New York, NY 10014',
          neighborhood: 'West Village',
          borough: 'Manhattan',
          cuisine_type: 'Pizza'
        },
        {
          name: 'Katz\'s Delicatessen',
          address: '205 E Houston St, New York, NY 10002', 
          neighborhood: 'Lower East Side',
          borough: 'Manhattan',
          cuisine_type: 'Deli'
        },
        {
          name: 'Peter Luger Steak House',
          address: '178 Broadway, Brooklyn, NY 11249',
          neighborhood: 'Williamsburg',
          borough: 'Brooklyn',
          cuisine_type: 'Steakhouse'
        },
        {
          name: 'Xi\'an Famous Foods',
          address: '24 W 8th St, New York, NY 10011',
          neighborhood: 'East Village',
          borough: 'Manhattan',
          cuisine_type: 'Chinese'
        }
      ]
      
      const { data, error } = await supabase
        .from('restaurants')
        .insert(restaurants)
        .select()
      
      if (error) {
        if (error.code === '23505') {
          setMessage('✅ Sample data already exists!')
        } else {
          throw error
        }
      } else {
        setMessage(`✅ Added ${data.length} sample restaurants!`)
      }
      
      // Refresh the page to show new data
      window.location.reload()
      
    } catch (error) {
      console.error('Error seeding data:', error)
      setMessage(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <p className="text-sm text-gray-600 mb-3">
        No restaurants yet? Add some sample NYC restaurants to test the app:
      </p>
      <button
        onClick={seedData}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Sample Restaurants'}
      </button>
      {message && (
        <p className="mt-2 text-sm font-medium">{message}</p>
      )}
    </div>
  )
}
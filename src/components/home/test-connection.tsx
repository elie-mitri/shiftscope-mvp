'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export function TestConnection() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const supabase = createClient()
      
      // Test basic connection and get actual count
      const { data, error, count } = await supabase
        .from('restaurants')
        .select('*', { count: 'exact' })
      
      if (error) {
        setResult(`❌ Database Error: ${error.message}`)
      } else {
        setResult(`✅ Connection OK! Found ${count} restaurants (${data?.length} returned)`)
        console.log('Restaurant data:', data)
      }
      
    } catch (error) {
      setResult(`❌ Connection Error: ${error instanceof Error ? error.message : 'Unknown'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="text-center p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
      <p className="text-sm text-gray-600 mb-3">
        First, let's test if the database connection is working:
      </p>
      <button
        onClick={testConnection}
        disabled={loading}
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Testing...' : 'Test Database Connection'}
      </button>
      {result && (
        <p className="mt-2 text-sm font-medium">{result}</p>
      )}
    </div>
  )
}
// src/components/admin/restaurant-import.tsx
'use client'

import { useState } from 'react'

interface ImportResult {
  message: string
  imported: number
  errors: number
  errorDetails: Array<{ restaurant: string; error: string }>
  restaurants: Array<{ name: string; address: string }>
}

export function RestaurantImport() {
  const [importing, setImporting] = useState(false)
  const [result, setResult] = useState<ImportResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImport = async (neighborhood: string) => {
    try {
      setImporting(true)
      setError(null)
      setResult(null)

      const locations = {
        'Williamsburg': 'Williamsburg, Brooklyn, NY',
        'Park Slope': 'Park Slope, Brooklyn, NY',
        'East Village': 'East Village, Manhattan, NY'
      }

      const response = await fetch('/api/import/restaurants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          neighborhood,
          location: locations[neighborhood as keyof typeof locations]
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Import failed')
      }

      const data = await response.json()
      setResult(data)

    } catch (err) {
      console.error('Import error:', err)
      setError(err instanceof Error ? err.message : 'Import failed')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Import Real Restaurant Data</h2>
      
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          Import restaurant data from Google Places API. This will add real restaurants with verified addresses, 
          phone numbers, and basic information to your database.
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">🎯 Recommended: Start with Williamsburg</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Well-defined neighborhood boundaries</li>
            <li>• ~200-300 restaurants to import</li>
            <li>• Diverse restaurant types for testing</li>
            <li>• Great for MVP launch</li>
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => handleImport('Williamsburg')}
            disabled={importing}
            className="px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {importing ? 'Importing...' : 'Import Williamsburg'}
          </button>
          
          <button
            onClick={() => handleImport('Park Slope')}
            disabled={importing}
            className="px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {importing ? 'Importing...' : 'Import Park Slope'}
          </button>
          
          <button
            onClick={() => handleImport('East Village')}
            disabled={importing}
            className="px-4 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {importing ? 'Importing...' : 'Import East Village'}
          </button>
        </div>

        {importing && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-3"></div>
              <span className="text-yellow-800">
                Importing restaurants... This may take 2-3 minutes.
              </span>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-1">Import Error</h4>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-3">Import Complete! 🎉</h4>
            <div className="text-sm text-green-700 space-y-2">
              <p><strong>Successfully imported:</strong> {result.imported} restaurants</p>
              {result.errors > 0 && (
                <p><strong>Errors:</strong> {result.errors} (see details below)</p>
              )}
              
              {result.restaurants.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Sample imported restaurants:</p>
                  <ul className="space-y-1">
                    {result.restaurants.slice(0, 5).map((restaurant, index) => (
                      <li key={index} className="text-xs">
                        • {restaurant.name} - {restaurant.address}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {result.errorDetails.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium mb-2">Errors encountered:</p>
                  <ul className="space-y-1">
                    {result.errorDetails.map((err, index) => (
                      <li key={index} className="text-xs text-red-600">
                        • {err.restaurant}: {err.error}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
          <strong>Note:</strong> This uses your Google Places API quota. Each import uses ~100-300 API calls depending on the neighborhood size.
          Duplicate restaurants are automatically skipped.
        </div>
      </div>
    </div>
  )
}
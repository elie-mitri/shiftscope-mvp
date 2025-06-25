// src/components/admin/admin-claims.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface BusinessClaim {
  id: string
  restaurant_id: string
  restaurant_name: string
  user_email: string
  owner_name: string
  email: string
  phone?: string
  position: string
  message?: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export function AdminClaims() {
  const [claims, setClaims] = useState<BusinessClaim[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  useEffect(() => {
    fetchClaims()
  }, [])

  async function fetchClaims() {
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

      // Fetch claims
      const response = await fetch('/api/admin/claims')
      
      if (response.status === 403) {
        setIsAdmin(false)
        return
      }

      if (!response.ok) {
        throw new Error('Failed to fetch business claims')
      }

      setIsAdmin(true)
      const data = await response.json()
      setClaims(data.claims)

    } catch (err) {
      console.error('Error fetching claims:', err)
      setError(err instanceof Error ? err.message : 'Failed to load claims')
    } finally {
      setLoading(false)
    }
  }

  async function handleClaimAction(claimId: string, action: 'approve' | 'reject') {
    try {
      setActionLoading(claimId)
      
      const response = await fetch(`/api/admin/claims/${claimId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      })

      if (!response.ok) {
        throw new Error(`Failed to ${action} claim`)
      }

      // Refresh the claims list
      await fetchClaims()

    } catch (err) {
      console.error(`Error ${action}ing claim:`, err)
      setError(err instanceof Error ? err.message : `Failed to ${action} claim`)
    } finally {
      setActionLoading(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    
    return (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Claims</h2>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-4 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Business Claims</h2>
        <p className="text-gray-600">Admin access required</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Business Claims</h2>
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Business Claims</h2>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => fetchClaims()}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Refresh
          </button>
          <span className="text-xs text-gray-500">
            ({claims.length} total)
          </span>
        </div>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-12">
          <div className="mb-4">
            <span className="text-6xl">📋</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No business claims
          </h3>
          <p className="text-gray-600">
            No businesses have submitted ownership claims yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="border border-gray-200 rounded-lg p-4"
            >
              {/* Claim Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Link
                      href={`/restaurants/${claim.restaurant_id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {claim.restaurant_name}
                    </Link>
                    {getStatusBadge(claim.status)}
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <div><strong>Claimant:</strong> {claim.owner_name}</div>
                    <div><strong>Position:</strong> {claim.position}</div>
                    <div><strong>Email:</strong> {claim.email}</div>
                    {claim.phone && <div><strong>Phone:</strong> {claim.phone}</div>}
                  </div>
                </div>
                
                <div className="text-right text-xs text-gray-500">
                  <div>Submitted: {formatDate(claim.created_at)}</div>
                  <div>By: {claim.user_email}</div>
                </div>
              </div>

              {/* Additional Message */}
              {claim.message && (
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-1">Additional Information:</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 rounded p-3">
                    {claim.message}
                  </p>
                </div>
              )}

              {/* Actions */}
              {claim.status === 'pending' && (
                <div className="flex justify-end gap-2 pt-3 border-t border-gray-200">
                  <button
                    onClick={() => handleClaimAction(claim.id, 'reject')}
                    disabled={actionLoading === claim.id}
                    className="px-4 py-2 bg-red-100 text-red-800 text-sm rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    {actionLoading === claim.id ? 'Processing...' : 'Reject'}
                  </button>
                  
                  <button
                    onClick={() => handleClaimAction(claim.id, 'approve')}
                    disabled={actionLoading === claim.id}
                    className="px-4 py-2 bg-green-100 text-green-800 text-sm rounded hover:bg-green-200 disabled:opacity-50"
                  >
                    {actionLoading === claim.id ? 'Processing...' : 'Approve'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
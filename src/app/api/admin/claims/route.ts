// src/app/api/admin/claims/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

// Simple in-memory storage for demo purposes
// In production, this would be stored in the database
declare global {
  var claimStatusUpdates: Record<string, 'pending' | 'approved' | 'rejected'> | undefined
}

if (!global.claimStatusUpdates) {
  global.claimStatusUpdates = {}
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    
    // Check authentication and admin status
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    if (!isAdmin(user)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // For now, return a placeholder since we don't have a claims table
    // In a real implementation, this would fetch from a business_claims table
    // This simulates recent claim submissions
    const baseClaims = [
      {
        id: '1',
        restaurant_id: '28e58a83-dfba-45fd-b7e5-eee765730ff7',
        restaurant_name: "Joe's Pizza",
        user_email: user.email,
        owner_name: 'John Doe',
        email: 'john@joespizza.com',
        phone: '(555) 123-4567',
        position: 'owner',
        status: 'pending' as const,
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        message: 'I am the owner of this restaurant and would like to claim the listing.'
      },
      {
        id: '2',
        restaurant_id: '123e4567-e89b-12d3-a456-426614174000',
        restaurant_name: "Maria's Deli",
        user_email: 'maria@example.com',
        owner_name: 'Maria Rodriguez',
        email: 'maria@mariasdeli.com',
        phone: '(555) 987-6543',
        position: 'manager',
        status: 'pending' as const,
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        message: 'I am the general manager and have been authorized by the owner to manage our online presence.'
      }
    ]

    // Apply any status updates from in-memory storage
    const mockClaims = baseClaims.map(claim => ({
      ...claim,
      status: global.claimStatusUpdates![claim.id] || claim.status
    }))

    return NextResponse.json({
      claims: mockClaims
    })

  } catch (error) {
    console.error('Admin claims error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // For now, just log the claim request
    // In a real implementation, this would save to a business_claims table
    console.log('New business claim request:', {
      user_id: user.id,
      user_email: user.email,
      ...body
    })

    return NextResponse.json({
      message: 'Claim request submitted successfully',
      claim_id: Date.now().toString()
    })

  } catch (error) {
    console.error('Business claim submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
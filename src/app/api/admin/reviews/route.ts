// src/app/api/admin/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

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

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get all recent reviews (flagged functionality disabled for now)
    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    const { data: reviews, error: reviewsError } = await query

    if (reviewsError) {
      console.error('Database error fetching reviews:', reviewsError)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    // Get restaurant information for each review
    const reviewsWithRestaurants = []
    for (const review of reviews || []) {
      const { data: restaurant, error: restaurantError } = await supabase
        .from('restaurants')
        .select('id, name, neighborhood, borough')
        .eq('id', review.restaurant_id)
        .single()

      if (restaurant && !restaurantError) {
        reviewsWithRestaurants.push({
          ...review,
          restaurant
        })
      } else {
        reviewsWithRestaurants.push({
          ...review,
          restaurant: {
            id: review.restaurant_id,
            name: 'Restaurant not found',
            neighborhood: '',
            borough: ''
          }
        })
      }
    }

    return NextResponse.json({
      reviews: reviewsWithRestaurants
    })

  } catch (error) {
    console.error('Admin reviews error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
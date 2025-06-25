// src/app/api/user/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
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

    // Get user's reviews
    const { data: reviews, error: reviewsError } = await supabase
      .from('reviews')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (reviewsError) {
      console.error('Database error fetching user reviews:', reviewsError)
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
        .select('id, name, address, neighborhood, borough, cuisine_type')
        .eq('id', review.restaurant_id)
        .single()

      if (restaurant && !restaurantError) {
        reviewsWithRestaurants.push({
          ...review,
          restaurants: restaurant
        })
      } else {
        // Include review even if restaurant fetch fails
        reviewsWithRestaurants.push({
          ...review,
          restaurants: {
            id: review.restaurant_id,
            name: 'Restaurant not found',
            address: '',
            neighborhood: '',
            borough: '',
            cuisine_type: ''
          }
        })
      }
    }

    // Calculate user stats
    const totalReviews = reviewsWithRestaurants.length || 0
    const averageRating = totalReviews > 0 
      ? reviewsWithRestaurants.reduce((sum, review) => sum + review.overall_rating, 0) / totalReviews
      : 0

    return NextResponse.json({
      reviews: reviewsWithRestaurants,
      stats: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10 // Round to 1 decimal
      }
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
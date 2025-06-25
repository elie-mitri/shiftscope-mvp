// src/app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { ReviewFilters, InsertReview } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    
    // Extract filter parameters
    const filters: ReviewFilters = {
      restaurant_id: searchParams.get('restaurant_id') || undefined,
      min_rating: searchParams.get('min_rating') ? parseFloat(searchParams.get('min_rating')!) : undefined,
      worker_role: searchParams.get('worker_role') || undefined,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20,
      offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : 0,
    }

    let query = supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .range(filters.offset!, filters.offset! + filters.limit! - 1)

    // Apply filters
    if (filters.restaurant_id) {
      query = query.eq('restaurant_id', filters.restaurant_id)
    }

    if (filters.min_rating) {
      query = query.gte('overall_rating', filters.min_rating)
    }

    if (filters.worker_role) {
      query = query.eq('worker_role', filters.worker_role)
    }

    const { data: reviews, error, count } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch reviews' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      reviews,
      pagination: {
        limit: filters.limit,
        offset: filters.offset,
        total: count
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

export async function POST(request: NextRequest) {
  try {
    console.log('API: Review POST request started')
    const supabase = await createServerClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('API: Auth check result:', { user: !!user, authError })
    
    if (authError || !user) {
      console.log('API: Authentication failed')
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    console.log('API: Request body:', { ...body, review_text: body.review_text ? '[text]' : null })
    
    // Validate required fields (only what exists in database)
    const requiredFields = ['restaurant_id', 'overall_rating']
    
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Validate overall rating (1-5)
    if (body.overall_rating < 1 || body.overall_rating > 5) {
      return NextResponse.json(
        { error: 'overall_rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Check if restaurant exists
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('id')
      .eq('id', body.restaurant_id)
      .single()

    if (restaurantError || !restaurant) {
      return NextResponse.json(
        { error: 'Restaurant not found' },
        { status: 404 }
      )
    }

    // Check if user already reviewed this restaurant
    const { data: existingReview } = await supabase
      .from('reviews')
      .select('id')
      .eq('restaurant_id', body.restaurant_id)
      .eq('user_id', user.id)
      .single()

    if (existingReview) {
      return NextResponse.json(
        { error: 'You have already reviewed this restaurant' },
        { status: 409 }
      )
    }

    // Use only the basic columns that work with current database schema
    const reviewData = {
      restaurant_id: body.restaurant_id,
      user_id: user.id,
      overall_rating: body.overall_rating,
      review_text: body.review_text || null
    }
    
    console.log('API: Attempting to insert review data:', reviewData)

    const { data: review, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select('*')
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create review' },
        { status: 500 }
      )
    }

    // Update restaurant statistics (you might want to do this in a background job)
    await updateRestaurantStats(supabase, body.restaurant_id)

    return NextResponse.json({ review }, { status: 201 })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to update restaurant statistics
async function updateRestaurantStats(supabase: Awaited<ReturnType<typeof createServerClient>>, restaurantId: string) {
  try {
    // Get all reviews for this restaurant
    const { data: reviews } = await supabase
      .from('reviews')
      .select('overall_rating')
      .eq('restaurant_id', restaurantId)

    if (reviews && reviews.length > 0) {
      const totalReviews = reviews.length
      const averageRating = reviews.reduce((sum: number, review: { overall_rating: number }) => sum + review.overall_rating, 0) / totalReviews

      // Note: Restaurant stats update disabled since columns don't exist yet
      // await supabase
      //   .from('restaurants')
      //   .update({
      //     average_rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      //     total_reviews: totalReviews,
      //     updated_at: new Date().toISOString()
      //   })
      //   .eq('id', restaurantId)
    }
  } catch (error) {
    console.error('Error updating restaurant stats:', error)
    // Don't throw - this is a background operation
  }
}
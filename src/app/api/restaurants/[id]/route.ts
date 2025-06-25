// src/app/api/restaurants/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

interface ReviewRating {
  overall_rating: number
  management_rating: number
  work_life_balance_rating: number
  pay_tipping_rating: number
  scheduling_rating: number
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    console.log('API: Starting restaurant fetch...')
    const supabase = await createServerClient()
    const { id } = await params
    console.log('API: Restaurant ID:', id)

    // Get restaurant data first
    console.log('API: Querying database...')
    const { data: restaurant, error: restaurantError } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .single()
    
    console.log('API: Restaurant query result:', restaurant)
    
    // Get reviews separately (if any exist)
    let reviews = []
    if (restaurant && !restaurantError) {
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('reviews')
        .select('*')
        .eq('restaurant_id', id)
      
      if (reviewsData && !reviewsError) {
        reviews = reviewsData
      }
      console.log('API: Reviews query result:', reviews.length, 'reviews found')
    }
    
    console.log('API: Database response - error:', restaurantError)
    console.log('API: Database response - data:', restaurant ? 'Found restaurant' : 'No restaurant')

    if (restaurantError) {
      if (restaurantError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        )
      }
      console.error('Database error:', restaurantError)
      return NextResponse.json(
        { error: 'Failed to fetch restaurant' },
        { status: 500 }
      )
    }

    // Calculate rating statistics
    const totalReviews = reviews.length
    
    if (totalReviews > 0) {
      const averageRatings = {
        overall: reviews.reduce((sum: number, r: ReviewRating) => sum + r.overall_rating, 0) / totalReviews,
        management: reviews.reduce((sum: number, r: ReviewRating) => sum + r.management_rating, 0) / totalReviews,
        work_life_balance: reviews.reduce((sum: number, r: ReviewRating) => sum + r.work_life_balance_rating, 0) / totalReviews,
        pay_tipping: reviews.reduce((sum: number, r: ReviewRating) => sum + r.pay_tipping_rating, 0) / totalReviews,
        scheduling: reviews.reduce((sum: number, r: ReviewRating) => sum + r.scheduling_rating, 0) / totalReviews,
      }

      // Note: Update restaurant averages disabled for now since columns don't exist yet
      // await supabase
      //   .from('restaurants')
      //   .update({
      //     average_rating: averageRatings.overall,
      //     total_reviews: totalReviews
      //   })
      //   .eq('id', id)

      return NextResponse.json({
        restaurant: {
          ...restaurant,
          reviews: reviews,
          average_rating: averageRatings.overall,
          total_reviews: totalReviews,
          rating_breakdown: averageRatings
        }
      })
    }

    return NextResponse.json({ 
      restaurant: {
        ...restaurant,
        reviews: reviews,
        total_reviews: 0,
        average_rating: null
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

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerClient()
    const { id } = await params

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    const updateData = {
      name: body.name,
      address: body.address,
      neighborhood: body.neighborhood,
      cuisine_type: body.cuisine_type,
      phone: body.phone,
      website: body.website,
      updated_at: new Date().toISOString()
    }

    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Restaurant not found' },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update restaurant' },
        { status: 500 }
      )
    }

    return NextResponse.json({ restaurant })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerClient()
    const { id } = await params

    // Check authentication - in production, restrict to admins
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('restaurants')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete restaurant' },
        { status: 500 }
      )
    }

    return NextResponse.json({ message: 'Restaurant deleted successfully' })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
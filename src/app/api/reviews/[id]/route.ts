// src/app/api/reviews/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerClient()
    const { id } = await params

    const { data: review, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles(anonymous_display_name),
        restaurants(name, neighborhood)
      `)
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Review not found' },
          { status: 404 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch review' },
        { status: 500 }
      )
    }

    return NextResponse.json({ review })

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

    // Check if review exists and user owns it
    const { data: existingReview, error: reviewError } = await supabase
      .from('reviews')
      .select('user_id, restaurant_id')
      .eq('id', id)
      .single()

    if (reviewError || !existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.user_id !== user.id) {
      return NextResponse.json(
        { error: 'You can only edit your own reviews' },
        { status: 403 }
      )
    }

    const body = await request.json()
    
    // Validate rating ranges if provided
    const ratingFields = [
      'management_rating', 'work_life_balance_rating', 
      'pay_tipping_rating', 'scheduling_rating', 'overall_rating'
    ]
    
    for (const field of ratingFields) {
      if (body[field] !== undefined) {
        const rating = body[field]
        if (rating < 1 || rating > 5) {
          return NextResponse.json(
            { error: `${field} must be between 1 and 5` },
            { status: 400 }
          )
        }
      }
    }

    const updateData = {
      management_rating: body.management_rating,
      work_life_balance_rating: body.work_life_balance_rating,
      pay_tipping_rating: body.pay_tipping_rating,
      scheduling_rating: body.scheduling_rating,
      overall_rating: body.overall_rating,
      review_text: body.review_text,
      worker_role: body.worker_role,
      date_worked: body.date_worked,
      employment_duration: body.employment_duration,
      would_recommend: body.would_recommend,
      updated_at: new Date().toISOString()
    }

    // Remove undefined fields
    Object.keys(updateData).forEach(key => 
      updateData[key as keyof typeof updateData] === undefined && 
      delete updateData[key as keyof typeof updateData]
    )

    const { data: review, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select(`
        *,
        profiles(anonymous_display_name),
        restaurants(name)
      `)
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update review' },
        { status: 500 }
      )
    }

    // Update restaurant statistics
    await updateRestaurantStats(supabase, existingReview.restaurant_id)

    return NextResponse.json({ review })

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

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if review exists and user owns it
    const { data: existingReview, error: reviewError } = await supabase
      .from('reviews')
      .select('user_id, restaurant_id')
      .eq('id', id)
      .single()

    if (reviewError || !existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    if (existingReview.user_id !== user.id) {
      return NextResponse.json(
        { error: 'You can only delete your own reviews' },
        { status: 403 }
      )
    }

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete review' },
        { status: 500 }
      )
    }

    // Update restaurant statistics
    await updateRestaurantStats(supabase, existingReview.restaurant_id)

    return NextResponse.json({ message: 'Review deleted successfully' })

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
    const { data: reviews } = await supabase
      .from('reviews')
      .select('overall_rating')
      .eq('restaurant_id', restaurantId)
      .eq('flagged', false)

    if (reviews && reviews.length > 0) {
      const totalReviews = reviews.length
      const averageRating = reviews.reduce((sum: number, review: { overall_rating: number }) => sum + review.overall_rating, 0) / totalReviews

      await supabase
        .from('restaurants')
        .update({
          average_rating: Math.round(averageRating * 10) / 10,
          total_reviews: totalReviews,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId)
    } else {
      // No reviews left, reset stats
      await supabase
        .from('restaurants')
        .update({
          average_rating: null,
          total_reviews: 0,
          updated_at: new Date().toISOString()
        })
        .eq('id', restaurantId)
    }
  } catch (error) {
    console.error('Error updating restaurant stats:', error)
  }
}
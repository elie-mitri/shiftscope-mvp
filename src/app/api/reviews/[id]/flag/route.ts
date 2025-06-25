// src/app/api/reviews/[id]/flag/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

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
    const { flagged } = body

    // Validate flagged value
    if (typeof flagged !== 'boolean') {
      return NextResponse.json(
        { error: 'flagged must be a boolean value' },
        { status: 400 }
      )
    }

    // Check if review exists
    const { data: existingReview, error: reviewError } = await supabase
      .from('reviews')
      .select('id, restaurant_id')
      .eq('id', id)
      .single()

    if (reviewError || !existingReview) {
      return NextResponse.json(
        { error: 'Review not found' },
        { status: 404 }
      )
    }

    const { data: review, error } = await supabase
      .from('reviews')
      .update({
        flagged: flagged,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to update review flag status' },
        { status: 500 }
      )
    }

    // TODO: In a real app, you might want to:
    // 1. Log the flagging action with user ID and reason
    // 2. Send notification to moderators
    // 3. Auto-hide reviews with multiple flags
    // 4. Update restaurant stats if review was unflagged

    return NextResponse.json({ 
      review,
      message: flagged ? 'Review flagged for moderation' : 'Review unflagged'
    })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
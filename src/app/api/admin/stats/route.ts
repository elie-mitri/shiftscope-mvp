// src/app/api/admin/stats/route.ts
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

    // Get statistics
    const [
      { count: totalRestaurants },
      { count: totalReviews },
      { count: totalUsers }
    ] = await Promise.all([
      supabase.from('restaurants').select('*', { count: 'exact', head: true }),
      supabase.from('reviews').select('*', { count: 'exact', head: true }),
      supabase.from('profiles').select('*', { count: 'exact', head: true })
    ])

    // For now, set flagged reviews to 0 since column doesn't exist
    const flaggedReviews = 0

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    
    const [
      { count: recentReviews },
      { count: recentRestaurants }
    ] = await Promise.all([
      supabase
        .from('reviews')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo),
      supabase
        .from('restaurants')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo)
    ])

    return NextResponse.json({
      stats: {
        totalRestaurants: totalRestaurants || 0,
        totalReviews: totalReviews || 0,
        flaggedReviews: flaggedReviews || 0,
        totalUsers: totalUsers || 0,
        recentReviews: recentReviews || 0,
        recentRestaurants: recentRestaurants || 0
      }
    })

  } catch (error) {
    console.error('Admin stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
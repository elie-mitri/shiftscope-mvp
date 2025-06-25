// src/app/api/restaurants/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { RestaurantFilters, InsertRestaurant } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    
    // Extract filter parameters
    const filters: RestaurantFilters = {
      neighborhood: searchParams.get('neighborhood') || undefined,
      cuisine_type: searchParams.get('cuisine_type') || undefined,
      min_rating: searchParams.get('min_rating') ? parseFloat(searchParams.get('min_rating')!) : undefined,
      search: searchParams.get('search') || undefined,
    }
    
    const borough = searchParams.get('borough')
    const sortBy = searchParams.get('sort') || 'newest'
    const hasReviews = searchParams.get('has_reviews') === 'true'

    let query = supabase
      .from('restaurants')
      .select(`
        *,
        reviews(count)
      `)

    // Apply filters (case insensitive)
    if (filters.neighborhood) {
      query = query.ilike('neighborhood', `%${filters.neighborhood}%`)
    }

    if (filters.cuisine_type) {
      query = query.eq('cuisine_type', filters.cuisine_type)
    }

    if (filters.min_rating) {
      query = query.gte('average_rating', filters.min_rating)
    }

    if (borough) {
      query = query.eq('borough', borough)
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,address.ilike.%${filters.search}%,neighborhood.ilike.%${filters.search}%`)
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        query = query.order('name', { ascending: true })
        break
      case 'rating':
        query = query.order('average_rating', { ascending: false, nullsLast: true })
        break
      case 'review_count':
        query = query.order('total_reviews', { ascending: false, nullsLast: true })
        break
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false })
        break
    }

    const { data: restaurants, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch restaurants' },
        { status: 500 }
      )
    }

    // Apply client-side filters for complex logic
    let filteredRestaurants = restaurants || []

    // Filter by minimum rating (only if restaurant has reviews)
    if (filters.min_rating) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.average_rating && restaurant.average_rating >= filters.min_rating!
      )
    }

    // Filter by has reviews
    if (hasReviews) {
      filteredRestaurants = filteredRestaurants.filter(restaurant => 
        restaurant.reviews && restaurant.reviews.length > 0
      )
    }

    return NextResponse.json({ restaurants: filteredRestaurants })

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
    const supabase = await createServerClient()
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // For now, only allow authenticated users to create restaurants
    // In production, you might want to restrict this to admins only
    const body = await request.json()
    
    const restaurantData: InsertRestaurant = {
      name: body.name,
      address: body.address,
      neighborhood: body.neighborhood,
      cuisine_type: body.cuisine_type,
      phone: body.phone,
      website: body.website,
      total_reviews: 0,
      average_rating: null
    }

    const { data: restaurant, error } = await supabase
      .from('restaurants')
      .insert(restaurantData)
      .select()
      .single()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create restaurant' },
        { status: 500 }
      )
    }

    return NextResponse.json({ restaurant }, { status: 201 })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
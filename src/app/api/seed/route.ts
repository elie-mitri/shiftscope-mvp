import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function POST() {
  try {
    const supabase = await createServerClient()
    
    // Simple test data
    const restaurants = [
      {
        name: 'Joe\'s Pizza',
        address: '14 Carmine St, New York, NY 10014',
        neighborhood: 'West Village',
        cuisine_type: 'Pizza',
        total_reviews: 1,
        average_rating: 4.0
      },
      {
        name: 'Katz\'s Delicatessen', 
        address: '205 E Houston St, New York, NY 10002',
        neighborhood: 'Lower East Side',
        cuisine_type: 'Deli',
        total_reviews: 1,
        average_rating: 5.0
      }
    ]
    
    const { data, error } = await supabase
      .from('restaurants')
      .insert(restaurants)
      .select()
    
    if (error && error.code !== '23505') {
      throw error
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Sample restaurants added!',
      count: restaurants.length
    })
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to seed data' },
      { status: 500 }
    )
  }
}
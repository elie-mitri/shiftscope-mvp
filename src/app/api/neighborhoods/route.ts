// src/app/api/neighborhoods/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { InsertNeighborhood } from '@/lib/types'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient()
    const { searchParams } = new URL(request.url)
    const borough = searchParams.get('borough')

    let query = supabase
      .from('neighborhoods')
      .select('*')
      .order('name', { ascending: true })

    if (borough) {
      query = query.eq('borough', borough)
    }

    const { data: neighborhoods, error } = await query

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch neighborhoods' },
        { status: 500 }
      )
    }

    return NextResponse.json({ neighborhoods })

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

    const body = await request.json()
    
    if (!body.name || !body.borough) {
      return NextResponse.json(
        { error: 'Name and borough are required' },
        { status: 400 }
      )
    }

    const neighborhoodData: InsertNeighborhood = {
      name: body.name,
      borough: body.borough
    }

    const { data: neighborhood, error } = await supabase
      .from('neighborhoods')
      .insert(neighborhoodData)
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json(
          { error: 'Neighborhood already exists' },
          { status: 409 }
        )
      }
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to create neighborhood' },
        { status: 500 }
      )
    }

    return NextResponse.json({ neighborhood }, { status: 201 })

  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
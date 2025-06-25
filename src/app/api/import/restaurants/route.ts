// src/app/api/import/restaurants/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { isAdmin } from '@/lib/admin'

interface GooglePlacesResult {
  place_id: string
  name: string
  formatted_address: string
  geometry: {
    location: {
      lat: number
      lng: number
    }
  }
  price_level?: number
  rating?: number
  types: string[]
  photos?: Array<{
    photo_reference: string
  }>
}

interface GooglePlacesResponse {
  results: GooglePlacesResult[]
  next_page_token?: string
  status: string
}

export async function POST(request: NextRequest) {
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

    const body = await request.json()
    const { neighborhood = 'Williamsburg', location = 'Williamsburg, Brooklyn, NY' } = body

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Google Places API key not configured' },
        { status: 500 }
      )
    }

    // First, get the neighborhood coordinates
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${apiKey}`
    const geocodeResponse = await fetch(geocodeUrl)
    const geocodeData = await geocodeResponse.json()

    if (geocodeData.status !== 'OK' || !geocodeData.results.length) {
      return NextResponse.json(
        { error: 'Could not geocode location' },
        { status: 400 }
      )
    }

    const { lat, lng } = geocodeData.results[0].geometry.location

    // Search for restaurants in the area with pagination
    let allRestaurants: GooglePlacesResult[] = []
    let nextPageToken: string | undefined
    let pageCount = 0
    const maxPages = 5 // Limit to 100 restaurants max to stay within quota

    do {
      let searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=2000&type=restaurant&key=${apiKey}`
      if (nextPageToken) {
        searchUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${apiKey}`
        // Wait 2 seconds before using page token (Google requirement)
        await new Promise(resolve => setTimeout(resolve, 2000))
      }

      const searchResponse = await fetch(searchUrl)
      const searchData: GooglePlacesResponse = await searchResponse.json()

      if (searchData.status !== 'OK') {
        if (pageCount === 0) {
          return NextResponse.json(
            { error: `Google Places API error: ${searchData.status}` },
            { status: 500 }
          )
        }
        break // Stop pagination if error on subsequent pages
      }

      allRestaurants = allRestaurants.concat(searchData.results)
      nextPageToken = searchData.next_page_token
      pageCount++
      
      console.log(`Page ${pageCount}: Found ${searchData.results.length} restaurants`)

    } while (nextPageToken && pageCount < maxPages)

    console.log(`Found ${allRestaurants.length} total restaurants in ${neighborhood}`)

    // Transform and insert restaurant data
    const insertedRestaurants = []
    const errors = []

    for (const place of allRestaurants) {
      try {
        // Get detailed place information
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,formatted_phone_number,website,price_level,rating,types,geometry&key=${apiKey}`
        const detailsResponse = await fetch(detailsUrl)
        const detailsData = await detailsResponse.json()

        if (detailsData.status === 'OK' && detailsData.result) {
          const details = detailsData.result

          // Determine cuisine type from Google Places types
          const cuisineMapping: Record<string, string> = {
            'pizza': 'Pizza',
            'italian': 'Italian',
            'chinese': 'Chinese',
            'mexican': 'Mexican',
            'japanese': 'Japanese',
            'thai': 'Thai',
            'indian': 'Indian',
            'mediterranean': 'Mediterranean',
            'greek': 'Greek',
            'american': 'American',
            'french': 'French',
            'korean': 'Korean',
            'vietnamese': 'Vietnamese',
            'steakhouse': 'Steakhouse',
            'seafood': 'Seafood',
            'vegetarian': 'Vegetarian',
            'deli': 'Deli',
            'bakery': 'Bakery',
            'cafe': 'Cafe'
          }

          let cuisineType = 'American' // default
          for (const type of details.types || []) {
            const lowerType = type.toLowerCase()
            if (cuisineMapping[lowerType]) {
              cuisineType = cuisineMapping[lowerType]
              break
            }
          }

          // Parse address for neighborhood/borough
          const addressParts = details.formatted_address?.split(', ') || []
          const hasWilliamsburg = details.formatted_address?.toLowerCase().includes('williamsburg')
          const hasBrooklyn = details.formatted_address?.toLowerCase().includes('brooklyn')

          // Only include if it's actually in Williamsburg/Brooklyn
          if (!hasWilliamsburg && !hasBrooklyn) {
            continue
          }

          const restaurantData = {
            id: crypto.randomUUID(),
            name: details.name,
            address: details.formatted_address,
            neighborhood: neighborhood,
            borough: 'Brooklyn',
            cuisine_type: cuisineType,
            phone: details.formatted_phone_number || null,
            website: details.website || null,
            google_place_id: place.place_id,
            latitude: details.geometry?.location?.lat || null,
            longitude: details.geometry?.location?.lng || null,
            google_rating: details.rating || null,
            price_level: details.price_level || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }

          // Check if restaurant already exists
          const { data: existing } = await supabase
            .from('restaurants')
            .select('id')
            .eq('google_place_id', place.place_id)
            .single()

          if (!existing) {
            const { data, error } = await supabase
              .from('restaurants')
              .insert([restaurantData])
              .select()

            if (error) {
              console.error('Error inserting restaurant:', error)
              errors.push({ restaurant: details.name, error: error.message })
            } else {
              insertedRestaurants.push(data[0])
              console.log(`Inserted: ${details.name}`)
            }
          } else {
            console.log(`Skipped existing: ${details.name}`)
          }
        }

        // Rate limiting - wait 100ms between requests
        await new Promise(resolve => setTimeout(resolve, 100))

      } catch (error) {
        console.error('Error processing place:', error)
        errors.push({ restaurant: place.name, error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }

    return NextResponse.json({
      message: `Successfully imported ${insertedRestaurants.length} restaurants`,
      imported: insertedRestaurants.length,
      errors: errors.length,
      errorDetails: errors.slice(0, 5), // Return first 5 errors
      restaurants: insertedRestaurants.slice(0, 10) // Return first 10 restaurants
    })

  } catch (error) {
    console.error('Restaurant import error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
// src/lib/seed-data.ts
import { createClient } from '@/lib/supabase/client'
import { InsertRestaurant, InsertNeighborhood, InsertReview, InsertProfile } from '@/lib/types'

// NYC Neighborhoods data
export const neighborhoodsData: InsertNeighborhood[] = [
  // Manhattan
  { name: 'East Village', borough: 'Manhattan' },
  { name: 'West Village', borough: 'Manhattan' },
  { name: 'SoHo', borough: 'Manhattan' },
  { name: 'Lower East Side', borough: 'Manhattan' },
  { name: 'Midtown', borough: 'Manhattan' },
  { name: 'Upper East Side', borough: 'Manhattan' },
  { name: 'Upper West Side', borough: 'Manhattan' },
  { name: 'Tribeca', borough: 'Manhattan' },
  { name: 'Chelsea', borough: 'Manhattan' },
  { name: 'Hell\'s Kitchen', borough: 'Manhattan' },
  
  // Brooklyn
  { name: 'Williamsburg', borough: 'Brooklyn' },
  { name: 'Park Slope', borough: 'Brooklyn' },
  { name: 'DUMBO', borough: 'Brooklyn' },
  { name: 'Brooklyn Heights', borough: 'Brooklyn' },
  { name: 'Bushwick', borough: 'Brooklyn' },
  { name: 'Red Hook', borough: 'Brooklyn' },
  
  // Queens
  { name: 'Astoria', borough: 'Queens' },
  { name: 'Long Island City', borough: 'Queens' },
  { name: 'Flushing', borough: 'Queens' },
  
  // Bronx
  { name: 'South Bronx', borough: 'Bronx' },
  { name: 'Fordham', borough: 'Bronx' },
  
  // Staten Island
  { name: 'St. George', borough: 'Staten Island' }
]

// Sample restaurants data
export const restaurantsData: InsertRestaurant[] = [
  {
    name: 'Joe\'s Pizza',
    address: '14 Carmine St, New York, NY 10014',
    neighborhood: 'West Village',
    cuisine_type: 'Pizza',
    phone: '(212) 366-1182',
    website: 'https://joespizzanyc.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Katz\'s Delicatessen',
    address: '205 E Houston St, New York, NY 10002',
    neighborhood: 'Lower East Side',
    cuisine_type: 'Deli',
    phone: '(212) 254-2246',
    website: 'https://katzsdelicatessen.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Peter Luger Steak House',
    address: '178 Broadway, Brooklyn, NY 11249',
    neighborhood: 'Williamsburg',
    cuisine_type: 'Steakhouse',
    phone: '(718) 387-7400',
    website: 'https://peterluger.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Gramercy Tavern',
    address: '42 E 20th St, New York, NY 10003',
    neighborhood: 'Midtown',
    cuisine_type: 'American',
    phone: '(212) 477-0777',
    website: 'https://gramercytavern.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Xi\'an Famous Foods',
    address: '24 W 8th St, New York, NY 10011',
    neighborhood: 'East Village',
    cuisine_type: 'Chinese',
    phone: '(212) 786-2068',
    website: 'https://xianfoods.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'The Spotted Pig',
    address: '314 W 11th St, New York, NY 10014',
    neighborhood: 'West Village',
    cuisine_type: 'Gastropub',
    phone: '(212) 620-0393',
    website: null,
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Blue Hill',
    address: '75 Washington Pl, New York, NY 10011',
    neighborhood: 'West Village',
    cuisine_type: 'American',
    phone: '(212) 539-1776',
    website: 'https://bluehillfarm.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Roberta\'s',
    address: '261 Moore St, Brooklyn, NY 11206',
    neighborhood: 'Bushwick',
    cuisine_type: 'Pizza',
    phone: '(718) 417-1118',
    website: 'https://robertaspizza.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Momofuku Noodle Bar',
    address: '171 1st Ave, New York, NY 10003',
    neighborhood: 'East Village',
    cuisine_type: 'Asian',
    phone: '(212) 777-7773',
    website: 'https://momofuku.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Prince Street Pizza',
    address: '27 Prince St, New York, NY 10012',
    neighborhood: 'SoHo',
    cuisine_type: 'Pizza',
    phone: '(212) 966-4100',
    website: 'https://princestreetpizza.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Marea',
    address: '240 Central Park S, New York, NY 10019',
    neighborhood: 'Midtown',
    cuisine_type: 'Italian',
    phone: '(212) 582-5100',
    website: 'https://marea-nyc.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'The Halal Guys',
    address: '307 E 14th St, New York, NY 10003',
    neighborhood: 'East Village',
    cuisine_type: 'Middle Eastern',
    phone: '(212) 254-8804',
    website: 'https://thehalalguys.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Taverna Kyclades',
    address: '33-07 Ditmars Blvd, Astoria, NY 11105',
    neighborhood: 'Astoria',
    cuisine_type: 'Greek',
    phone: '(718) 545-8666',
    website: null,
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Junior\'s Restaurant',
    address: '386 Flatbush Ave Ext, Brooklyn, NY 11201',
    neighborhood: 'Brooklyn Heights',
    cuisine_type: 'American',
    phone: '(718) 852-5257',
    website: 'https://juniorscheesecake.com',
    total_reviews: 0,
    average_rating: null
  },
  {
    name: 'Smorgasburg Vendor Stand',
    address: 'East River State Park, Brooklyn, NY 11249',
    neighborhood: 'Williamsburg',
    cuisine_type: 'Food Market',
    phone: null,
    website: 'https://smorgasburg.com',
    total_reviews: 0,
    average_rating: null
  }
]

// Sample review data (will be added after we create test users)
export const sampleReviews = [
  {
    restaurant_name: 'Joe\'s Pizza',
    management_rating: 4,
    work_life_balance_rating: 3,
    pay_tipping_rating: 3,
    scheduling_rating: 4,
    overall_rating: 4,
    review_text: 'Fast-paced environment but management is pretty fair. Tips are decent on busy nights. Schedule is flexible for students.',
    worker_role: 'Server',
    date_worked: '2024-08-15',
    employment_duration: '6-12 months',
    would_recommend: true
  },
  {
    restaurant_name: 'Katz\'s Delicatessen',
    management_rating: 5,
    work_life_balance_rating: 4,
    pay_tipping_rating: 5,
    scheduling_rating: 4,
    overall_rating: 5,
    review_text: 'Iconic place to work! Management treats you like family. Tourist tips are amazing. Can get exhausting during peak hours but worth it.',
    worker_role: 'Server',
    date_worked: '2024-09-20',
    employment_duration: '1-2 years',
    would_recommend: true
  },
  {
    restaurant_name: 'Peter Luger Steak House',
    management_rating: 3,
    work_life_balance_rating: 2,
    pay_tipping_rating: 5,
    scheduling_rating: 2,
    overall_rating: 3,
    review_text: 'Old school management style - very strict. Long hours, high pressure, but the money is excellent. Not for everyone.',
    worker_role: 'Server',
    date_worked: '2024-07-10',
    employment_duration: '3-6 months',
    would_recommend: false
  },
  {
    restaurant_name: 'Gramercy Tavern',
    management_rating: 5,
    work_life_balance_rating: 4,
    pay_tipping_rating: 4,
    scheduling_rating: 5,
    overall_rating: 5,
    review_text: 'Professional environment with excellent training. Management invests in your growth. Great place to build fine dining skills.',
    worker_role: 'Server',
    date_worked: '2024-10-05',
    employment_duration: 'More than 2 years',
    would_recommend: true
  },
  {
    restaurant_name: 'Xi\'an Famous Foods',
    management_rating: 4,
    work_life_balance_rating: 4,
    pay_tipping_rating: 3,
    scheduling_rating: 4,
    overall_rating: 4,
    review_text: 'Good work environment, management is understanding. Fast casual so tips aren\'t huge but hourly pay is fair.',
    worker_role: 'Cook',
    date_worked: '2024-06-18',
    employment_duration: '1-3 months',
    would_recommend: true
  }
]

export async function seedNeighborhoods() {
  const supabase = createClient()
  
  console.log('Seeding neighborhoods...')
  
  const { data, error } = await supabase
    .from('neighborhoods')
    .insert(neighborhoodsData)
    .select()
  
  if (error) {
    console.error('Error seeding neighborhoods:', error)
    return null
  }
  
  console.log(`Successfully seeded ${data.length} neighborhoods`)
  return data
}

export async function seedRestaurants() {
  const supabase = createClient()
  
  console.log('Seeding restaurants...')
  
  const { data, error } = await supabase
    .from('restaurants')
    .insert(restaurantsData)
    .select()
  
  if (error) {
    console.error('Error seeding restaurants:', error)
    return null
  }
  
  console.log(`Successfully seeded ${data.length} restaurants`)
  return data
}

export async function seedReviews(restaurantData: any[], testUserId: string) {
  const supabase = createClient()
  
  console.log('Seeding reviews...')
  
  const reviewsToInsert: InsertReview[] = []
  
  for (const reviewTemplate of sampleReviews) {
    const restaurant = restaurantData.find(r => r.name === reviewTemplate.restaurant_name)
    if (restaurant) {
      reviewsToInsert.push({
        restaurant_id: restaurant.id,
        user_id: testUserId,
        management_rating: reviewTemplate.management_rating,
        work_life_balance_rating: reviewTemplate.work_life_balance_rating,
        pay_tipping_rating: reviewTemplate.pay_tipping_rating,
        scheduling_rating: reviewTemplate.scheduling_rating,
        overall_rating: reviewTemplate.overall_rating,
        review_text: reviewTemplate.review_text,
        worker_role: reviewTemplate.worker_role,
        date_worked: reviewTemplate.date_worked,
        employment_duration: reviewTemplate.employment_duration,
        would_recommend: reviewTemplate.would_recommend,
        flagged: false
      })
    }
  }
  
  const { data, error } = await supabase
    .from('reviews')
    .insert(reviewsToInsert)
    .select()
  
  if (error) {
    console.error('Error seeding reviews:', error)
    return null
  }
  
  console.log(`Successfully seeded ${data.length} reviews`)
  return data
}

export async function createTestUser() {
  const supabase = createClient()
  
  // Create a test profile (assuming you have a test user ID from auth)
  const testProfile: InsertProfile = {
    id: crypto.randomUUID(), // This would normally be from Supabase auth
    email: 'test@shiftscope.com',
    anonymous_display_name: 'Anonymous Server 123',
    role: 'worker'
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .insert(testProfile)
    .select()
    .single()
  
  if (error) {
    console.error('Error creating test user:', error)
    return null
  }
  
  console.log('Created test user profile')
  return data
}
// src/scripts/seed-database.ts
import { seedNeighborhoods, seedRestaurants, seedReviews, createTestUser } from '@/lib/seed-data'

async function main() {
  console.log('🌱 Starting database seeding...')
  
  try {
    // 1. Seed neighborhoods first
    await seedNeighborhoods()
    
    // 2. Seed restaurants
    const restaurants = await seedRestaurants()
    
    if (restaurants) {
      // 3. Create a test user profile
      const testUser = await createTestUser()
      
      if (testUser) {
        // 4. Seed some reviews
        await seedReviews(restaurants, testUser.id)
      }
    }
    
    console.log('✅ Database seeding completed successfully!')
    console.log('🏠 Go to http://localhost:3000 to see your populated homepage!')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  }
}

main()
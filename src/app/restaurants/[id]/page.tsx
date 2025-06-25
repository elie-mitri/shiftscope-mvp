// src/app/restaurants/[id]/page.tsx
import { Suspense } from 'react'
import { RestaurantDetail } from '@/components/restaurants/restaurant-detail'
import { ReviewsList } from '@/components/restaurants/reviews-list'

interface RestaurantPageProps {
  params: Promise<{ id: string }>
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { id } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div>Loading restaurant...</div>}>
          <RestaurantDetail restaurantId={id} />
        </Suspense>

        <Suspense fallback={<div>Loading reviews...</div>}>
          <ReviewsList restaurantId={id} />
        </Suspense>
      </div>
    </div>
  )
}
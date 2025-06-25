// src/app/reviews/new/page.tsx
import { Suspense } from 'react'
import { ReviewForm } from '@/components/reviews/review-form'

interface ReviewNewPageProps {
  searchParams: Promise<{ restaurant?: string }>
}

export default async function ReviewNewPage({ searchParams }: ReviewNewPageProps) {
  const { restaurant } = await searchParams

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Write a Review
          </h1>
          <p className="text-gray-600">
            Share your experience working at this restaurant to help other workers make informed decisions.
          </p>
        </div>

        <Suspense fallback={<div>Loading form...</div>}>
          <ReviewForm preselectedRestaurantId={restaurant} />
        </Suspense>
      </div>
    </div>
  )
}
// src/app/dashboard/page.tsx
import { Suspense } from 'react'
import { UserStats } from '@/components/dashboard/user-stats'
import { UserReviews } from '@/components/dashboard/user-reviews'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Dashboard
          </h1>
          <p className="text-gray-600">
            Track your reviews and activity on ShiftScope
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Section */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading stats...</div>}>
              <UserStats />
            </Suspense>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-2">
            <Suspense fallback={<div>Loading reviews...</div>}>
              <UserReviews />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
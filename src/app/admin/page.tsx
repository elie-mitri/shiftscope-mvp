// src/app/admin/page.tsx
import { Suspense } from 'react'
import { AdminStats } from '@/components/admin/admin-stats'
import { AdminClaims } from '@/components/admin/admin-claims'
import { AdminReviews } from '@/components/admin/admin-reviews'
import { RestaurantImport } from '@/components/admin/restaurant-import'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Platform moderation and management tools
          </p>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <Suspense fallback={<div>Loading stats...</div>}>
            <AdminStats />
          </Suspense>
        </div>

        {/* Restaurant Import */}
        <div className="mb-8">
          <RestaurantImport />
        </div>

        {/* Business Claims */}
        <div className="mb-8">
          <Suspense fallback={<div>Loading claims...</div>}>
            <AdminClaims />
          </Suspense>
        </div>

        {/* Reviews Moderation */}
        <div>
          <Suspense fallback={<div>Loading reviews...</div>}>
            <AdminReviews />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
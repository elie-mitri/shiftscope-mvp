// src/components/home/cta-section.tsx
import Link from 'next/link'

export function CTASection() {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">
          Ready to Share Your Experience?
        </h2>
        <p className="mt-4 text-xl text-blue-100 max-w-2xl mx-auto">
          Help fellow restaurant workers by sharing your honest workplace experience. 
          Your review stays anonymous and helps others make informed decisions.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
          <Link
            href="/reviews/new"
            className="inline-flex items-center px-8 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-blue-500 transition-colors"
          >
            Write a Review
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">100%</div>
            <div className="text-blue-100">Anonymous</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">NYC</div>
            <div className="text-blue-100">Focused</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">Worker</div>
            <div className="text-blue-100">Owned</div>
          </div>
        </div>
      </div>
    </section>
  )
}
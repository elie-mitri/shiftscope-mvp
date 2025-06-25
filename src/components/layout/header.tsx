// src/components/layout/header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthButton } from '@/components/auth/auth-button'
import { User } from '@supabase/supabase-js'
import { isAdmin } from '@/lib/admin'

interface HeaderProps {
  user: User | null
}

export function Header({ user }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShiftScope
            </Link>
            <span className="ml-2 text-sm text-gray-500">NYC</span>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/restaurants" className="text-gray-600 hover:text-gray-900">
              Browse Restaurants
            </a>
            <a href="/about" className="text-gray-600 hover:text-gray-900">
              About
            </a>
            <a href="/reviews/new" className="text-gray-600 hover:text-gray-900">
              Write Review
            </a>
            {user && (
              <a href="/dashboard" className="text-gray-600 hover:text-gray-900">
                My Dashboard
              </a>
            )}
            {user && isAdmin(user) && (
              <a href="/admin" className="text-orange-600 hover:text-orange-800 font-medium">
                Admin
              </a>
            )}
          </nav>
          
          <div className="flex items-center">
            <div className="hidden md:block">
              <AuthButton user={user} />
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <a
                href="/restaurants"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Restaurants
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="/reviews/new"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write Review
              </a>
              {user && (
                <a
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Dashboard
                </a>
              )}
              {user && isAdmin(user) && (
                <a
                  href="/admin"
                  className="block px-3 py-2 text-base font-medium text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </a>
              )}
              <div className="pt-3 border-t border-gray-200">
                <AuthButton user={user} />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
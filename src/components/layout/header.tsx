// src/components/layout/header.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthButton } from '@/components/auth/auth-button'
import { PersistentSearch } from '@/components/layout/persistent-search'
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
        {/* Mobile-First Layout */}
        <div className="md:hidden">
          {/* Top Row: Logo, Browse Button, Hamburger */}
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">ShiftScope</span>
              <span className="ml-2 text-sm text-gray-500">NYC</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <Link 
                href="/restaurants" 
                className="px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Browse
              </Link>
              
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500"
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
          
          {/* Search Bar Row - Always Visible */}
          <div className="pb-3">
            <PersistentSearch className="w-full" />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShiftScope
            </Link>
            <span className="ml-2 text-sm text-gray-500">NYC</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            <PersistentSearch className="w-80" />
            
            <nav className="flex space-x-8">
              <Link href="/restaurants" className="text-gray-600 hover:text-gray-900 font-medium">
                Browse Restaurants
              </Link>
              <Link href="/reviews/new" className="text-gray-600 hover:text-gray-900">
                Write Review
              </Link>
              {user && (
                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </Link>
              )}
              {user && isAdmin(user) && (
                <Link href="/admin" className="text-orange-600 hover:text-orange-800 font-medium">
                  Admin
                </Link>
              )}
            </nav>
            
            <AuthButton user={user} />
          </div>
        </div>

        {/* Mobile Navigation - Only Less Important Items */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link
                href="/reviews/new"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Write Review
              </Link>
              {user && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Dashboard
                </Link>
              )}
              {user && isAdmin(user) && (
                <Link
                  href="/admin"
                  className="block px-3 py-2 text-base font-medium text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
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
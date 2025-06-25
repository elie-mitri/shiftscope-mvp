// src/lib/admin.ts
import { User } from '@supabase/supabase-js'

// Admin emails - add your email here to gain admin access
const ADMIN_EMAILS = [
  'admin@shiftscope.com', 
  'eliemitri1@gmail.com'
  // Add the user's actual email for testing
  // You can update this with your real email address
]

export function isAdmin(user: User | null): boolean {
  if (!user?.email) return false
  return ADMIN_EMAILS.includes(user.email.toLowerCase())
}

export function requireAdmin(user: User | null): void {
  if (!isAdmin(user)) {
    throw new Error('Admin access required')
  }
}
// Database Types for Supabase Integration

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          anonymous_display_name: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          anonymous_display_name?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          anonymous_display_name?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      restaurants: {
        Row: {
          id: string
          name: string
          address: string | null
          neighborhood: string | null
          borough: string | null
          cuisine_type: string | null
          phone: string | null
          website: string | null
          google_place_id: string | null
          latitude: number | null
          longitude: number | null
          google_rating: number | null
          price_level: number | null
          created_at: string
          updated_at: string | null
          average_rating: number | null
          total_reviews: number
        }
        Insert: {
          id?: string
          name: string
          address?: string | null
          neighborhood?: string | null
          borough?: string | null
          cuisine_type?: string | null
          phone?: string | null
          website?: string | null
          google_place_id?: string | null
          latitude?: number | null
          longitude?: number | null
          google_rating?: number | null
          price_level?: number | null
          created_at?: string
          updated_at?: string | null
          average_rating?: number | null
          total_reviews?: number
        }
        Update: {
          id?: string
          name?: string
          address?: string | null
          neighborhood?: string | null
          borough?: string | null
          cuisine_type?: string | null
          phone?: string | null
          website?: string | null
          google_place_id?: string | null
          latitude?: number | null
          longitude?: number | null
          google_rating?: number | null
          price_level?: number | null
          created_at?: string
          updated_at?: string | null
          average_rating?: number | null
          total_reviews?: number
        }
      }
      reviews: {
        Row: {
          id: string
          restaurant_id: string
          user_id: string
          management_rating: number
          work_life_balance_rating: number
          pay_tipping_rating: number
          scheduling_rating: number
          overall_rating: number
          review_text: string | null
          worker_role: string | null
          date_worked: string | null
          employment_duration: string | null
          would_recommend: boolean | null
          flagged: boolean
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id?: string
          restaurant_id: string
          user_id: string
          management_rating: number
          work_life_balance_rating: number
          pay_tipping_rating: number
          scheduling_rating: number
          overall_rating: number
          review_text?: string | null
          worker_role?: string | null
          date_worked?: string | null
          employment_duration?: string | null
          would_recommend?: boolean | null
          flagged?: boolean
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          restaurant_id?: string
          user_id?: string
          management_rating?: number
          work_life_balance_rating?: number
          pay_tipping_rating?: number
          scheduling_rating?: number
          overall_rating?: number
          review_text?: string | null
          worker_role?: string | null
          date_worked?: string | null
          employment_duration?: string | null
          would_recommend?: boolean | null
          flagged?: boolean
          created_at?: string
          updated_at?: string | null
        }
      }
      neighborhoods: {
        Row: {
          id: string
          name: string
          borough: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          borough: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          borough?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Convenience types for easier use
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Restaurant = Database['public']['Tables']['restaurants']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Neighborhood = Database['public']['Tables']['neighborhoods']['Row']

export type InsertProfile = Database['public']['Tables']['profiles']['Insert']
export type InsertRestaurant = Database['public']['Tables']['restaurants']['Insert']
export type InsertReview = Database['public']['Tables']['reviews']['Insert']
export type InsertNeighborhood = Database['public']['Tables']['neighborhoods']['Insert']

export type UpdateProfile = Database['public']['Tables']['profiles']['Update']
export type UpdateRestaurant = Database['public']['Tables']['restaurants']['Update']
export type UpdateReview = Database['public']['Tables']['reviews']['Update']

// Enhanced types with joins
export type ReviewWithProfile = Review & {
  profiles: Pick<Profile, 'anonymous_display_name'>
}

export type RestaurantWithReviews = Restaurant & {
  reviews: Review[]
}

export type RestaurantWithStats = Restaurant & {
  average_management_rating: number | null
  average_work_life_balance_rating: number | null
  average_pay_tipping_rating: number | null
  average_scheduling_rating: number | null
}

// Filter and query types
export interface RestaurantFilters {
  neighborhood?: string
  cuisine_type?: string
  min_rating?: number
  search?: string
}

export interface ReviewFilters {
  restaurant_id?: string
  min_rating?: number
  worker_role?: string
  limit?: number
  offset?: number
}

// Worker role options
export const WORKER_ROLES = [
  'Server',
  'Bartender', 
  'Host/Hostess',
  'Cook/Chef',
  'Busser',
  'Kitchen Staff',
  'Manager',
  'Delivery Driver',
  'Other'
] as const

export type WorkerRole = typeof WORKER_ROLES[number]

// NYC Boroughs
export const NYC_BOROUGHS = [
  'Manhattan',
  'Brooklyn', 
  'Queens',
  'Bronx',
  'Staten Island'
] as const

export type Borough = typeof NYC_BOROUGHS[number]

// Employment duration options
export const EMPLOYMENT_DURATIONS = [
  'Less than 1 month',
  '1-3 months',
  '3-6 months', 
  '6-12 months',
  '1-2 years',
  'More than 2 years'
] as const

export type EmploymentDuration = typeof EMPLOYMENT_DURATIONS[number]
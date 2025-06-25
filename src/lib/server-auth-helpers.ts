// src/lib/server-auth-helpers.ts
import { createServerClient } from '@/lib/supabase/server'
import { Profile, InsertProfile } from '@/lib/types'
import { generateAnonymousName } from '@/lib/auth-helpers'

export async function getOrCreateProfile(userId: string, email?: string): Promise<Profile | null> {
  try {
    const supabase = await createServerClient()
    
    // First, try to get existing profile
    const { data: existingProfile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (existingProfile && !fetchError) {
      return existingProfile
    }

    // If profile doesn't exist, create it
    if (fetchError?.code === 'PGRST116') {
      const newProfile: InsertProfile = {
        id: userId,
        email: email || null,
        anonymous_display_name: generateAnonymousName(),
        role: 'worker'
      }

      const { data: createdProfile, error: createError } = await supabase
        .from('profiles')
        .insert(newProfile)
        .select()
        .single()

      if (createError) {
        console.error('Error creating profile:', createError)
        return null
      }

      return createdProfile
    }

    console.error('Error fetching profile:', fetchError)
    return null

  } catch (error) {
    console.error('Error in getOrCreateProfile:', error)
    return null
  }
}

export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const supabase = await createServerClient()
    
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) {
      console.error('Error fetching user profile:', error)
      return null
    }

    return profile

  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}
import { createClient } from '@/src/lib/supabase/server'
import { cache } from 'react'

/**
 * Get the current authenticated user session
 * Cached to prevent multiple calls in a single render
 */
export const getSession = cache(async () => {
  const supabase = await createClient()
  
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error fetching session:', error)
      return null
    }
    
    return session
  } catch (error) {
    console.error('Unexpected error fetching session:', error)
    return null
  }
})

/**
 * Get the current authenticated user
 * Cached to prevent multiple calls in a single render
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient()
  
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    
    if (error) {
      console.error('Error fetching user:', error)
      return null
    }
    
    return user
  } catch (error) {
    console.error('Unexpected error fetching user:', error)
    return null
  }
})

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser()
  return !!user
}

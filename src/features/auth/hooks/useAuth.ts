'use client'

import { createClient } from '@/src/lib/supabase/client'
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { setCredentials, setLoading, selectCurrentUser, selectIsAuthenticated, selectAuthLoading } from '@/src/store/slices/authSlice'
import { useEffect } from 'react'

/**
 * Hook to get the current authenticated user and listen to auth state changes
 * Integrates with Redux for global state management
 */
export function useAuth() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const loading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    const supabase = createClient()

    // Get initial session
    const initializeAuth = async () => {
      try {
        dispatch(setLoading(true))
        const { data: { user } } = await supabase.auth.getUser()
        dispatch(setCredentials(user))
      } catch (error) {
        console.error('Error initializing auth:', error)
        dispatch(setCredentials(null))
      }
    }

    initializeAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      dispatch(setCredentials(session?.user ?? null))
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [dispatch])

  return {
    user,
    loading,
    isAuthenticated,
  }
}

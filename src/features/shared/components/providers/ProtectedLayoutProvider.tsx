'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from '@/src/store/hooks'
import { logoutAction } from '@/src/store/slices/authSlice'
import { setupLogoutBroadcast } from '@/src/lib/broadcast'
import { routes } from '@/src/config/routes'

interface ProtectedLayoutProviderProps {
  children: React.ReactNode
  isProtectedRoute?: boolean
}

/**
 * Client-side provider for protected routes
 * Sets up cross-tab logout broadcast listener
 */
export function ProtectedLayoutProvider({
  children,
  isProtectedRoute = true,
}: ProtectedLayoutProviderProps) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleLogout = () => {
      // Clear Redux state
      dispatch(logoutAction())

      // Redirect to login
      router.push(routes.auth.login)
      router.refresh()
    }

    // Setup broadcast channel listener
    const cleanup = setupLogoutBroadcast(handleLogout, isProtectedRoute, queryClient)

    return cleanup
  }, [router, queryClient, dispatch, isProtectedRoute])

  return <>{children}</>
}

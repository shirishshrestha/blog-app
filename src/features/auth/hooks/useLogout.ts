'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../api/auth.client'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/config/routes'
import { useAppDispatch } from '@/src/store/hooks'
import { logoutAction } from '@/src/store/slices/authSlice'
import { broadcastLogout } from '@/src/lib/broadcast'

/**
 * Hook for logout mutation with TanStack Query and Redux
 */
export function useLogout() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      // Clear Redux state
      dispatch(logoutAction())

      // Clear all cached queries
      queryClient.clear()

      // Broadcast logout to other tabs
      broadcastLogout()

      // Redirect to login page
      router.push(routes.auth.login)
      router.refresh()
    },
    onError: (error: Error) => {
      console.error('Logout error:', error)
    },
  })
}

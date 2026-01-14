'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login, type LoginCredentials } from '../api/auth.client'
import { useRouter } from 'next/navigation'
import { routes } from '@/src/config/routes'

/**
 * Hook for login mutation with TanStack Query
 */
export function useLogin() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
    onSuccess: () => {
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['session'] })
      
      // Redirect to dashboard
      router.push(routes.dashboard.home)
      router.refresh()
    },
    onError: (error: Error) => {
      console.error('Login error:', error)
    },
  })
}

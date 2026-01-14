'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { register, type RegisterCredentials } from '../api/auth.client'

/**
 * Hook for register mutation with TanStack Query
 */
export function useRegister() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (credentials: RegisterCredentials) => register(credentials),
    onSuccess: () => {
      // Invalidate user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] })
      queryClient.invalidateQueries({ queryKey: ['session'] })
    },
    onError: (error: Error) => {
      console.error('Registration error:', error)
    },
  })
}

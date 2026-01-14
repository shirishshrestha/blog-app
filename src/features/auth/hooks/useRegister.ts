'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { register, type RegisterCredentials } from '../api/auth.client'
import { toast } from 'sonner'

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
      toast.success('Registration successful! Please check your email to verify your account.')
    },
    onError: (error: Error) => {
        toast.error(`Registration error: ${error.message}`)
    },
  })
}

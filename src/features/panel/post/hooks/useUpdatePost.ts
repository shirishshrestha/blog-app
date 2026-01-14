'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { updatePost } from '../api/post.actions'
import type { UpdatePostInput } from '../types/post.types'

/**
 * Hook for updating an existing post
 */
export function useUpdatePost(postId: string) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: UpdatePostInput) => updatePost(postId, input),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate posts queries
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        queryClient.invalidateQueries({ queryKey: ['user-posts'] })
        queryClient.invalidateQueries({ queryKey: ['post', postId] })

        toast.success(result.message || 'Post updated successfully!')

        // Refresh the page
        router.refresh()
      } else if (result.error) {
        toast.error(result.error)
      }
    },
    onError: (error: Error) => {
      console.error('Update post error:', error)
      toast.error('Failed to update post. Please try again.')
    },
  })
}

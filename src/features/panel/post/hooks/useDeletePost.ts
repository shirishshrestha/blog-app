'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { deletePost } from '../api/post.actions'
import { routes } from '@/src/config/routes'

/**
 * Hook for deleting a post
 */
export function useDeletePost() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (result) => {
      if (result.success) {
        // Invalidate posts queries
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        queryClient.invalidateQueries({ queryKey: ['user-posts'] })

        toast.success(result.message || 'Post deleted successfully!')

        // Redirect to dashboard
        router.push(routes.dashboard.home)
        router.refresh()
      } else if (result.error) {
        toast.error(result.error)
      }
    },
    onError: (error: Error) => {
      console.error('Delete post error:', error)
      toast.error('Failed to delete post. Please try again.')
    },
  })
}

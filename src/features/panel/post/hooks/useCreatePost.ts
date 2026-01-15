'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { createPost } from '../api/post.actions'
import { routes } from '@/src/config/routes'
import type { CreatePostInput } from '../types/post.types'

/**
 * Hook for creating a new post
 */
export function useCreatePost(form?: { reset: () => void }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreatePostInput) => createPost(input),
    onSuccess: (result) => {
      if (result.success && result.postId) {
        // Invalidate posts queries
        queryClient.invalidateQueries({ queryKey: ['posts'] })
        queryClient.invalidateQueries({ queryKey: ['user-posts'] })

        toast.success(result.message || 'Post created successfully!')
        form?.reset()
        // Redirect to posts list page
        router.push(routes.posts.list)
        router.refresh()
      } else if (result.error) {
        toast.error(result.error)
      }
    },
    onError: (error: Error) => {
      console.error('Create post error:', error)
      toast.error('Failed to create post. Please try again.')
    },
  })
}

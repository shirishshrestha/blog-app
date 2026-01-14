'use client'

import { useCreatePost } from './useCreatePost'
import { useUpdatePost } from './useUpdatePost'
import { useDeletePost } from './useDeletePost'

/**
 * Combined hook for all post mutations
 */
export function usePostMutations(postId?: string) {
  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost(postId || '')
  const deleteMutation = useDeletePost()

  return {
    create: createMutation,
    update: updateMutation,
    delete: deleteMutation,
    isLoading: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  }
}

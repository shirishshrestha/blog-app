import { createClient } from '@/src/lib/supabase/server'
import { cache } from 'react'
import type { Post, PostFilters } from '../types/post.types'

/**
 * Get all posts with optional filters
 * Cached to prevent multiple calls in a single render
 */
export const getPosts = cache(async (filters?: PostFilters) => {
  try {
    const supabase = await createClient()

    let query = supabase
      .from('posts')
      .select(
        `
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters?.status) {
      query = query.eq('status', filters.status)
    }

    if (filters?.author_id) {
      query = query.eq('author_id', filters.author_id)
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`)
    }

    if (filters?.limit) {
      query = query.limit(filters.limit)
    }

    if (filters?.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching posts:', error)
      return { posts: [], error: error.message }
    }

    return { posts: data as Post[], error: null }
  } catch (error) {
    console.error('Unexpected error fetching posts:', error)
    return { posts: [], error: 'Failed to fetch posts' }
  }
})

/**
 * Get a single post by ID
 * Cached to prevent multiple calls in a single render
 */
export const getPostById = cache(async (id: string) => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
      return { post: null, error: error.message }
    }

    return { post: data as Post, error: null }
  } catch (error) {
    console.error('Unexpected error fetching post:', error)
    return { post: null, error: 'Failed to fetch post' }
  }
})

/**
 * Get a single post by slug
 * Cached to prevent multiple calls in a single render
 */
export const getPostBySlug = cache(async (slug: string) => {
  try {
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('posts')
      .select(
        `
        *,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `
      )
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching post:', error)
      return { post: null, error: error.message }
    }

    return { post: data as Post, error: null }
  } catch (error) {
    console.error('Unexpected error fetching post:', error)
    return { post: null, error: 'Failed to fetch post' }
  }
})

/**
 * Get posts by a specific user
 * Cached to prevent multiple calls in a single render
 */
export const getUserPosts = cache(
  async (userId: string, filters?: Omit<PostFilters, 'author_id'>) => {
    return getPosts({ ...filters, author_id: userId })
  }
)

/**
 * Search posts by title or content
 */
export const searchPosts = cache(
  async (searchTerm: string, filters?: Omit<PostFilters, 'search'>) => {
    return getPosts({ ...filters, search: searchTerm })
  }
)

/**
 * Get published posts only (for public view)
 */
export const getPublishedPosts = cache(async (filters?: Omit<PostFilters, 'status'>) => {
  return getPosts({ ...filters, status: 'published' })
})

/**
 * Increment post view count
 */
export async function incrementPostViewCount(postId: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase.rpc('increment_post_views', {
      post_id: postId,
    })

    if (error) {
      console.error('Error incrementing view count:', error)
      return { success: false, error: error.message }
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Unexpected error incrementing view count:', error)
    return { success: false, error: 'Failed to increment view count' }
  }
}

/**
 * Post entity types for the blog application
 */

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  status: 'draft' | 'published' | 'archived'
  published_at?: string
  created_at: string
  updated_at: string
  author_id: string
  view_count: number
  // Relationships
  profiles?: {
    id: string
    full_name: string | null
    avatar_url: string | null
    role?: string | null
  }
}

export interface CreatePostInput {
  title: string
  slug: string
  content: string
  excerpt?: string
  featured_image?: string
  status?: 'draft' | 'published' | 'archived'
  published_at?: string
}

export interface UpdatePostInput {
  title?: string
  slug?: string
  content?: string
  excerpt?: string
  featured_image?: string
  status?: 'draft' | 'published' | 'archived'
  published_at?: string
}

export interface PostFilters {
  status?: 'draft' | 'published' | 'archived'
  author_id?: string
  search?: string
  limit?: number
  offset?: number
}

export type PostStatus = 'draft' | 'published' | 'archived'

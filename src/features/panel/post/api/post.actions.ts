'use server'

import { createClient } from '@/src/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { CreatePostInput, UpdatePostInput } from '../types/post.types'

export type PostActionState = {
  error?: string
  success?: boolean
  message?: string
  postId?: string
}

/**
 * Create a new post
 */
export async function createPostAction(
  _prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to create a post' }
    }

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const featured_image = formData.get('featured_image') as string
    const status = formData.get('status') as 'draft' | 'published' | 'archived'

    if (!title || !slug || !content) {
      return { error: 'Title, slug, and content are required' }
    }

    const postData: CreatePostInput = {
      title,
      slug,
      content,
      excerpt: excerpt || undefined,
      featured_image: featured_image || undefined,
      status: status || 'draft',
      published_at: status === 'published' ? new Date().toISOString() : undefined,
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...postData,
        author_id: user.id,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating post:', error)
      return { error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath('/dashboard')
    revalidatePath('/posts')
    revalidatePath('/blog')
    revalidatePath('/')

    return {
      success: true,
      message: 'Post created successfully!',
      postId: data.id,
    }
  } catch (error) {
    console.error('Unexpected error creating post:', error)
    return { error: 'Failed to create post' }
  }
}

/**
 * Update an existing post
 */
export async function updatePostAction(
  postId: string,
  _prevState: PostActionState,
  formData: FormData
): Promise<PostActionState> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to update a post' }
    }

    // Verify ownership
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('author_id, slug')
      .eq('id', postId)
      .single()

    if (fetchError || !existingPost) {
      return { error: 'Post not found' }
    }

    if (existingPost.author_id !== user.id) {
      return { error: 'You do not have permission to update this post' }
    }

    const title = formData.get('title') as string
    const slug = formData.get('slug') as string
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const featured_image = formData.get('featured_image') as string
    const status = formData.get('status') as 'draft' | 'published' | 'archived'

    const updateData: UpdatePostInput & { updated_at: string } = {
      title: title || undefined,
      slug: slug || undefined,
      content: content || undefined,
      excerpt: excerpt || undefined,
      featured_image: featured_image || undefined,
      status: status || undefined,
      updated_at: new Date().toISOString(),
    }

    // Set published_at if changing to published
    if (status === 'published') {
      updateData.published_at = new Date().toISOString()
    }

    const { error } = await supabase.from('posts').update(updateData).eq('id', postId)

    if (error) {
      console.error('Error updating post:', error)
      return { error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath('/dashboard')
    revalidatePath('/posts')
    revalidatePath('/blog')
    revalidatePath(`/blog/${slug || existingPost.slug}`)
    revalidatePath('/')

    return {
      success: true,
      message: 'Post updated successfully!',
      postId,
    }
  } catch (error) {
    console.error('Unexpected error updating post:', error)
    return { error: 'Failed to update post' }
  }
}

/**
 * Delete a post
 */
export async function deletePostAction(postId: string): Promise<PostActionState> {
  try {
    const supabase = await createClient()

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to delete a post' }
    }

    // Verify ownership
    const { data: existingPost, error: fetchError } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', postId)
      .single()

    if (fetchError || !existingPost) {
      return { error: 'Post not found' }
    }

    if (existingPost.author_id !== user.id) {
      return { error: 'You do not have permission to delete this post' }
    }

    const { error } = await supabase.from('posts').delete().eq('id', postId)

    if (error) {
      console.error('Error deleting post:', error)
      return { error: error.message }
    }

    // Revalidate relevant paths
    revalidatePath('/dashboard')
    revalidatePath('/posts')
    revalidatePath('/blog')
    revalidatePath('/')

    return {
      success: true,
      message: 'Post deleted successfully!',
    }
  } catch (error) {
    console.error('Unexpected error deleting post:', error)
    return { error: 'Failed to delete post' }
  }
}

/**
 * Programmatic create post (for use in client components)
 */
export async function createPost(input: CreatePostInput): Promise<PostActionState> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to create a post' }
    }

    const { data, error } = await supabase
      .from('posts')
      .insert({
        ...input,
        author_id: user.id,
        published_at: input.status === 'published' ? new Date().toISOString() : undefined,
      })
      .select()
      .single()

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/dashboard')
    revalidatePath('/posts')
    revalidatePath('/blog')
    revalidatePath('/')

    return { success: true, message: 'Post created successfully!', postId: data.id }
  } catch (_error) {
    return { error: 'Failed to create post' }
  }
}

/**
 * Programmatic update post (for use in client components)
 */
export async function updatePost(postId: string, input: UpdatePostInput): Promise<PostActionState> {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return { error: 'You must be logged in to update a post' }
    }

    // Verify ownership
    const { data: existingPost } = await supabase
      .from('posts')
      .select('author_id')
      .eq('id', postId)
      .single()

    if (!existingPost || existingPost.author_id !== user.id) {
      return { error: 'Post not found or you do not have permission' }
    }

    const updateData = {
      ...input,
      updated_at: new Date().toISOString(),
      published_at: input.status === 'published' ? new Date().toISOString() : undefined,
    }

    const { error } = await supabase.from('posts').update(updateData).eq('id', postId)

    if (error) {
      return { error: error.message }
    }

    revalidatePath('/dashboard')
    revalidatePath('/posts')
    revalidatePath('/blog')
    revalidatePath('/')

    return { success: true, message: 'Post updated successfully!', postId }
  } catch (_error) {
    return { error: 'Failed to update post' }
  }
}

/**
 * Programmatic delete post (for use in client components)
 */
export async function deletePost(postId: string): Promise<PostActionState> {
  return deletePostAction(postId)
}

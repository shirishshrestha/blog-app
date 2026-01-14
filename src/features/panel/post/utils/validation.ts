import { z } from 'zod'

/**
 * Helper to generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Post form validation schema with auto-generated slug
 */
export const postSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .min(3, 'Title must be at least 3 characters')
      .max(200, 'Title must be less than 200 characters'),
    slug: z.string().optional(),
    content: z
      .string()
      .min(1, 'Content is required')
      .min(10, 'Content must be at least 10 characters'),
    excerpt: z
      .string()
      .max(500, 'Excerpt must be less than 500 characters')
      .optional()
      .or(z.literal('')),
    featured_image: z.string().url('Must be a valid URL').optional().or(z.literal('')),
    status: z.enum(['draft', 'published', 'archived']).default('draft'),
  })
  .transform((data) => ({
    ...data,
    slug: data.slug && data.slug.trim() !== '' ? data.slug : generateSlug(data.title),
  }))

export type PostFormData = z.infer<typeof postSchema>

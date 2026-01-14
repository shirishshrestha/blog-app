import { z } from 'zod'

/**
 * Post form validation schema
 */
export const postSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .min(3, 'Slug must be at least 3 characters')
    .max(200, 'Slug must be less than 200 characters')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must be lowercase with hyphens only (e.g., my-post-slug)'
    ),
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

export type PostFormData = z.infer<typeof postSchema>

/**
 * Helper to generate slug from title
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

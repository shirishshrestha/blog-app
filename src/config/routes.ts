export const routes = {
  // Public routes
  home: '/',
  blog: '/blog',
  post: (slug: string) => `/blog/${slug}`,

  // Auth routes
  auth: {
    login: '/login',
    signup: '/register',
  },

  // Protected dashboard routes
  dashboard: {
    home: '/dashboard',
  },

  // Post management routes
  posts: {
    list: '/posts',
    createPost: '/posts/create',
    editPost: (id: string) => `/posts/${id}/edit`,
  },
} as const

export type Routes = typeof routes

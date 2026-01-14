export const routes = {
  // Public routes
  home: '/',
  blog: '/blog',
  post: (slug: string) => `/blog/${slug}`,

  // Auth routes
  auth: {
    login: '/login',
    signup: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },

  // Protected dashboard routes
  dashboard: {
    home: '/dashboard',
    settings: '/dashboard/settings',
    profile: '/dashboard/profile',
  },

  // Post management routes
  posts: {
    list: '/posts',
    createPost: '/posts/create',
    editPost: (id: string) => `/posts/${id}/edit`,
  },

  // API routes
  api: {
    posts: '/api/posts',
    post: (id: string) => `/api/posts/${id}`,
  },
} as const

export type Routes = typeof routes

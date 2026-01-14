export const routes = {
  home: '/',
  blog: '/blog',
  post: (slug: string) => `/blog/${slug}`,
  about: '/about',
  auth: {
    login: '/login',
    signup: '/register',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
  },
  dashboard: {
    home: '/dashboard',
    posts: '/dashboard/posts',
    createPost: '/dashboard/posts/create',
    editPost: (id: string) => `/dashboard/posts/${id}/edit`,
    settings: '/dashboard/settings',
    profile: '/dashboard/profile',
  },
  api: {
    posts: '/api/posts',
    post: (id: string) => `/api/posts/${id}`,
  },
} as const

export type Routes = typeof routes

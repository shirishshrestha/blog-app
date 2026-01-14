export const siteConfig = {
  name: 'Blog App',
  description: 'A modern blog application built with Next.js and Supabase',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '/og-image.png',
  links: {
    github: 'https://github.com/shirishshrestha/blog-app',
  },
}

export type SiteConfig = typeof siteConfig

import { Suspense } from 'react'
import { getPublishedPosts } from '@/src/features/panel/post/api/post.server'
import { BlogPostList } from '@/src/features/public/blog/components'
import { LoadingSkeleton } from '@/src/features/shared/components/ui/loading-skeleton'
import { ErrorState } from '@/src/features/shared/components/ui/error-state'
import { Separator } from '@/components/ui/separator'
import { BlogFilterToolbar } from '@/src/features/public/blog/components/BlogFilterToolbar'

interface BlogPageProps {
  searchParams: Promise<{
    search?: string
  }>
}

/**
 * Blog Page - List all published posts
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const { posts, error } = await getPublishedPosts({ search: params.search })

  return (
    <div className="min-h-screen py-16">
      <div className="wrapper max-w-7xl">
        {/* Page Header */}
        <div className="mb-12 space-y-4">
          <h1 className="text-5xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground text-xl max-w-2xl">
            Explore our collection of articles, tutorials, and insights
          </p>
          <Separator className="mt-8" />
        </div>

        {/* Search Filter */}
        <div className="mb-8">
          <BlogFilterToolbar />
        </div>

        {/* Posts Count */}
        {!error && posts.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'}
            {params.search && ` matching "${params.search}"`}
          </p>
        )}

        {/* Posts List */}
        {error ? (
          <ErrorState variant="inline" title="Failed to load posts" message={error} />
        ) : (
          <Suspense fallback={<LoadingSkeleton variant="card" count={9} />}>
            <BlogPostList posts={posts} />
          </Suspense>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Blog | Blog App',
  description: 'Explore our collection of articles and tutorials',
}

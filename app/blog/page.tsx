import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { getPublishedPosts } from '@/src/features/panel/post/api/post.server'
import { BlogPostList } from '@/src/features/public/blog/components'
import { LoadingSkeleton } from '@/src/components/ui/loading-skeleton'
import { ErrorState } from '@/src/components/ui/error-state'
import { Separator } from '@/components/ui/separator'

/**
 * Blog Page - List all published posts
 */
export default async function BlogPage() {
  const { posts, error } = await getPublishedPosts()

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

        {/* Search Bar - Placeholder for future implementation */}
        <div className="mb-12 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-12 pr-4 py-3 border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 transition-all"
            disabled
          />
        </div>

        {/* Posts Count */}
        {!error && posts.length > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
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

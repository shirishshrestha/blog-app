import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { getPublishedPosts } from '@/src/features/panel/post/api/post.server'
import { BlogPostList } from '@/src/features/public/blog/components'
import { LoadingSkeleton } from '@/src/components/ui/loading-skeleton'
import { ErrorState } from '@/src/components/ui/error-state'

/**
 * Blog Page - List all published posts
 */
export default async function BlogPage() {
  const { posts, error } = await getPublishedPosts()

  return (
    <div className="min-h-screen py-12">
      <div className="wrapper">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Explore our collection of articles and tutorials
          </p>
        </div>

        {/* Search Bar - Placeholder for future implementation */}
        <div className="mb-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
            disabled
          />
        </div>

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

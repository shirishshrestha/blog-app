import { Suspense } from 'react'
import { getPublishedPosts } from '@/src/features/panel/post/api/post.server'
import { BlogPostList } from '@/src/features/public/blog/components'
import { LoadingSkeleton } from '@/src/features/shared/components/ui/loading-skeleton'
import { ErrorState } from '@/src/features/shared/components/ui/error-state'
import { Separator } from '@/components/ui/separator'
import { BlogFilterToolbar } from '@/src/features/public/blog/components/BlogFilterToolbar'
import { Pagination } from '@/src/features/shared/components/Pagination'

interface BlogPageProps {
  searchParams: Promise<{
    search?: string
    page?: string
    limit?: string
  }>
}

/**
 * Blog Page - List all published posts
 */
export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  // Pagination params
  const currentPage = params.page ? parseInt(params.page) : 1
  const pageSize = params.limit ? parseInt(params.limit) : 10
  const offset = (currentPage - 1) * pageSize

  const { posts, error, totalCount } = await getPublishedPosts({
    search: params.search,
    limit: pageSize,
    offset,
  })

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
        {!error && totalCount > 0 && (
          <p className="text-sm text-muted-foreground mb-6">
            {totalCount} {totalCount === 1 ? 'article' : 'articles'}
            {params.search && ` matching "${params.search}"`}
          </p>
        )}

        {/* Posts List */}
        {error ? (
          <ErrorState variant="inline" title="Failed to load posts" message={error} />
        ) : (
          <>
            <Suspense fallback={<LoadingSkeleton variant="card" count={9} />}>
              <BlogPostList posts={posts} />
            </Suspense>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={Math.max(1, Math.ceil((totalCount || 0) / pageSize))}
                totalCount={totalCount || 0}
                pageSize={pageSize}
                pageSizeOptions={[5, 10, 20, 50]}
                showPageSizeSelector={true}
                showPageInfo={true}
                showFirstLast={true}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Blog | Blog App',
  description: 'Explore our collection of articles and tutorials',
}

import { BlogPostCard } from './BlogPostCard'
import type { Post } from '@/src/features/panel/post/types/post.types'
import { EmptyState } from '@/src/features/shared/components/ui/empty-state'

interface BlogPostListProps {
  posts: Post[]
  featured?: boolean
}

/**
 * BlogPostList - Display list of blog posts
 */
export function BlogPostList({ posts, featured = false }: BlogPostListProps) {
  if (!posts || posts.length === 0) {
    return <EmptyState title="No posts yet" description="Check back soon for new content!" />
  }

  if (featured && posts.length > 0) {
    return (
      <div className="space-y-8">
        {posts.length > 0 && (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  )
}

import { BlogPostCard } from './BlogPostCard'
import { FileText } from 'lucide-react'
import type { Post } from '@/src/features/panel/post/types/post.types'
import { EmptyState } from '@/src/components/ui/empty-state'

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
    const [featuredPost, ...restPosts] = posts

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Featured Post</h2>
          <BlogPostCard post={featuredPost} variant="featured" />
        </div>
        {restPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Recent Posts</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
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

import { PostCard } from './PostCard'
import type { Post } from '../types/post.types'

interface PostListProps {
  posts: Post[]
  showAuthor?: boolean
  variant?: 'default' | 'compact'
  emptyMessage?: string
}

/**
 * PostList - Server Component for displaying a list of posts
 */
export function PostList({
  posts,
  showAuthor = true,
  variant = 'default',
  emptyMessage = 'No posts found',
}: PostListProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="rounded-full bg-muted p-6 mb-4">
          <svg
            className="h-12 w-12 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold mb-2">No Posts Yet</h3>
        <p className="text-muted-foreground max-w-sm">{emptyMessage}</p>
      </div>
    )
  }

  const gridClass =
    variant === 'compact'
      ? 'grid gap-4 md:gap-6 grid-cols-1'
      : 'grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} showAuthor={showAuthor} variant={variant} />
      ))}
    </div>
  )
}

import { PostCard } from './PostCard'
import { EmptyState } from '@/src/features/shared/components/ui/empty-state'
import { FileText } from 'lucide-react'
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
      <EmptyState
        icon={<FileText className="h-12 w-12 text-muted-foreground" />}
        title="No Posts Yet"
        description={emptyMessage}
      />
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

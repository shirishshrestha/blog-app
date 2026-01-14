import { getCurrentUser } from '@/src/features/auth'
import { getUserPosts } from '@/src/features/panel/post/api/post.server'
import { PostList } from '@/src/features/panel/post/components/PostList'
import { ErrorState } from '@/src/components/ui/error-state'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { routes } from '@/src/config/routes'

/**
 * Dashboard Page - Server Component
 * Shows user's posts with create post action
 */
export default async function DashboardPage() {
  // Get authenticated user (layout already checked auth)
  const user = await getCurrentUser()

  if (!user) {
    // This shouldn't happen due to layout auth check, but TypeScript guard
    return null
  }

  // Fetch user's posts from database
  const { posts, error } = await getUserPosts(user.id)

  // Get stats
  const totalPosts = posts.length
  const publishedPosts = posts.filter((p) => p.status === 'published').length
  const draftPosts = posts.filter((p) => p.status === 'draft').length
  const totalViews = posts.reduce((sum, post) => sum + post.view_count, 0)

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.email}</p>
        </div>
        <Button asChild>
          <Link href={routes.posts.createPost}>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      <Separator />

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Total Posts</p>
            <p className="text-2xl font-bold">{totalPosts}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Published</p>
            <p className="text-2xl font-bold text-green-600">{publishedPosts}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Drafts</p>
            <p className="text-2xl font-bold text-yellow-600">{draftPosts}</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="flex flex-col space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">Total Views</p>
            <p className="text-2xl font-bold">{totalViews}</p>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && <ErrorState variant="inline" message={error} />}

      {/* Posts Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Your Posts</h2>
          <Button variant="outline" size="sm" asChild>
            <Link href={routes.posts.list}>View All</Link>
          </Button>
        </div>

        <PostList
          posts={posts}
          showAuthor={false}
          emptyMessage="Start by creating your first post!"
        />
      </div>
    </div>
  )
}

// Optional: Add metadata
export const metadata = {
  title: 'Dashboard',
  description: 'Manage your blog posts',
}

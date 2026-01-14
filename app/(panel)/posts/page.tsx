import { getCurrentUser } from '@/src/features/auth'
import { getUserPosts } from '@/src/features/panel/post/api/post.server'
import { CreatePostButton } from '@/src/features/panel/post/components/CreatePostButton'
import { ErrorState } from '@/src/components/ui/error-state'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import DataTable from '@/src/features/shared/components/DataTable'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Calendar, Edit, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/src/config/routes'
import { DeletePostButton } from '@/src/features/panel/post/components/DeletePostButton'
import type { Post } from '@/src/features/panel/post/types/post.types'

/**
 * Posts Management Page - Server Component
 */
export default async function PostsPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  // Fetch user's posts
  const { posts, error } = await getUserPosts(user.id)

  // Filter posts by status
  const publishedPosts = posts.filter((p) => p.status === 'published')
  const draftPosts = posts.filter((p) => p.status === 'draft')
  const archivedPosts = posts.filter((p) => p.status === 'archived')

  // Table columns configuration
  const columns = [
    {
      key: 'title',
      header: 'Title',
      cellClassName: 'font-medium',
      render: (row: Post) => (
        <Link href={routes.posts.editPost(row.id)} className="hover:underline">
          {row.title}
        </Link>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center' as const,
      render: (row: Post) => {
        const statusColors = {
          published: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
          draft: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
          archived: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
        }
        return (
          <Badge
            variant="outline"
            className={statusColors[row.status as keyof typeof statusColors]}
          >
            {row.status}
          </Badge>
        )
      },
    },
    {
      key: 'published_at',
      header: 'Published',
      render: (row: Post) =>
        row.published_at ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {new Date(row.published_at).toLocaleDateString()}
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        ),
    },
    {
      key: 'view_count',
      header: 'Views',
      align: 'center' as const,
      render: (row: Post) => (
        <div className="flex items-center justify-center gap-2 text-sm">
          <Eye className="h-4 w-4 text-muted-foreground" />
          <span>{row.view_count || 0}</span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right' as const,
      render: (row: Post) => (
        <div className="flex items-center justify-end gap-2">
          {row.status === 'published' && (
            <Button variant="ghost" size="sm" asChild>
              <Link href={routes.post(row.slug)} target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
          <Button variant="ghost" size="sm" asChild>
            <Link href={routes.posts.editPost(row.id)}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeletePostButton postId={row.id} postTitle={row.title} />
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Posts</h1>
          <p className="text-muted-foreground">Manage all your blog posts</p>
        </div>
        <CreatePostButton />
      </div>

      <Separator />

      {/* Error Display */}
      {error && <ErrorState variant="inline" message={error} />}

      {/* Posts Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="w-full">
          <TabsTrigger value="all">
            All <span className="ml-1.5 text-muted-foreground">({posts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="published">
            Published{' '}
            <span className="ml-1.5 text-muted-foreground">({publishedPosts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="draft">
            Drafts <span className="ml-1.5 text-muted-foreground">({draftPosts.length})</span>
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived <span className="ml-1.5 text-muted-foreground">({archivedPosts.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <DataTable
            data={posts}
            columns={columns}
            emptyMessage="You haven't created any posts yet. Start by creating your first post!"
            hoverable={true}
            tableClassName="bg-card"
          />
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <DataTable
            data={publishedPosts}
            columns={columns}
            emptyMessage="No published posts yet. Publish a draft to see it here."
            hoverable={true}
            tableClassName="bg-card"
          />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <DataTable
            data={draftPosts}
            columns={columns}
            emptyMessage="No drafts yet. Create a new post to get started."
            hoverable={true}
            tableClassName="bg-card"
          />
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <DataTable
            data={archivedPosts}
            columns={columns}
            emptyMessage="No archived posts yet."
            hoverable={true}
            tableClassName="bg-card"
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const metadata = {
  title: 'Manage Posts',
  description: 'Manage all your blog posts',
}

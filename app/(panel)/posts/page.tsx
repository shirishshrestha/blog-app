import { getCurrentUser } from '@/src/features/auth'
import { getUserPosts } from '@/src/features/panel/post/api/post.server'
import { PostList } from '@/src/features/panel/post/components/PostList'
import { CreatePostButton } from '@/src/features/panel/post/components/CreatePostButton'
import { ErrorState } from '@/src/components/ui/error-state'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
          <PostList
            posts={posts}
            showAuthor={false}
            variant="compact"
            emptyMessage="You haven't created any posts yet. Start by creating your first post!"
          />
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <PostList
            posts={publishedPosts}
            showAuthor={false}
            variant="compact"
            emptyMessage="No published posts yet. Publish a draft to see it here."
          />
        </TabsContent>

        <TabsContent value="draft" className="space-y-4">
          <PostList
            posts={draftPosts}
            showAuthor={false}
            variant="compact"
            emptyMessage="No drafts yet. Create a new post to get started."
          />
        </TabsContent>

        <TabsContent value="archived" className="space-y-4">
          <PostList
            posts={archivedPosts}
            showAuthor={false}
            variant="compact"
            emptyMessage="No archived posts yet."
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

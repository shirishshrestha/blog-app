import { notFound } from 'next/navigation'
import { getPostById } from '@/src/features/panel/post/api/post.server'
import { getCurrentUser } from '@/src/features/auth'
import { PostForm } from '@/src/features/panel/post/components/PostForm'
import { DeletePostButton } from '@/src/features/panel/post/components/DeletePostButton'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Eye, Calendar } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/src/config/routes'

interface EditPostPageProps {
  params: Promise<{
    id: string
  }>
}

/**
 * Edit Post Page - Server Component
 */
export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params
  const user = await getCurrentUser()

  if (!user) {
    notFound()
  }

  // Fetch the post
  const { post, error } = await getPostById(id)

  if (error || !post) {
    notFound()
  }

  // Verify ownership
  if (post.author_id !== user.id) {
    notFound()
  }

  const postDate = post.published_at || post.created_at
  const formattedDate = new Date(postDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const statusColors = {
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }

  return (
    <div className="space-y-6 wrapper">
      {/* Page Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href={routes.dashboard.home}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl font-bold tracking-tight">Edit Post</h1>
              <Badge className={statusColors[post.status]} variant="secondary">
                {post.status}
              </Badge>
            </div>
            <p className="text-muted-foreground">{post.title}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {post.view_count} views
              </span>
            </div>
          </div>
        </div>
        <DeletePostButton postId={post.id} postTitle={post.title} />
      </div>

      <Separator />

      {/* Post Form */}
      <PostForm post={post} mode="edit" />
    </div>
  )
}

export async function generateMetadata({ params }: EditPostPageProps) {
  const { id } = await params
  const { post } = await getPostById(id)

  return {
    title: post ? `Edit: ${post.title}` : 'Edit Post',
    description: post?.excerpt || 'Edit your blog post',
  }
}

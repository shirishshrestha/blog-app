import { PostForm } from '@/src/features/panel/post/components/PostForm'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/src/config/routes'

/**
 * Create Post Page - Client/Server hybrid
 */
export default function CreatePostPage() {
  return (
    <div className="space-y-6 ">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={routes.dashboard.home}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
          <p className="text-muted-foreground">Write and publish your blog post</p>
        </div>
      </div>

      <Separator />

      {/* Post Form */}
      <PostForm mode="create" />
    </div>
  )
}

export const metadata = {
  title: 'Create Post',
  description: 'Create a new blog post',
}

import Link from 'next/link'
import Image from 'next/image'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, Eye, User } from 'lucide-react'
import type { Post } from '../types/post.types'
import { routes } from '@/src/config/routes'

interface PostCardProps {
  post: Post
  showAuthor?: boolean
  variant?: 'default' | 'compact'
}

/**
 * PostCard - Server Component for displaying individual post
 */
export function PostCard({ post, showAuthor = true, variant = 'default' }: PostCardProps) {
  const postDate = post.published_at || post.created_at
  const formattedDate = new Date(postDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  const statusColors = {
    published: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    draft: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    archived: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  }

  if (variant === 'compact') {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <Link href={routes.dashboard.editPost(post.id)} className="block">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
              <Badge className={statusColors[post.status]} variant="secondary">
                {post.status}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2">
              {post.excerpt || 'No excerpt'}
            </CardDescription>
          </CardHeader>
          <CardFooter className="pt-0 text-xs text-muted-foreground flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.view_count}
            </span>
          </CardFooter>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <Link href={routes.dashboard.editPost(post.id)} className="block">
        {post.featured_image && (
          <div className="aspect-video w-full overflow-hidden bg-muted relative">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-2">
            <Badge className={statusColors[post.status]} variant="secondary">
              {post.status}
            </Badge>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Eye className="h-3 w-3" />
              <span>{post.view_count} views</span>
            </div>
          </div>
          <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
          <CardDescription className="line-clamp-3">
            {post.excerpt || 'No excerpt provided'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={postDate}>{formattedDate}</time>
            </div>
            {showAuthor && post.author && (
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author.email}</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="text-sm text-primary">
          <span className="hover:underline">Edit post →</span>
        </CardFooter>
      </Link>
    </Card>
  )
}

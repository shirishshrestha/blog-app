import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post } from '@/src/features/panel/post/types/post.types'
import { routes } from '@/src/config/routes'

interface BlogPostCardProps {
  post: Post
  variant?: 'default' | 'featured'
}

/**
 * BlogPostCard - Public post display card
 */
export function BlogPostCard({ post, variant = 'default' }: BlogPostCardProps) {
  const isFeatured = variant === 'featured'

  return (
    <Link href={routes.post(post.slug)}>
      <Card
        className={`h-full transition-all hover:shadow-lg ${isFeatured ? 'md:col-span-2' : ''}`}
      >
        {post.featured_image && (
          <div className={`relative overflow-hidden ${isFeatured ? 'h-75' : 'h-50'}`}>
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes={
                isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'
              }
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.published_at || post.created_at}>
              {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {post.view_count > 0 && (
              <>
                <span>•</span>
                <Eye className="h-4 w-4" />
                <span>{post.view_count} views</span>
              </>
            )}
          </div>
          <CardTitle className={isFeatured ? 'text-2xl' : 'text-xl'}>{post.title}</CardTitle>
          {post.excerpt && (
            <CardDescription className={isFeatured ? 'text-base' : ''}>
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        {isFeatured && post.content && (
          <CardContent>
            <p className="text-muted-foreground line-clamp-3">
              {post.content.substring(0, 200)}...
            </p>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

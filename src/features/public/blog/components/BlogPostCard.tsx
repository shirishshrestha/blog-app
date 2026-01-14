import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, ArrowRight } from 'lucide-react'
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
    <Link href={routes.post(post.slug)} className="group block h-full">
      <Card
        className={`h-full transition-all duration-300 hover:shadow-xl hover:border-primary/20 overflow-hidden ${
          isFeatured ? 'md:col-span-2' : ''
        }`}
      >
        {post.featured_image && (
          <div className={`relative overflow-hidden ${isFeatured ? 'h-[400px]' : 'h-[240px]'}`}>
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes={
                isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'
              }
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.published_at || post.created_at}>
                {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.view_count > 0 && (
              <div className="flex items-center gap-1.5">
                <span>•</span>
                <Eye className="h-3.5 w-3.5" />
                <span>{post.view_count}</span>
              </div>
            )}
          </div>
          <CardTitle
            className={`${
              isFeatured ? 'text-2xl' : 'text-xl'
            } leading-tight group-hover:text-primary transition-colors duration-200`}
          >
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <CardDescription className={`${isFeatured ? 'text-base' : 'text-sm'} line-clamp-2`}>
              {post.excerpt}
            </CardDescription>
          )}
        </CardHeader>
        {isFeatured && (
          <CardContent>
            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-200">
              <span>Read more</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Eye, ArrowRight, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Post } from '@/src/features/panel/post/types/post.types'
import { routes } from '@/src/config/routes'
import { Button } from '@/components/ui/button'

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
    <Card
      className={`h-full transition-all py-0 duration-300 hover:shadow-sm hover:border-primary/20 overflow-hidden ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {post.featured_image && (
        <div className={`relative overflow-hidden ${isFeatured ? 'h-100' : 'h-60'}`}>
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={isFeatured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      <CardHeader className="space-y-3 ">
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
          {post.profiles?.full_name && (
            <div className="flex items-center gap-1.5">
              <span>•</span>
              <User className="h-3.5 w-3.5" />
              <span>{post.profiles.full_name}</span>
            </div>
          )}
        </div>
        <>
          <CardTitle
            className={`${
              isFeatured ? 'text-2xl' : 'text-xl'
            } leading-tight group-hover:text-primary transition-colors duration-200 mb-1`}
          >
            {post.title}
          </CardTitle>
          {post.excerpt && (
            <CardDescription className={`${isFeatured ? 'text-base' : 'text-sm'} line-clamp-2`}>
              {post.excerpt}
            </CardDescription>
          )}
        </>
      </CardHeader>

      <CardContent className="pb-4">
        <Link href={routes.post(post.slug)} className="group block h-full">
          <Button>
            <span>Read more</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { routes } from '@/src/config/routes'
import { getPostBySlug, incrementPostViewCount } from '@/src/features/panel/post/api/post.server'

interface PostPageProps {
  params: Promise<{
    slug: string
  }>
}

/**
 * Individual Post Page - Display full post content
 */
export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const { post, error } = await getPostBySlug(slug)

  if (error || !post || post.status !== 'published') {
    notFound()
  }

  // Increment view count (non-blocking)
  incrementPostViewCount(post.id).catch(console.error)

  return (
    <article className="min-h-screen py-12">
      <div className="wrapper max-w-4xl">
        {/* Back Button */}
        <Button variant="ghost" size="sm" className="mb-8" asChild>
          <Link href={routes.blog}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Post Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
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
            <span>•</span>
            <Badge variant="secondary">{post.status}</Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

          {post.excerpt && <p className="text-xl text-muted-foreground">{post.excerpt}</p>}
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        )}

        <Separator className="my-8" />

        {/* Post Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="whitespace-pre-wrap">{post.content}</div>
        </div>

        <Separator className="my-8" />

        {/* Post Footer */}
        <footer className="mt-12">
          <div className="flex items-center justify-between">
            <Button variant="outline" asChild>
              <Link href={routes.blog}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                More Posts
              </Link>
            </Button>

            <div className="text-sm text-muted-foreground">
              Last updated: {new Date(post.updated_at).toLocaleDateString()}
            </div>
          </div>
        </footer>
      </div>
    </article>
  )
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps) {
  const { slug } = await params
  const { post } = await getPostBySlug(slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | Blog App`,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.featured_image ? [post.featured_image] : [],
    },
  }
}

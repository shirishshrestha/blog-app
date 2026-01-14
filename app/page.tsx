import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText } from 'lucide-react'
import { routes } from '@/src/config/routes'
import { getPublishedPosts } from '@/src/features/panel/post/api/post.server'
import { BlogPostList } from '@/src/features/public/blog/components'
import { Suspense } from 'react'
import { LoadingSkeleton } from '@/src/components/ui/loading-skeleton'
import { ErrorState } from '@/src/components/ui/error-state'
import { PublicHeader, PublicFooter } from '@/src/components/layout'

/**
 * Home Page - Public landing page with featured posts
 */
export default async function HomePage() {
  const { posts, error } = await getPublishedPosts({ limit: 7 })

  return (
    <>
      <PublicHeader />
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="border-b bg-muted/40">
          <div className="wrapper py-16 md:py-24">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Welcome to Blog App
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Discover insightful articles, tutorials, and stories from our community of writers.
                Join us to share your thoughts with the world.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href={routes.blog}>
                    Explore Blog
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={routes.auth.login}>Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        <section className="py-12 md:py-16">
          <div className="wrapper">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
                <p className="text-muted-foreground mt-2">
                  Check out our most recent articles and updates
                </p>
              </div>
              <Button variant="ghost" asChild>
                <Link href={routes.blog}>
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {error ? (
              <ErrorState variant="inline" title="Failed to load posts" message={error} />
            ) : (
              <Suspense fallback={<LoadingSkeleton variant="card" count={6} />}>
                <BlogPostList posts={posts} featured />
              </Suspense>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t bg-muted/40 py-12 md:py-16">
          <div className="wrapper">
            <div className="mx-auto max-w-2xl text-center">
              <FileText className="mx-auto h-12 w-12 text-primary" />
              <h2 className="mt-4 text-3xl font-bold">Start Writing Today</h2>
              <p className="mt-4 text-muted-foreground">
                Share your knowledge, experiences, and stories with readers around the world.
              </p>
              <Button size="lg" className="mt-6" asChild>
                <Link href={routes.auth.signup}>Create Your Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      <PublicFooter />
    </>
  )
}

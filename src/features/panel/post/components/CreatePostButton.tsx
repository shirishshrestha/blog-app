'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { routes } from '@/src/config/routes'

interface CreatePostButtonProps {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

/**
 * CreatePostButton - Navigate to create post page
 */
export function CreatePostButton({
  variant = 'default',
  size = 'default',
  className,
}: CreatePostButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={routes.posts.createPost}>
        <Plus className="mr-2 h-4 w-4" />
        New Post
      </Link>
    </Button>
  )
}

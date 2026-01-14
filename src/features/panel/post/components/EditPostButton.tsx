'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Pencil } from 'lucide-react'
import { routes } from '@/src/config/routes'

interface EditPostButtonProps {
  postId: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  className?: string
}

/**
 * EditPostButton - Navigate to edit post page
 */
export function EditPostButton({
  postId,
  variant = 'outline',
  size = 'sm',
  className,
}: EditPostButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={routes.posts.editPost(postId)}>
        <Pencil className="h-4 w-4 mr-2" />
        Edit
      </Link>
    </Button>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/src/components/ui/theme-toggle'
import { routes } from '@/src/config/routes'
import { FileText } from 'lucide-react'

/**
 * PublicHeader - Navigation header for public pages
 */
export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper flex h-14 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={routes.home} className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="font-bold">Blog App</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href={routes.home}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Home
            </Link>
            <Link
              href={routes.blog}
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="sm" asChild>
            <Link href={routes.auth.login}>Sign In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={routes.auth.signup}>Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

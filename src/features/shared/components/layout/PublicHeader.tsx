import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/src/features/shared/components/ui/theme-toggle'
import { routes } from '@/src/config/routes'
import { FileText, LayoutDashboard } from 'lucide-react'
import { getCurrentUser } from '@/src/features/auth/api/auth.server'

/**
 * PublicHeader - Navigation header for public pages
 */
export async function PublicHeader() {
  const user = await getCurrentUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper flex h-16 items-center justify-between">
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
          {user ? (
            <Button size="lg" asChild>
              <Link href={routes.dashboard.home}>
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="lg" asChild>
                <Link href={routes.auth.login}>Sign In</Link>
              </Button>
              <Button size="lg" asChild>
                <Link href={routes.auth.signup}>Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/src/features/auth'
import { routes } from '@/src/config/routes'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, FileText, Settings, User } from 'lucide-react'

/**
 * Protected Panel Layout
 * Wraps dashboard and admin pages with authentication check
 */
export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  // Server-side auth check
  const user = await getCurrentUser()

  if (!user) {
    // Redirect to login if not authenticated
    redirect(routes.auth.login)
  }

  return (
    <div className="min-h-screen bg-background mx-auto">
      {/* Panel Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 ">
        <div className="wrapper flex h-14 items-center">
          <div className="flex items-center gap-6 md:gap-10">
            <Link href={routes.home} className="flex items-center space-x-2">
              <span className="font-bold">Blog App</span>
            </Link>
            <nav className="flex items-center gap-4 text-sm">
              <Link
                href={routes.dashboard.home}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
              <Link
                href={routes.dashboard.posts}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Posts</span>
              </Link>
              <Link
                href={routes.dashboard.settings}
                className="transition-colors hover:text-foreground/80 text-foreground/60 flex items-center gap-1"
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                <span className="hidden md:inline text-muted-foreground">{user.email}</span>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href={routes.dashboard.profile}>Profile</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Panel Content */}
      <main className="wrapper py-6 md:py-10">{children}</main>

      {/* Panel Footer */}
      <footer className="border-t wrapper py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Blog App. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { SidebarTrigger } from '@/components/ui/sidebar'
import { ThemeToggle } from '@/src/components/ui/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { User, Settings, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/src/config/routes'
import { LogoutButton } from '@/src/features/auth/components/LogoutButton'

interface AppBarProps {
  user?: {
    email?: string
  } | null
}

/**
 * AppBar - Top navigation bar for panel layout
 */
export function AppBar({ user }: AppBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4">
        <SidebarTrigger className="-ml-1" />

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">My Account</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={routes.home}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Site
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={routes.dashboard.settings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  )
}

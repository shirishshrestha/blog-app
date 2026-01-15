import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/src/features/auth'
import { routes } from '@/src/config/routes'
import { SidebarProvider } from '@/components/ui/sidebar'
import { UnifiedSidebar } from '@/src/features/shared/components/layout/UnifiedSidebar'
import { AppBar } from '@/src/features/shared/components/layout/AppBar'
import { panelMenuItems } from '@/src/config/menu'
import { ProtectedLayoutProvider } from '@/src/features/shared/components/providers/ProtectedLayoutProvider'

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
    <ProtectedLayoutProvider isProtectedRoute={true}>
      <SidebarProvider>
        <div className="flex min-h-screen w-full">
          {/* Sidebar */}
          <UnifiedSidebar menuItems={panelMenuItems} />

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* AppBar */}
            <AppBar user={user} />

            {/* Page Content */}
            <main className="flex-1 p-3 md:p-6">
              <div className="mx-auto max-w-7xl">{children}</div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedLayoutProvider>
  )
}

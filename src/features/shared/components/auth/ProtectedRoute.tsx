import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/src/features/auth'
import { routes } from '@/src/config/routes'

interface ProtectedRouteProps {
  children: React.ReactNode
  /**
   * If 'auth' - redirects authenticated users to dashboard (for login/register pages)
   * If 'panel' - redirects unauthenticated users to login (for protected pages)
   */
  mode: 'auth' | 'panel'
}

/**
 * ProtectedRoute - Handles authentication-based redirects
 * @param mode 'auth' for login/register pages, 'panel' for protected pages
 */
export async function ProtectedRoute({ children, mode }: ProtectedRouteProps) {
  const user = await getCurrentUser()
  const isAuthenticated = !!user

  if (mode === 'auth' && isAuthenticated) {
    // User is authenticated, redirect away from login/register
    redirect(routes.dashboard.home)
  }

  if (mode === 'panel' && !isAuthenticated) {
    // User is not authenticated, redirect to login
    redirect(routes.auth.login)
  }

  return <>{children}</>
}

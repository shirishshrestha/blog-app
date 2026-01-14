import { LoginForm } from '@/src/features/auth'
import { ProtectedRoute } from '@/src/features/shared/components/auth/ProtectedRoute'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Blog App',
  description: 'Sign in to your account',
}

export default function LoginPage() {
  return (
    <ProtectedRoute mode="auth">
      <div className="flex min-h-screen items-center justify-center p-4">
        <LoginForm />
      </div>
    </ProtectedRoute>
  )
}

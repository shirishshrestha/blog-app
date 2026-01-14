import { RegisterForm } from '@/src/features/auth'
import { ProtectedRoute } from '@/src/components/auth/ProtectedRoute'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register | Blog App',
  description: 'Create a new account',
}

export default function RegisterPage() {
  return (
    <ProtectedRoute mode="auth">
      <div className="flex min-h-screen items-center justify-center p-4">
        <RegisterForm />
      </div>
    </ProtectedRoute>
  )
}

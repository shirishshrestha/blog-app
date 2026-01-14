'use client'

import { useLogout } from '../hooks/useLogout'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface LogoutButtonProps {
  variant?: 'default' | 'ghost' | 'outline' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  showIcon?: boolean
  className?: string
}

export function LogoutButton({
  variant = 'ghost',
  size = 'default',
  showIcon = true,
  className,
}: LogoutButtonProps) {
  const logoutMutation = useLogout()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant={variant}
      size={size}
      disabled={logoutMutation.isPending}
      className={className}
    >
      {showIcon && <LogOut className="mr-2 h-4 w-4" />}
      {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
    </Button>
  )
}

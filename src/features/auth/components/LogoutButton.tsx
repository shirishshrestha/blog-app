'use client'

import { useState } from 'react'
import { useLogout } from '../hooks/useLogout'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { LogOut, Loader2 } from 'lucide-react'

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
  const [open, setOpen] = useState(false)
  const logoutMutation = useLogout()

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      setOpen(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          disabled={logoutMutation.isPending}
        >
          {showIcon && <LogOut className="mr-2 h-4 w-4" />}
          {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to sign out? You will be returned to the public view.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={logoutMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={logoutMutation.isPending}>
            {logoutMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

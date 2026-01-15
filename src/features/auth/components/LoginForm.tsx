'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '../hooks/useLogin'
import { loginSchema, type LoginFormData } from '../utils/validation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { routes } from '@/src/config/routes'
import { Eye, EyeOff } from 'lucide-react'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const form = useForm<LoginFormData>({
    // @ts-ignore - Zod resolver types don't match RHF types in this project setup
    resolver: zodResolver(loginSchema) as any,
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = useLogin(form)

  const onSubmit = async (data: LoginFormData) => {
    await loginMutation.mutateAsync(data)
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to your account to continue</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="your@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link href={''} className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || loginMutation.isPending}
          >
            {form.formState.isSubmitting || loginMutation.isPending ? 'Signing in...' : 'Sign In'}
          </Button>

          <div className="text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={routes.auth.signup} className="font-medium text-primary hover:underline">
              Sign up
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  )
}

'use client'

import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRegister } from '../hooks/useRegister'
import { registerSchema, type RegisterFormData } from '../utils/validation'
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

export function RegisterForm() {
  const registerMutation = useRegister()

  const form = useForm<RegisterFormData>({
    // @ts-expect-error - Zod v3 types are cached, resolver works correctly at runtime
    resolver: zodResolver(registerSchema) as Resolver<RegisterFormData>,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data: RegisterFormData) => {
    await registerMutation.mutateAsync(data)
    form.reset()
  }

  return (
    <Card className="w-full max-w-md p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="mt-2 text-sm text-muted-foreground">Sign up to get started with your blog</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || registerMutation.isPending}
          >
            {form.formState.isSubmitting || registerMutation.isPending
              ? 'Creating account...'
              : 'Create Account'}
          </Button>

          <div className="text-center text-sm">
            Already have an account?{' '}
            <Link href={routes.auth.login} className="font-medium text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  )
}

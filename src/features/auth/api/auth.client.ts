import { createClient } from '@/src/lib/supabase/client'

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterCredentials = {
  email: string
  password: string
  confirmPassword: string
}

/**
 * Client-side login function
 * Use this for programmatic login outside of forms
 */
export async function login(credentials: LoginCredentials) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Client-side register function
 * Use this for programmatic registration outside of forms
 */
export async function register(credentials: RegisterCredentials) {
  if (credentials.password !== credentials.confirmPassword) {
    throw new Error('Passwords do not match')
  }

  if (credentials.password.length < 6) {
    throw new Error('Password must be at least 6 characters long')
  }

  const supabase = createClient()

  const { data, error } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Client-side logout function
 * Use this for programmatic logout
 */
export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }

  return { success: true }
}

/**
 * Get current user from client
 */
export async function getUser() {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) {
    throw new Error(error.message)
  }

  return user
}

/**
 * Get current session from client
 */
export async function getClientSession() {
  const supabase = createClient()

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  return session
}

/**
 * Login with OAuth provider
 */
export async function loginWithOAuth(provider: 'google' | 'github') {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

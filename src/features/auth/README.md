# Authentication Feature

Complete authentication system for the blog application with Supabase integration, TanStack Query, and React Hook Form.

## Structure

```
src/features/auth/
├── api/
│   ├── auth.server.ts      # Server-side auth functions
│   ├── auth.actions.ts     # Server Actions for forms
│   └── auth.client.ts      # Client-side auth functions
├── hooks/
│   ├── useAuth.ts          # Auth state hook
│   ├── useLogin.ts         # Login mutation hook
│   ├── useRegister.ts      # Register mutation hook
│   └── useLogout.ts        # Logout mutation hook
├── components/
│   ├── LoginForm.tsx       # Login form component
│   ├── RegisterForm.tsx    # Register form component
│   └── LogoutButton.tsx    # Logout button component
├── utils/
│   └── validation.ts       # Zod validation schemas
└── index.ts               # Barrel export
```

## Usage

### Using Auth Hooks

```tsx
import { useAuth, useLogin, useLogout } from '@/src/features/auth'

function MyComponent() {
  const { user, isAuthenticated, loading } = useAuth()
  const login = useLogin()
  const logout = useLogout()

  if (loading) return <div>Loading...</div>

  if (!isAuthenticated) {
    return <LoginForm />
  }

  return (
    <div>
      <p>Welcome {user?.email}</p>
      <LogoutButton />
    </div>
  )
}
```

### Using Components

```tsx
import { LoginForm, RegisterForm, LogoutButton } from '@/src/features/auth'

// Login page
export default function LoginPage() {
  return <LoginForm />
}

// Register page
export default function RegisterPage() {
  return <RegisterForm />
}

// In your navigation
function Nav() {
  return (
    <nav>
      <LogoutButton variant="ghost" showIcon={true} />
    </nav>
  )
}
```

### Server-Side Usage

```tsx
import { getCurrentUser, getSession, isAuthenticated } from '@/src/features/auth'

// In Server Components
export default async function ProtectedPage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/auth/login')
  }

  return <div>Welcome {user.email}</div>
}

// Check authentication
export default async function Page() {
  const authenticated = await isAuthenticated()
  
  return (
    <div>
      {authenticated ? 'Logged in' : 'Logged out'}
    </div>
  )
}
```

### Using Server Actions

```tsx
'use client'

import { useActionState } from 'react'
import { loginAction, registerAction } from '@/src/features/auth'

function LoginFormWithAction() {
  const [state, formAction, pending] = useActionState(loginAction, {})

  return (
    <form action={formAction}>
      {state.error && <p>{state.error}</p>}
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button disabled={pending}>
        {pending ? 'Logging in...' : 'Login'}
      </button>
    </form>
  )
}
```

## API Reference

### Server Functions

#### `getCurrentUser()`
Returns the current authenticated user or null. Cached per request.

```typescript
const user = await getCurrentUser()
// Returns: User | null
```

#### `getSession()`
Returns the current session or null. Cached per request.

```typescript
const session = await getSession()
// Returns: Session | null
```

#### `isAuthenticated()`
Checks if user is authenticated.

```typescript
const authenticated = await isAuthenticated()
// Returns: boolean
```

### Server Actions

#### `loginAction(prevState, formData)`
Server Action for form-based login.

```typescript
// Expects FormData with: email, password
// Returns: { error?: string; success?: boolean; message?: string }
```

#### `registerAction(prevState, formData)`
Server Action for form-based registration.

```typescript
// Expects FormData with: email, password, confirmPassword
// Returns: { error?: string; success?: boolean; message?: string }
```

#### `logoutAction()`
Server Action for logout.

```typescript
await logoutAction()
// Redirects to login page
```

### Client Functions

#### `login(credentials)`
Programmatic client-side login.

```typescript
await login({ email: 'user@example.com', password: 'password' })
```

#### `register(credentials)`
Programmatic client-side registration.

```typescript
await register({ 
  email: 'user@example.com', 
  password: 'password',
  confirmPassword: 'password'
})
```

#### `logout()`
Programmatic client-side logout.

```typescript
await logout()
```

### Hooks

#### `useAuth()`
Hook for auth state management.

```typescript
const { user, loading, isAuthenticated } = useAuth()
```

#### `useLogin()`
TanStack Query mutation hook for login.

```typescript
const login = useLogin()

login.mutate({ email, password }, {
  onSuccess: () => console.log('Logged in'),
  onError: (error) => console.error(error)
})
```

#### `useRegister()`
TanStack Query mutation hook for registration.

```typescript
const register = useRegister()

register.mutate({ email, password, confirmPassword })
```

#### `useLogout()`
TanStack Query mutation hook for logout.

```typescript
const logout = useLogout()

logout.mutate()
```

## Components

### LoginForm
Full-featured login form with validation.

```tsx
<LoginForm />
```

### RegisterForm
Full-featured registration form with validation.

```tsx
<RegisterForm />
```

### LogoutButton
Customizable logout button.

```tsx
<LogoutButton 
  variant="ghost" 
  size="default" 
  showIcon={true}
  className="custom-class"
/>
```

## Validation Schemas

All forms use Zod for validation:

- **Login**: Email + password (min 6 chars)
- **Register**: Email + password (uppercase, lowercase, number) + confirm password
- **Forgot Password**: Email
- **Reset Password**: Password (with requirements) + confirm password

## Features

- ✅ Email/password authentication
- ✅ OAuth support (Google, GitHub) ready
- ✅ Form validation with Zod
- ✅ Server Actions integration
- ✅ TanStack Query integration
- ✅ Automatic session management
- ✅ Middleware auth refresh
- ✅ Type-safe API
- ✅ Error handling
- ✅ Loading states
- ✅ Success messages
- ✅ Responsive UI components

## Notes

- Auth state is managed automatically via Supabase auth state listener
- Session refresh is handled by middleware
- All forms include proper error handling and validation
- Server Actions handle cache revalidation automatically
- OAuth providers require configuration in Supabase dashboard

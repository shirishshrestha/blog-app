# Supabase Client Utilities

Reusable Supabase client helpers for browser and server usage.

## Usage

### Browser Client

```typescript
import { createClient } from '@/src/lib/supabase/client'

// In any client component
const supabase = createClient()

// Use for queries
const { data, error } = await supabase
  .from('posts')
  .select('*')
```

### Server Client

```typescript
import { createClient } from '@/src/lib/supabase/server'

// In Server Components, Route Handlers, or Server Actions
const supabase = await createClient()

// Use for queries
const { data, error } = await supabase
  .from('posts')
  .select('*')
```

### Auth Utilities

```typescript
import { getCurrentUser, getSession, isAuthenticated } from '@/src/features/auth'

// Get current user (cached per request)
const user = await getCurrentUser()

// Get session
const session = await getSession()

// Check if authenticated
const authenticated = await isAuthenticated()
```

## Key Points

- **Browser client**: Synchronous, use in client components
- **Server client**: Async, use in server components/actions
- **Auth utilities**: Server-side only, cached per request
- **Session management**: Automatically handled by middleware

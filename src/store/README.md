# Redux Store

Global state management with Redux Toolkit.

## Store Structure

```
src/store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed hooks (useAppDispatch, useAppSelector)
└── slices/
    └── authSlice.ts      # Auth state slice
```

## Usage

### Using Typed Hooks

```typescript
import { useAppDispatch, useAppSelector } from '@/src/store/hooks'
import { selectCurrentUser, selectIsAuthenticated } from '@/src/store/slices/authSlice'

function MyComponent() {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectCurrentUser)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  
  return <div>User: {user?.email}</div>
}
```

### Auth Slice Actions

```typescript
import { setCredentials, logoutAction, setLoading } from '@/src/store/slices/authSlice'

// Set user credentials
dispatch(setCredentials(user))

// Logout
dispatch(logoutAction())

// Set loading state
dispatch(setLoading(true))
```

### Selectors

```typescript
import {
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading
} from '@/src/store/slices/authSlice'

// Use with useAppSelector
const user = useAppSelector(selectCurrentUser)
const isAuthenticated = useAppSelector(selectIsAuthenticated)
const loading = useAppSelector(selectAuthLoading)
```

## Integration

The Redux store is automatically integrated with:
- **useAuth hook**: Syncs Supabase auth state with Redux
- **useLogout hook**: Clears Redux state on logout
- **Providers**: Wrapped in root layout

## State Shape

```typescript
interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}
```

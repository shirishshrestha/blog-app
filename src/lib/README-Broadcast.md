# Cross-Tab Logout Broadcasting

Automatically logs out users across all open tabs when they log out in one tab.

## How It Works

### 1. **Broadcast Channel API**

Uses the browser's [BroadcastChannel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) to communicate between tabs from the same origin.

### 2. **Architecture**

```
Tab 1 (Protected Route)          Tab 2 (Protected Route)          Tab 3 (Public Route)
      |                                  |                                |
      | Logout Button Click              |                                |
      |--------------------------------->|                                |
      | broadcastLogout()                |                                |
      |                                  |                                |
      | BroadcastChannel                 |                                |
      | 'auth_channel'                   |                                |
      | message: 'logout' -------------->| Receives 'logout'              | (No listener)
      |                                  | Clears query cache             |
      |                                  | Clears Redux state             |
      |                                  | Redirects to /login            |
      |                                  |                                |
      | Local logout completes           |                                |
      | Query cache cleared              |                                |
      | Redux cleared                    |                                |
      | Redirect to /login               |                                |
```

### 3. **Components**

#### Broadcast Utility ([lib/broadcast.ts](src/lib/broadcast.ts))

- `setupLogoutBroadcast()` - Initializes listener on protected routes
- `broadcastLogout()` - Sends logout message to all tabs

#### Logout Hook ([features/auth/hooks/useLogout.ts](src/features/auth/hooks/useLogout.ts))

- Calls `broadcastLogout()` after successful logout
- Ensures other tabs are notified

#### Protected Layout Provider ([features/shared/components/providers/ProtectedLayoutProvider.tsx](src/features/shared/components/providers/ProtectedLayoutProvider.tsx))

- Client component that wraps protected routes
- Sets up broadcast channel listener
- Handles incoming logout messages

#### Panel Layout ([app/(panel)/layout.tsx](<app/(panel)/layout.tsx>))

- Server component that wraps all protected pages
- Uses `ProtectedLayoutProvider` to enable cross-tab logout

## Testing

### Manual Test Steps

1. **Open two tabs with protected routes:**

   - Tab 1: `http://localhost:3000/dashboard`
   - Tab 2: `http://localhost:3000/posts`

2. **Log out in Tab 1:**

   - Click logout button
   - Observe: Tab 1 redirects to `/login`

3. **Check Tab 2:**

   - Should automatically redirect to `/login` within milliseconds
   - Console should show "Broadcast logout received" (if logging enabled)

4. **Verify state cleared:**
   - React Query cache cleared in both tabs
   - Redux state reset in both tabs
   - Session cookies cleared

### Edge Cases Handled

✅ **Public routes** - No listener attached, unaffected by broadcasts  
✅ **Browser compatibility** - Gracefully falls back if `BroadcastChannel` unavailable  
✅ **Multiple tabs** - All tabs with protected routes receive the message  
✅ **Channel cleanup** - Channels properly closed on unmount  
✅ **Race conditions** - Each tab independently clears state

## Browser Support

- ✅ Chrome 54+
- ✅ Firefox 38+
- ✅ Safari 15.4+
- ✅ Edge 79+
- ❌ IE 11 (fallback: no cross-tab logout)

## Security Considerations

1. **Same-origin only** - Broadcast channels only work within the same origin (protocol + domain + port)
2. **No sensitive data** - Only sends a logout signal, no user data transmitted
3. **Server-side validation** - Server still validates session/token on each request

## Customization

### Add logging for debugging:

```typescript
// In broadcast.ts
channel.onmessage = (event) => {
  console.log('📡 Broadcast received:', event.data)
  if (event.data === LOGOUT_MESSAGE) {
    console.log('🔓 Logging out from broadcast')
    // ... rest of handler
  }
}
```

### Add more broadcast events:

```typescript
const SESSION_EXPIRED = 'session_expired'
const PROFILE_UPDATED = 'profile_updated'

// In setupLogoutBroadcast
channel.onmessage = (event) => {
  switch (event.data) {
    case LOGOUT_MESSAGE:
      onLogout()
      break
    case SESSION_EXPIRED:
      onSessionExpired()
      break
    case PROFILE_UPDATED:
      queryClient.invalidateQueries({ queryKey: ['user'] })
      break
  }
}
```

### Disable for specific routes:

```tsx
// In layout.tsx
<ProtectedLayoutProvider isProtectedRoute={false}>{children}</ProtectedLayoutProvider>
```

## Troubleshooting

### Issue: Tabs not logging out

**Solution:** Check browser console for errors. Ensure `BroadcastChannel` is supported.

### Issue: Multiple logouts triggered

**Solution:** Verify only one `ProtectedLayoutProvider` wraps the app. Check for duplicate listeners.

### Issue: Works locally but not in production

**Solution:** Ensure same-origin policy is met. Check for service workers interfering.

## Performance Impact

- **Memory:** ~1KB per channel (negligible)
- **CPU:** Event-driven, no polling
- **Network:** Zero - uses browser's internal IPC

## Future Enhancements

- [ ] Add session expiry broadcast
- [ ] Broadcast profile updates
- [ ] Add visual notification when logged out from another tab
- [ ] Add offline detection and queue broadcasts

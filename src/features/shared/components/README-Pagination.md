# Pagination Component

A reusable pagination component for Next.js App Router with full support for Supabase limit/offset pagination.

## Features

- ✅ Full Next.js App Router integration with URL-based pagination
- ✅ Supabase count support for accurate total counts
- ✅ Page size selector (items per page)
- ✅ First/Last page navigation
- ✅ Smart ellipsis display for large page counts
- ✅ Responsive design (mobile-friendly)
- ✅ Works seamlessly with search and filter params
- ✅ Accessible keyboard navigation

## How Supabase Total Count Works

To get the total count of records, we modified the Supabase query in `post.server.ts`:

```typescript
// Add { count: 'exact' } to the select options
let query = supabase.from('posts').select(
  `
    *,
    profiles (
      id,
      full_name,
      avatar_url
    )
  `,
  { count: 'exact' } // 👈 This enables total count
)

// After executing the query
const { data, error, count } = await query
//                      ^^^^^ Supabase returns the total count here
```

The `count: 'exact'` option tells Supabase to include a `COUNT(*)` in the query and return the total number of matching rows, regardless of limit/offset.

## Usage

### In a Server Component (Recommended)

```tsx
import { Pagination } from '@/src/features/shared/components/Pagination'

export default async function PostsPage({ searchParams }: Props) {
  const params = await searchParams

  // Parse pagination params
  const currentPage = params.page ? parseInt(params.page) : 1
  const pageSize = params.limit ? parseInt(params.limit) : 10
  const offset = (currentPage - 1) * pageSize

  // Fetch data with pagination
  const { posts, totalCount } = await getPosts({
    limit: pageSize,
    offset,
  })

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div>
      {/* Your content */}
      <DataTable data={posts} columns={columns} />

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
        pageSize={pageSize}
      />
    </div>
  )
}
```

### Props

| Prop                   | Type                     | Default             | Description                                |
| ---------------------- | ------------------------ | ------------------- | ------------------------------------------ |
| `currentPage`          | `number`                 | `1`                 | Current active page                        |
| `totalPages`           | `number`                 | `1`                 | Total number of pages                      |
| `totalCount`           | `number`                 | `0`                 | Total number of items                      |
| `pageSize`             | `number`                 | `10`                | Items per page                             |
| `onPageChange`         | `(page: number) => void` | -                   | Custom page change handler (optional)      |
| `onPageSizeChange`     | `(size: number) => void` | -                   | Custom page size change handler (optional) |
| `pageSizeOptions`      | `number[]`               | `[10, 20, 50, 100]` | Available page size options                |
| `showPageSizeSelector` | `boolean`                | `true`              | Show items per page selector               |
| `showPageInfo`         | `boolean`                | `true`              | Show "Showing X to Y of Z results" text    |
| `showFirstLast`        | `boolean`                | `true`              | Show first/last page buttons               |
| `className`            | `string`                 | `''`                | Additional CSS classes                     |

## URL Query Parameters

The component automatically manages these URL params:

- `?page=2` - Current page number
- `?limit=20` - Items per page
- Works alongside other params like `?search=term&status=published&page=2`

## How It Works with Supabase

### 1. **Limit/Offset Calculation**

```typescript
const currentPage = 2
const pageSize = 10
const offset = (currentPage - 1) * pageSize // = 10

// Supabase query
query = query.range(offset, offset + pageSize - 1)
// This fetches rows 10-19 (10 items starting from index 10)
```

### 2. **Total Count Query**

Supabase's `{ count: 'exact' }` option runs a `COUNT(*)` query alongside the main query:

```sql
-- What Supabase executes internally:
SELECT *, COUNT(*) OVER() as total_count
FROM posts
WHERE author_id = 'xxx'
LIMIT 10 OFFSET 10;
```

### 3. **Navigation Flow**

```
User clicks page 2
  ↓
URL updates to ?page=2
  ↓
Next.js re-renders server component
  ↓
getPosts({ offset: 10, limit: 10 })
  ↓
Supabase returns 10 items + total count
  ↓
Pagination component displays page 2
```

## Performance Considerations

1. **Cached Queries**: The `getPosts` function uses React's `cache()`, so multiple calls in the same render only query once
2. **Partial Revalidation**: App Router only re-fetches the server component, keeping client state intact
3. **COUNT Performance**: For large tables (>100k rows), consider:
   - Adding database indexes on filtered columns
   - Caching total count separately
   - Using approximate counts for very large datasets

## Integration with Filters

Pagination works seamlessly with search and filter params:

```tsx
const { posts, totalCount } = await getPosts({
  author_id: user.id,
  search: params.search, // 👈 Filter
  status: params.status, // 👈 Filter
  limit: pageSize, // 👈 Pagination
  offset, // 👈 Pagination
})
```

The total count returned by Supabase respects all filters, so you get accurate page counts even when filtering.

## Examples

### Minimal Usage

```tsx
<Pagination currentPage={1} totalPages={5} totalCount={50} pageSize={10} />
```

### With Custom Page Sizes

```tsx
<Pagination
  currentPage={2}
  totalPages={10}
  totalCount={200}
  pageSize={20}
  pageSizeOptions={[20, 50, 100]}
/>
```

### Without Page Size Selector

```tsx
<Pagination
  currentPage={1}
  totalPages={5}
  totalCount={50}
  pageSize={10}
  showPageSizeSelector={false}
/>
```

### With Custom Handlers (Client Component)

```tsx
'use client'

const [page, setPage] = useState(1)
const [limit, setLimit] = useState(10)

<Pagination
  currentPage={page}
  totalPages={totalPages}
  totalCount={totalCount}
  pageSize={limit}
  onPageChange={setPage}
  onPageSizeChange={setLimit}
/>
```

## Troubleshooting

### Issue: Total count is always 0

**Solution**: Ensure you added `{ count: 'exact' }` to the `.select()` call:

```typescript
.select('*', { count: 'exact' })
```

### Issue: Pagination resets when filtering

**Solution**: Reset to page 1 when filters change:

```typescript
// In your filter toolbar component
const handleFilterChange = (filter) => {
  const params = new URLSearchParams(searchParams)
  params.set('status', filter)
  params.set('page', '1') // 👈 Reset to page 1
  router.push(`?${params.toString()}`)
}
```

### Issue: Page count is incorrect

**Solution**: Check your offset calculation:

```typescript
// Correct
const offset = (currentPage - 1) * pageSize

// Incorrect
const offset = currentPage * pageSize
```

'use client'

import { FilterToolbar } from '@/src/features/shared/components/FilterToolbar'

export function PostsFilterToolbar() {
  return (
    <FilterToolbar>
      <FilterToolbar.Search paramName="search" placeholder="Search posts by title or content..." />
      <FilterToolbar.Select
        paramName="status"
        label="Status"
        placeholder="All Status"
        options={[
          { value: 'all', label: 'All Status' },
          { value: 'published', label: 'Published' },
          { value: 'draft', label: 'Draft' },
          { value: 'archived', label: 'Archived' },
        ]}
      />
    </FilterToolbar>
  )
}

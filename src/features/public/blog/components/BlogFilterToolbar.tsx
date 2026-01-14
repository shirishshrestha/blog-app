'use client'

import { FilterToolbar } from '@/src/features/shared/components/FilterToolbar'

export function BlogFilterToolbar() {
  return (
    <FilterToolbar className="">
      <FilterToolbar.Search
        paramName="search"
        placeholder="Search articles by title or content..."
        label="Search Articles"
      />
    </FilterToolbar>
  )
}

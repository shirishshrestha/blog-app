'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebounce } from 'use-debounce'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

const FilterToolbarContext = createContext<Record<string, never> | undefined>(undefined)

const useFilterToolbarContext = () => {
  const context = useContext(FilterToolbarContext)
  if (!context) {
    throw new Error('FilterToolbar compound components must be used within FilterToolbar')
  }
  return context
}

interface FilterToolbarProps {
  children: React.ReactNode
  className?: string
}

/**
 * FilterToolbar - A reusable compound component for filtering data
 *
 * @example
 * <FilterToolbar>
 *   <FilterToolbar.Search
 *     paramName="search"
 *     value={searchTerm}
 *     onChange={setSearchTerm}
 *     placeholder="Search..."
 *   />
 *   <FilterToolbar.Select
 *     label="Status"
 *     value={statusFilter}
 *     onChange={setStatusFilter}
 *     options={[
 *       { value: "all", label: "All Status" },
 *       { value: "active", label: "Active" }
 *     ]}
 *   />
 * </FilterToolbar>
 */
export function FilterToolbar({ children, className = '' }: FilterToolbarProps) {
  return (
    <FilterToolbarContext.Provider value={{}}>
      <Card className={className}>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">{children}</div>
        </CardContent>
      </Card>
    </FilterToolbarContext.Provider>
  )
}

interface SearchProps {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
  paramName?: string
  debounceMs?: number
}

/**
 * FilterToolbar.Search - Search input component with debounced URL params
 */
const FilterToolbarSearch = ({
  value,
  onChange,
  placeholder = 'Search...',
  label = 'Search',
  className = '',
  paramName = 'search',
  debounceMs = 500,
}: SearchProps) => {
  useFilterToolbarContext() // Validate context
  const router = useRouter()
  const searchParams = useSearchParams()
  const [localValue, setLocalValue] = useState(value || searchParams.get(paramName) || '')

  // Debounce the local value using use-debounce hook
  const [debouncedValue] = useDebounce(localValue, debounceMs)

  // Update URL when debouncedValue changes
  useEffect(() => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))

    if (debouncedValue) {
      params.set(paramName, debouncedValue)
      params.delete('page') // Reset to first page when searching
    } else {
      params.delete(paramName)
    }

    router.push(`?${params.toString()}`, { scroll: false })

    onChange?.(debouncedValue)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, paramName, router])

  // Sync external controlled value → local state
  useEffect(() => {
    if (value !== undefined && value !== localValue) {
      setLocalValue(value)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <div className={`flex-2 ${className}`}>
      <label className="text-sm font-medium text-muted-foreground block mb-2">{label}</label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="pl-10"
        />
      </div>
    </div>
  )
}

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value?: string
  onChange?: (value: string) => void
  options?: SelectOption[]
  label?: string
  placeholder?: string
  className?: string
  paramName?: string
}

/**
 * FilterToolbar.Select - Select dropdown component with URL params
 */
const FilterToolbarSelect = ({
  value,
  onChange,
  options = [],
  label,
  placeholder = 'Select...',
  className = '',
  paramName,
}: SelectProps) => {
  useFilterToolbarContext() // Validate context
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentValue = value || searchParams.get(paramName || '') || ''

  const handleChange = (newValue: string) => {
    if (paramName) {
      const params = new URLSearchParams(searchParams.toString())
      if (newValue && newValue !== 'all') {
        params.set(paramName, newValue)
      } else {
        params.delete(paramName)
      }
      params.delete('page') // Reset to first page when filter changes
      router.push(`?${params.toString()}`, { scroll: false })
    }
    if (onChange) onChange(newValue)
  }

  return (
    <div className={`flex-1  ${className}`}>
      {label && (
        <label className="text-sm font-medium text-muted-foreground block mb-2">{label}</label>
      )}
      <Select value={currentValue} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

interface DateInputProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  className?: string
  paramName?: string
}

/**
 * FilterToolbar.DateInput - Date input component with URL params
 */
const FilterToolbarDateInput = ({
  value,
  onChange,
  label = 'Date',
  className = '',
  paramName,
}: DateInputProps) => {
  useFilterToolbarContext() // Validate context
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentValue = value || searchParams.get(paramName || '') || ''

  const handleChange = (newValue: string) => {
    if (paramName) {
      const params = new URLSearchParams(searchParams.toString())
      if (newValue) {
        params.set(paramName, newValue)
      } else {
        params.delete(paramName)
      }
      router.push(`?${params.toString()}`, { scroll: false })
    }
    if (onChange) onChange(newValue)
  }

  return (
    <div className={`flex-1 ${className}`}>
      <label className="text-sm font-medium text-muted-foreground block mb-2">{label}</label>
      <Input type="date" value={currentValue} onChange={(e) => handleChange(e.target.value)} />
    </div>
  )
}

interface InputProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  placeholder?: string
  type?: string
  className?: string
  paramName?: string
}

/**
 * FilterToolbar.Input - Generic text input component with URL params
 */
const FilterToolbarInput = ({
  value,
  onChange,
  label,
  placeholder = '',
  type = 'text',
  className = '',
  paramName,
}: InputProps) => {
  useFilterToolbarContext() // Validate context
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentValue = value || searchParams.get(paramName || '') || ''

  const handleChange = (newValue: string) => {
    if (paramName) {
      const params = new URLSearchParams(searchParams.toString())
      if (newValue) {
        params.set(paramName, newValue)
      } else {
        params.delete(paramName)
      }
      router.push(`?${params.toString()}`, { scroll: false })
    }
    if (onChange) onChange(newValue)
  }

  return (
    <div className={`flex-1  ${className}`}>
      {label && (
        <label className="text-sm font-medium text-muted-foreground block mb-2">{label}</label>
      )}
      <Input
        type={type}
        placeholder={placeholder}
        value={currentValue}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  )
}

// Attach sub-components to FilterToolbar
FilterToolbar.Search = FilterToolbarSearch
FilterToolbar.Select = FilterToolbarSelect
FilterToolbar.DateInput = FilterToolbarDateInput
FilterToolbar.Input = FilterToolbarInput

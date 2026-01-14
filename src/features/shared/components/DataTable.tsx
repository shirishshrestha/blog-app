/**
 * DataTable - Global reusable data table component
 * @module features/shared/components/DataTable
 */
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import TableSkeleton from './TableSkeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Info } from 'lucide-react'

/**
 * DataTable Component
 *
 * A flexible, reusable table component that can display any kind of data
 * with customizable columns and rendering functions.
 */
export default function DataTable<T = Record<string, unknown>>({
  data = [],
  columns = [],
  emptyMessage = 'No data found',
  error = null,
  errorMessage = 'Error loading data',
  isPending = false,
  pendingRows = 5,
  onRowClick,
  rowClassName = '',
  getRowClassName,
  tableClassName = '',
  hoverable = true,
  striped = false,
}: {
  data?: T[]
  columns: {
    key: string
    header: string
    headerClassName?: string
    cellClassName?: string
    align?: 'left' | 'center' | 'right'
    render?: (row: T, value: unknown) => React.ReactNode
    accessor?: (row: T) => unknown
  }[]
  emptyMessage?: string
  error?: Error | string | null
  errorMessage?: string
  isPending?: boolean
  pendingRows?: number
  onRowClick?: (row: T, index: number) => void
  rowClassName?: string
  getRowClassName?: (row: T, index: number) => string
  tableClassName?: string
  hoverable?: boolean
  striped?: boolean
}) {
  /**
   * Get alignment class based on align prop
   */
  const getAlignClass = (align?: 'left' | 'center' | 'right') => {
    switch (align) {
      case 'center':
        return 'text-center'
      case 'right':
        return 'text-right'
      default:
        return 'text-left'
    }
  }

  /**
   * Get cell value from row data
   */
  const getCellValue = (row: T, column: { accessor?: (row: T) => unknown; key: string }) => {
    if (column.accessor) {
      return column.accessor(row)
    }
    return (row as Record<string, unknown>)[column.key]
  }

  /**
   * Render cell content
   */
  const renderCell = (
    row: T,
    column: {
      render?: (row: T, value: unknown) => React.ReactNode
      accessor?: (row: T) => unknown
      key: string
    }
  ) => {
    const value = getCellValue(row, column)

    if (column.render) {
      return column.render(row, value)
    }

    // If value is a string and longer than 35 chars, show ellipsis and shadcn tooltip
    if (typeof value === 'string' && value.length > 35) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <span
              style={{
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: 180,
              }}
            >
              {value.slice(0, 35)}...
            </span>
          </TooltipTrigger>
          <TooltipContent>{value}</TooltipContent>
        </Tooltip>
      )
    }

    return value as React.ReactNode
  }

  /**
   * Get dynamic row className
   */
  const getRowClass = (row: T, index: number) => {
    const baseClass = 'border-b border-border'
    const hoverClass = hoverable ? 'hover:bg-muted/50' : ''
    const stripedClass = striped && index % 2 === 1 ? 'bg-muted/20' : ''
    const clickableClass = onRowClick ? 'cursor-pointer' : ''
    const customClass = getRowClassName ? getRowClassName(row, index) : rowClassName

    return `${baseClass} ${hoverClass} ${stripedClass} ${clickableClass} ${customClass}`.trim()
  }

  if (isPending) {
    return (
      <TableSkeleton
        columns={columns.length}
        rows={pendingRows}
        headers={columns.map((col) => col.header)}
        className={tableClassName}
      />
    )
  }

  return (
    <div className={`w-full overflow-x-auto rounded-lg border ${tableClassName}`}>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-border bg-muted/50">
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={`font-semibold text-foreground ${getAlignClass(column.align)} ${
                  column.headerClassName || ''
                }`}
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {error ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="py-8">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="flex items-center gap-2 text-destructive">
                    <Info className="h-5 w-5" />
                    <span className="font-semibold text-lg">{errorMessage}</span>
                  </div>
                  <div className="text-sm text-muted-foreground text-center max-w-md">
                    {typeof error === 'string' ? error : error?.message}
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={(row as { id?: string }).id || index}
                className={getRowClass(row, index)}
                onClick={onRowClick ? () => onRowClick(row, index) : undefined}
              >
                {columns.map((column) => (
                  <TableCell
                    key={column.key}
                    className={`py-3 ${getAlignClass(column.align)} ${column.cellClassName || ''}`}
                  >
                    {renderCell(row, column)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center text-muted-foreground py-12"
              >
                {emptyMessage}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

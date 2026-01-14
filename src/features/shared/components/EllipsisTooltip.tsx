import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface EllipsisTooltipProps {
  text: string
  maxLength?: number
  spanProps?: React.HTMLAttributes<HTMLSpanElement>
}

/**
 * EllipsisTooltip - Shows truncated text with ellipsis and a tooltip for long strings
 */
export default function EllipsisTooltip({
  text,
  maxLength = 35,
  spanProps = {},
}: EllipsisTooltipProps) {
  if (typeof text !== 'string' || text.length <= maxLength) {
    return <span {...spanProps}>{text}</span>
  }

  // Merge classes safely: ensure truncate and max-width are present
  const baseClasses = 'cursor-pointer truncate max-w-[180px]'
  const mergedClassName = [baseClasses, spanProps.className].filter(Boolean).join(' ')

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span {...spanProps} className={mergedClassName}>
          {text.slice(0, maxLength)}...
        </span>
      </TooltipTrigger>
      <TooltipContent>{text}</TooltipContent>
    </Tooltip>
  )
}

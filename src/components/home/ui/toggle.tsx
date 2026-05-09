'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const toggleVariants = cva(
  [
    // Layout & flex
    'inline-flex items-center justify-center gap-2 whitespace-nowrap',

    // Typography & shape
    'text-sm font-medium rounded-md',

    // Interaction
    'outline-none transition-[color,box-shadow]',
    'hover:bg-muted hover:text-muted-foreground',
    'disabled:pointer-events-none disabled:opacity-50',

    // State
    'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',

    // Focus
    'focus-visible:border-ring focus-visible:ring focus-visible:ring-ring/50',

    // Invalid
    'aria-invalid:border-destructive',
    'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',

    // SVG handling
    '[&_svg]:pointer-events-none',
    "[&_svg:not([class*='size-'])]:size-4",
    '[&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        outline:
          'border border-input bg-transparent shadow-xs hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-9 min-w-9 px-2',
        sm: 'h-8 min-w-8 px-1.5',
        lg: 'h-10 min-w-10 px-2.5',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

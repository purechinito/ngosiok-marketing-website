import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary-50 text-primary-700',
        neutral: 'border-transparent bg-gray-100 text-gray-700',
        info: 'border-transparent bg-secondary-50 text-secondary-700',
        warning: 'border-transparent bg-amber-100 text-amber-800',
        success: 'border-transparent bg-emerald-100 text-emerald-800',
        outline: 'border-gray-300 text-gray-700',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

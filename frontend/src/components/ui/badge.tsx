import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] transition-colors',
  {
    variants: {
      variant: {
        default: 'border-primary/50 bg-primary/15 text-primary',
        secondary: 'border-border bg-secondary/40 text-foreground',
        destructive: 'border-destructive/50 bg-destructive/20 text-destructive',
        outline: 'border-primary/40 text-primary'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };

import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-0.5 text-xs font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary/10 text-primary',
        solid: 'bg-primary text-white',
        muted: 'bg-bg-deep text-text-muted',
        outline: 'border border-primary text-primary bg-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

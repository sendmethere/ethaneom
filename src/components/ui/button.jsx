import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-dark active:scale-[0.98]',
        secondary:
          'border border-primary text-primary bg-transparent hover:bg-primary/5 active:scale-[0.98]',
        ghost:
          'text-primary hover:bg-bg-deep active:scale-[0.98]',
      },
      size: {
        default: 'px-6 py-2.5 text-sm',
        sm: 'px-4 py-1.5 text-xs',
        lg: 'px-8 py-3 text-base',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

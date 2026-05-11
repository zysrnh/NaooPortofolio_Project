import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-black uppercase tracking-widest transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--nb-primary)] text-[var(--nb-accent)] border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-accent)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px]",
        destructive:
          "bg-red-500 text-white border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
        outline:
          "border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] text-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none hover:bg-[var(--nb-accent-light)]",
        secondary:
          "bg-[var(--nb-accent)] text-[var(--nb-primary)] border-4 border-[var(--nb-primary)] shadow-[4px_4px_0_var(--nb-primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
        ghost: "hover:bg-[var(--nb-accent-light)] text-[var(--nb-primary)]",
        link: "text-[var(--nb-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-10 px-4",
        lg: "h-14 px-10 text-base",
        icon: "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

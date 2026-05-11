import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "border-4 border-[var(--nb-primary)] bg-[var(--nb-bg)] px-4 py-6 text-sm font-bold text-[var(--nb-primary)] placeholder:text-[var(--nb-primary)] placeholder:opacity-30 selection:bg-[var(--nb-accent)] selection:text-[var(--nb-primary)] transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50",
        "focus:bg-[var(--nb-accent-light)] focus:shadow-[4px_4px_0_var(--nb-primary)]",
        className
      )}
      {...props}
    />
  )
}

export { Input }

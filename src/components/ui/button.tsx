import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#e91e8c] text-white shadow-lg shadow-[#e91e8c]/25 hover:bg-[#c41579] hover:shadow-[#e91e8c]/40 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border-2 border-[#e91e8c] text-[#e91e8c] bg-transparent hover:bg-[#fdf2f8] hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "text-foreground hover:bg-[#f5f5f5] hover:text-foreground",
        secondary:
          "bg-[#f8f8f8] text-foreground border border-[#e5e5e5] hover:bg-[#f0f0f0] hover:-translate-y-0.5",
        destructive:
          "bg-red-500 text-white hover:bg-red-600",
        link:
          "text-[#e91e8c] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        xl: "h-15 px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

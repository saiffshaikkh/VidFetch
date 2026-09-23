import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { Spinner } from "./Spinner"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
  isLoading?: boolean
}

const variantStyles: Record<string, string> = {
  default: "bg-indigo-600 text-white shadow hover:bg-indigo-700 focus-visible:ring-indigo-500",
  secondary: "bg-gray-100 text-gray-900 border border-gray-200 shadow-sm hover:bg-gray-200",
  destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500",
  outline: "border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50",
  ghost: "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
  link: "text-indigo-600 underline-offset-4 hover:underline",
}

const sizeStyles: Record<string, string> = {
  default: "h-9 px-4 py-2 text-sm",
  sm: "h-8 rounded-md px-3 text-xs",
  lg: "h-10 rounded-lg px-6 text-sm",
  icon: "h-9 w-9",
}

export function buttonVariants({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: keyof typeof variantStyles
  size?: keyof typeof sizeStyles
  className?: string
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variantStyles[variant] || variantStyles.default,
    sizeStyles[size] || sizeStyles.default,
    className
  )
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, isLoading = false, children, disabled, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={buttonVariants({ variant, size, className })}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Spinner size="sm" />}
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button }

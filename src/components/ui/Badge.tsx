import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" | "purple"
}

const variantStyles: Record<string, string> = {
  default: "border-transparent bg-indigo-600 text-white shadow",
  secondary: "border-transparent bg-gray-100 text-gray-800 border border-gray-200",
  destructive: "border-transparent bg-red-500 text-white shadow",
  outline: "text-gray-700 border-gray-300 bg-white",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-sky-200 bg-sky-50 text-sky-700",
  purple: "border-purple-200 bg-purple-50 text-purple-700",
}

export function badgeVariants({
  variant = "default",
  className = "",
}: {
  variant?: keyof typeof variantStyles
  className?: string
} = {}) {
  return cn(
    "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500",
    variantStyles[variant] || variantStyles.default,
    className
  )
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={badgeVariants({ variant, className })}
      {...props}
    />
  )
}

export { Badge }

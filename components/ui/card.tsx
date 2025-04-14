"use client"

import { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { THEME } from "@/lib/constants"

export interface CardProps {
  title?: string
  description?: string
  className?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
  variant?: "default" | "dark" | "gradient" | "outline"
  children?: ReactNode
  footer?: ReactNode
  header?: ReactNode
  isCompact?: boolean
  isHoverable?: boolean
}

export function Card({
  title,
  description,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  variant = "default",
  children,
  footer,
  header,
  isCompact = false,
  isHoverable = false,
}: CardProps) {
  const variantStyles = {
    default: "bg-card border border-border shadow",
    dark: "bg-zinc-900 border border-zinc-800 shadow-md",
    gradient: `bg-gradient-to-br from-${THEME.PRIMARY} to-${THEME.PRIMARY_DARK} text-white shadow-lg shadow-${THEME.PRIMARY}/20 border-none`,
    outline: "bg-transparent border border-border",
  }

  const hoverStyles = isHoverable
    ? "transition-all duration-200 hover:shadow-md hover:border-zinc-700"
    : ""

  const paddingStyles = isCompact
    ? "p-3"
    : "p-4 md:p-6"

  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden",
        variantStyles[variant],
        hoverStyles,
        className
      )}
    >
      {(title || description || header) && (
        <div
          className={cn(
            "flex flex-col space-y-1",
            paddingStyles,
            variant === "default" && "border-b border-border",
            variant === "dark" && "border-b border-zinc-800",
            headerClassName
          )}
        >
          {header ? (
            header
          ) : (
            <>
              {title && <h3 className={cn("text-lg font-medium", variant === "gradient" && "text-white")}>{title}</h3>}
              {description && (
                <p
                  className={cn(
                    "text-sm",
                    variant === "gradient" ? "text-white/80" : "text-muted-foreground"
                  )}
                >
                  {description}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className={cn(paddingStyles, bodyClassName)}>{children}</div>

      {footer && (
        <div
          className={cn(
            paddingStyles,
            "border-t",
            variant === "default" && "border-border",
            variant === "dark" && "border-zinc-800",
            variant === "gradient" && "border-white/10",
            footerClassName
          )}
        >
          {footer}
        </div>
      )}
    </div>
  )
}

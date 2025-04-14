"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { THEME } from "@/lib/constants"
import { Icon, IconName, getDynamicIcon } from "@/components/ui/icon"

export interface NavigationItem {
  name: string
  path: string
  icon?: IconName | string
}

export interface NavigationProps {
  items: NavigationItem[]
  variant?: "main" | "dashboard"
  className?: string
  onItemClick?: () => void
}

export function Navigation({
  items,
  variant = "main",
  className,
  onItemClick,
}: NavigationProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const mainStyles = "text-muted-foreground hover:text-foreground transition-colors"
  
  const dashboardStyles = (active: boolean) => 
    cn(
      "px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
      active
        ? `bg-gradient-to-r from-${THEME.PRIMARY} to-${THEME.PRIMARY_DARK} text-white shadow-md ${THEME.PRIMARY_SHADOW}`
        : `text-gray-400 hover:bg-${THEME.ACCENT}/50 hover:text-white`
    )

  const renderIcon = (iconName?: string | IconName) => {
    if (!iconName) return null;
    
    try {
      const IconComponent = getDynamicIcon(iconName);
      if (IconComponent) {
        return <IconComponent className="mr-2 h-4 w-4 text-gray-400" />;
      }
      // If it's one of our predefined icons, use the Icon component
      return <Icon name={iconName as IconName} className="mr-2 h-4 w-4 text-gray-400" />;
    } catch (error) {
      console.error(`Failed to render icon: ${iconName}`, error);
      return null;
    }
  };

  if (variant === "main") {
    return (
      <nav className={cn("flex items-center space-x-8", className)}>
        {items.map((item) => (
          <Link 
            key={item.path}
            href={item.path}
            className={mainStyles}
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    )
  }

  return (
    <nav className={cn("flex items-center space-x-1", className)}>
      {items.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={dashboardStyles(isActive(item.path))}
          onClick={onItemClick}
        >
          {item.icon && renderIcon(item.icon)}
          {item.name}
        </Link>
      ))}
    </nav>
  )
} 
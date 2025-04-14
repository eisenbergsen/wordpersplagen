"use client"

import { ReactNode } from "react"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface UserMenuOption {
  id: string
  label: string
  path?: string
  onClick?: () => void
  icon?: LucideIcon
  className?: string
}

export interface UserMenuProps {
  user: {
    name?: string
    email?: string
    avatar?: string
  } | null
  options: UserMenuOption[]
  logoutOption?: UserMenuOption
  className?: string
  showNameOnMobile?: boolean
  children?: ReactNode
}

export function UserMenu({ 
  user, 
  options, 
  logoutOption, 
  className,
  showNameOnMobile = false,
  children 
}: UserMenuProps) {
  const router = useRouter()

  if (!user) return null

  const handleOptionClick = (option: UserMenuOption) => {
    if (option.onClick) {
      option.onClick()
    } else if (option.path) {
      router.push(option.path)
    }
  }

  const nameVisibilityClass = showNameOnMobile ? "inline" : "hidden md:inline"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex items-center space-x-2 focus:outline-none group", className)}>
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-red-500/50 group-hover:border-red-500 transition-all duration-200 shadow-md shadow-red-900/10">
            <img
              src={user.avatar || "/placeholder.svg?height=32&width=32"}
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          {user.name && (
            <span className={`text-sm font-medium text-white ${nameVisibilityClass}`}>
              {user.name}
            </span>
          )}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 text-gray-400 group-hover:text-white transition-colors duration-200 ${nameVisibilityClass}`}
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
          {children}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white shadow-xl">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            {user.name && <p className="text-sm font-medium">{user.name}</p>}
            {user.email && <p className="text-xs text-gray-400 truncate">{user.email}</p>}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-zinc-800" />
        
        {options.map(option => {
          const Icon = option.icon
          
          return (
            <DropdownMenuItem
              key={option.id}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "text-gray-300 hover:text-white hover:bg-zinc-800 cursor-pointer focus:bg-zinc-800",
                option.className
              )}
            >
              {Icon && <Icon className="mr-2 h-4 w-4 text-gray-400" />}
              <span>{option.label}</span>
            </DropdownMenuItem>
          )
        })}
        
        {logoutOption && (
          <>
            <DropdownMenuSeparator className="bg-zinc-800" />
            <DropdownMenuItem
              onClick={() => handleOptionClick(logoutOption)}
              className={cn(
                "text-red-400 hover:text-red-300 hover:bg-red-950/30 cursor-pointer focus:bg-red-950/30",
                logoutOption.className
              )}
            >
              {logoutOption.icon && <logoutOption.icon className="mr-2 h-4 w-4" />}
              <span>{logoutOption.label}</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 
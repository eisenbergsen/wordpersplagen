"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  BarChart2, 
  Users, 
  Key, 
  CreditCard, 
  DollarSign, 
  ChevronRight,
  ChevronLeft,
  Bell,
  Search,
  LogOut,
  Settings
} from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import Logo from "@/components/logo"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const navItems = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      title: "API Management",
      href: "/admin/api",
      icon: <BarChart2 className="h-5 w-5" />
    },
    {
      title: "API Keys",
      href: "/admin/keys",
      icon: <Key className="h-5 w-5" />
    },
    {
      title: "Subscriptions",
      href: "/admin/subscriptions",
      icon: <CreditCard className="h-5 w-5" />
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: <Users className="h-5 w-5" />
    },
    {
      title: "Financial",
      href: "/admin/financial",
      icon: <DollarSign className="h-5 w-5" />
    }
  ]

  return (
    <div className="flex h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
      {/* Sidebar */}
      <div 
        className={`bg-black border-r border-zinc-800 transition-all duration-300 shadow-xl flex flex-col ${
          collapsed ? "w-[80px]" : "w-[240px]"
        }`}
      >
        <div className="flex justify-between items-center p-4 h-16 border-b border-zinc-800">
          {!collapsed && <Logo size="small" />}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setCollapsed(!collapsed)} 
            className="text-gray-400 hover:text-white hover:bg-zinc-800 ml-auto"
          >
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </Button>
        </div>
        
        <ScrollArea className="flex-grow">
          <div className="p-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center ${
                  collapsed ? "justify-center" : "justify-start"
                } rounded-lg px-3 py-2.5 mb-1 text-sm font-medium transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-gradient-to-r from-red-600 to-red-800 text-white shadow-md shadow-red-900/20"
                    : "text-gray-400 hover:bg-zinc-800/50 hover:text-white"
                }`}
              >
                <div className={`${collapsed ? "" : "mr-2"}`}>{item.icon}</div>
                {!collapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t border-zinc-800 flex justify-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => logout()}
            className={`text-red-400 hover:text-red-300 hover:bg-red-950/30 ${
              collapsed ? "w-full justify-center p-2" : "w-full justify-start"
            }`}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-black/80 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between p-4 shadow-lg">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="pl-8 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-gray-500 focus:border-red-700" 
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-gray-400 hover:text-white hover:bg-zinc-800/50"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <img
                    src={user?.avatar || "/placeholder.svg?height=32&width=32"}
                    alt="Admin avatar"
                    className="h-9 w-9 rounded-full border-2 border-red-500/50"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800 text-white shadow-xl">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-zinc-800 cursor-pointer focus:bg-zinc-800">
                  <Settings className="mr-2 h-4 w-4 text-gray-400" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-400 hover:text-red-300 hover:bg-red-950/30 cursor-pointer focus:bg-red-950/30"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-6 bg-[url('/noise.svg')] bg-repeat bg-fixed bg-opacity-5">
          {children}
        </main>
      </div>
    </div>
  )
}

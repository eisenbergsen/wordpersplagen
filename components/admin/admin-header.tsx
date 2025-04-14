"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Menu, X, Bell, Settings, LogOut, ChevronDown, LayoutDashboard, Users, FileText, BarChart3 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import { useAuth } from "@/contexts/auth-context"
import Logo from "@/components/logo"

export default function AdminHeader() {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = () => {
    logout()
    router.push("/admin/login")
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Logo size="medium" />
            <span className="ml-2 text-sm font-semibold text-red-500">Admin</span>
          </div>

          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-2">
              <Link
                href="/admin/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/dashboard")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/users")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Users
              </Link>
              <Link
                href="/admin/content"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/content")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Content
              </Link>
              <Link
                href="/admin/analytics"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin/analytics")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                Analytics
              </Link>
            </nav>
          )}

          <div className="flex items-center space-x-4">
            <button className="text-muted-foreground hover:text-foreground focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 focus:outline-none">
                  <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/30">
                    <img
                      src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop"
                      alt="Admin avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {!isMobile && (
                    <>
                      <span className="text-sm font-medium text-foreground">Admin User</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </>
                  )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-card border-border text-foreground">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={() => router.push("/admin/dashboard")}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/admin/users")}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Users</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/admin/content")}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Content</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/admin/analytics")}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  <span>Analytics</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => router.push("/admin/settings")}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-400 hover:bg-red-500/10 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isMobile && (
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-2 space-y-1">
              <Link
                href="/admin/dashboard"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/admin/dashboard")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/admin/users"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/admin/users")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Users
              </Link>
              <Link
                href="/admin/content"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/admin/content")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Content
              </Link>
              <Link
                href="/admin/analytics"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/admin/analytics")
                    ? "bg-red-500/10 text-red-500"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Analytics
              </Link>
              <div className="pt-4 pb-3 border-t border-border">
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-500 border-red-500/20 hover:bg-red-500/10"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

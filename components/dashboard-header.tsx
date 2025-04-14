"use client"

import { useRouter } from "next/navigation"
import { Bell, LayoutDashboard, FileText, CreditCard, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { BaseHeader } from "@/components/ui/base-header"
import { Navigation } from "@/components/ui/navigation"
import { UserMenu, UserMenuOption } from "@/components/ui/user-menu"
import { Icon } from "@/components/ui/icon"
import { NAVIGATION } from "@/lib/constants"
import Logo from "@/components/logo"

export default function DashboardHeader() {
  const { user, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const renderLogo = () => (
    <Logo size="medium" />
  )

  const renderNavigation = () => (
    <Navigation
      items={NAVIGATION.DASHBOARD}
      variant="dashboard"
      className="hidden md:flex"
    />
  )

  const userMenuOptions: UserMenuOption[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/dashboard',
      icon: LayoutDashboard
    },
    {
      id: 'content',
      label: 'Content',
      path: '/dashboard/content',
      icon: FileText
    },
    {
      id: 'subscription',
      label: 'Subscription',
      path: '/subscription',
      icon: CreditCard
    },
    {
      id: 'settings',
      label: 'Settings',
      path: '/dashboard/settings',
      icon: Settings
    }
  ]

  const logoutOption: UserMenuOption = {
    id: 'logout',
    label: 'Log out',
    onClick: handleLogout,
    icon: LogOut
  }

  const renderActions = () => (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        className="relative text-gray-400 hover:text-white hover:bg-zinc-800/50 focus:ring-0"
      >
        <Bell className="h-5 w-5" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
      </Button>

      <UserMenu 
        user={user} 
        options={userMenuOptions} 
        logoutOption={logoutOption}
      />
    </div>
  )

  const renderMobileMenu = () => (
    <div className="md:hidden border-t border-zinc-800">
      <div className="py-2 space-y-1">
        <Navigation
          items={NAVIGATION.DASHBOARD}
          variant="dashboard"
          className="flex flex-col space-y-1"
          onItemClick={() => {/* Close mobile menu */}}
        />
      </div>
    </div>
  )

  return (
    <BaseHeader
      logoComponent={renderLogo()}
      navigationComponent={renderNavigation()}
      actionsComponent={renderActions()}
      mobileMenuComponent={renderMobileMenu()}
      isDarkMode={true}
    />
  )
}

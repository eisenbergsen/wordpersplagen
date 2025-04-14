"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Users, FileText, BarChart3, Settings, HelpCircle, Bell, ShieldAlert } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function AdminSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: <Users className="h-5 w-5" />,
    },
    {
      name: "Content",
      path: "/admin/content",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      name: "Notifications",
      path: "/admin/notifications",
      icon: <Bell className="h-5 w-5" />,
    },
    {
      name: "Security",
      path: "/admin/security",
      icon: <ShieldAlert className="h-5 w-5" />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: "Help & Support",
      path: "/admin/help",
      icon: <HelpCircle className="h-5 w-5" />,
    },
  ]

  return (
    <Sidebar variant="inset" className="shadow-lg">
      <SidebarHeader>
        <div className="p-2">
          <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Manage your platform</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.name}>
                <Link href={item.path}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-xs text-muted-foreground">
          <p>AI Product Tools Admin v1.0</p>
          <p>© 2025 All rights reserved</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

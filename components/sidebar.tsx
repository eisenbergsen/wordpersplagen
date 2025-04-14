"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Key, FileText, Settings, Cog } from "lucide-react"

interface SidebarProps {
  activeItem?: string
}

export default function Sidebar({ activeItem }: SidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path)
  }

  const sidebarItems = [
    {
      name: "API Settings",
      path: "/dashboard/settings/api",
      icon: <Key className="h-5 w-5" />,
    },
    {
      name: "Prompt Settings",
      path: "/dashboard/settings/prompts",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      name: "Content Settings",
      path: "/dashboard/settings/content",
      icon: <Settings className="h-5 w-5" />,
    },
  ]

  return (
    <div className="w-full bg-card border-r border-border">
      <div className="p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`sidebar-item flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
                isActive(item.path)
                  ? "active text-red-500"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="p-4 mt-8">
        <Link
          href="/dashboard/settings"
          className={`flex items-center px-4 py-3 text-sm rounded-md transition-colors ${
            pathname === "/dashboard/settings"
              ? "bg-red-500/10 text-red-500"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}
        >
          <Cog className="h-5 w-5 mr-3" />
          Save Settings
        </Link>
      </div>
    </div>
  )
}

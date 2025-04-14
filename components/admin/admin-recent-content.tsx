"use client"

import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { AdminContent } from "@/hooks/use-admin-data"

interface AdminRecentContentProps {
  content: AdminContent[]
}

export default function AdminRecentContent({ content }: AdminRecentContentProps) {
  return (
    <div className="space-y-4">
      {content.map((item) => (
        <div key={item.id} className="p-3 rounded-lg bg-muted/30 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="font-medium text-foreground truncate max-w-[200px]">{item.title}</div>
            <div className="flex items-center gap-2">
              <Badge
                className={
                  item.status === "published"
                    ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                    : item.status === "draft"
                      ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                      : "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
                }
              >
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-card border-border text-foreground">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                    <Eye className="h-4 w-4 mr-2" />
                    View Content
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-foreground hover:bg-muted cursor-pointer">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Content
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 cursor-pointer">
                    <Trash className="h-4 w-4 mr-2" />
                    Delete Content
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={
                  item.type === "product_description"
                    ? "border-blue-500/50 text-blue-500"
                    : item.type === "blog_post"
                      ? "border-green-500/50 text-green-500"
                      : "border-orange-500/50 text-orange-500"
                }
              >
                {item.type === "product_description" ? "Product" : item.type === "blog_post" ? "Blog" : "Marketing"}
              </Badge>
              <span className="text-xs text-muted-foreground">User ID: {item.userId}</span>
            </div>
            <span className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

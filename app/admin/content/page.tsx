"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { FileText, Search, Filter, Download, Plus, MoreHorizontal, Trash, Edit, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { staggerContainer, fadeIn } from "@/lib/motion"
import { useAdminData } from "@/hooks/use-admin-data"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function AdminContentPage() {
  const { allContent } = useAdminData()
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter content based on search query and filters
  const filteredContent = allContent.filter((content) => {
    const matchesSearch =
      searchQuery === "" ||
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.userId.toString().includes(searchQuery)

    const matchesType = typeFilter === "all" || content.type === typeFilter
    const matchesStatus = statusFilter === "all" || content.status === statusFilter

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div>
      <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
        <motion.div className="flex items-center mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
          <div className="bg-red-950/30 p-2 rounded-md mr-3">
            <FileText className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Content Management</h1>
            <p className="text-muted-foreground">Manage and monitor generated content</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="mb-8" initial="hidden" animate="show" variants={fadeIn("up", "tween", 0.2, 0.5)}>
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Content</CardTitle>
                <CardDescription>
                  {filteredContent.length} out of {allContent.length} content items
                </CardDescription>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button className="bg-red-500 hover:bg-red-600 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search content..."
                  className="pl-8 bg-muted border-border text-foreground"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="w-40">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="bg-muted border-border text-foreground">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Type" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="product_description">Product Description</SelectItem>
                      <SelectItem value="blog_post">Blog Post</SelectItem>
                      <SelectItem value="marketing_content">Marketing Content</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-40">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="bg-muted border-border text-foreground">
                      <div className="flex items-center">
                        <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                        <SelectValue placeholder="Status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border text-foreground">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="rounded-md border border-border">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-muted/50">
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContent.map((content) => (
                    <TableRow key={content.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{content.id}</TableCell>
                      <TableCell>
                        <div className="font-medium truncate max-w-[200px]">{content.title}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            content.type === "product_description"
                              ? "border-blue-500/50 text-blue-500"
                              : content.type === "blog_post"
                                ? "border-green-500/50 text-green-500"
                                : "border-orange-500/50 text-orange-500"
                          }
                        >
                          {content.type === "product_description"
                            ? "Product"
                            : content.type === "blog_post"
                              ? "Blog"
                              : "Marketing"}
                        </Badge>
                      </TableCell>
                      <TableCell>{content.userId}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            content.status === "published"
                              ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                              : content.status === "draft"
                                ? "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                                : "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"
                          }
                        >
                          {content.status.charAt(0).toUpperCase() + content.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(content.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
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
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Building, Globe, Pencil, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"
import type { User as UserType } from "@/contexts/auth-context"

interface ProfileCardProps {
  user: UserType
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const { updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    company: user.company || "",
    website: user.website || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateProfile(formData)
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden h-full"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-border flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-red-950/30 p-2 rounded-md mr-3">
            <User className="h-5 w-5 text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-foreground">Profile Information</h3>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-4 w-4 mr-2" />
            Edit
          </Button>
        )}
      </div>
      <div className="p-6">
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    className="pl-10 bg-muted border-border text-foreground"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-foreground">
                  Email Address
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    className="pl-10 bg-muted border-border text-foreground"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="company" className="text-foreground">
                  Company (Optional)
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    className="pl-10 bg-muted border-border text-foreground"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="website" className="text-foreground">
                  Website (Optional)
                </Label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    className="pl-10 bg-muted border-border text-foreground"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-border text-foreground hover:bg-muted"
                  onClick={() => {
                    setFormData({
                      name: user.name,
                      email: user.email,
                      company: user.company || "",
                      website: user.website || "",
                    })
                    setIsEditing(false)
                  }}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500/30 mr-4">
                <img
                  src={user.avatar || "/placeholder.svg?height=48&width=48"}
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">{user.name}</h4>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Company</p>
                  <p className="text-foreground">{user.company || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Website</p>
                  <p className="text-foreground">
                    {user.website ? (
                      <a
                        href={user.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-500 hover:text-red-400"
                      >
                        {user.website}
                      </a>
                    ) : (
                      "Not specified"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Member Since</p>
                  <p className="text-foreground">{new Date(user.subscriptionStartDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Account Status</p>
                  <p className="inline-flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <span className="text-foreground">Active</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

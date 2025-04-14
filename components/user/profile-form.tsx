"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, User, Mail, Globe, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"
import { useToast } from "@/hooks/use-toast"

export default function ProfileForm() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    company: user?.company || "",
    website: user?.website || "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateProfile(formData)
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Update failed",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) return null

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Profile Information</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Smith"
                  className="pl-10"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="pl-10"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="company">Company (Optional)</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Inc."
                  className="pl-10"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website (Optional)</Label>
              <div className="relative mt-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="website"
                  name="website"
                  type="url"
                  placeholder="https://example.com"
                  className="pl-10"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}

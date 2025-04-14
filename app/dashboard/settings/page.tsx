"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import DashboardHeader from "@/components/dashboard-header"
import ProfileForm from "@/components/user/profile-form"
import ApiKeyManager from "@/components/user/api-key-manager"
import { useAuth } from "@/contexts/auth-context"
import { staggerContainer, fadeIn } from "@/lib/motion"

export default function SettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <DashboardHeader />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
            <motion.h1 className="text-2xl font-bold text-gray-900" variants={fadeIn("up", "tween", 0.1, 0.5)}>
              Account Settings
            </motion.h1>
            <motion.p className="text-gray-600 mt-1" variants={fadeIn("up", "tween", 0.2, 0.5)}>
              Manage your account information, API keys, and preferences.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <ProfileForm />
            <ApiKeyManager />
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { FileText, Zap, BarChart, CreditCard } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import StatsCard from "@/components/dashboard/stats-card"
import UsageChart from "@/components/dashboard/usage-chart"
import ApiKeyCard from "@/components/dashboard/api-key-card"
import ProfileCard from "@/components/dashboard/profile-card"
import SubscriptionOverview from "@/components/dashboard/subscription-overview"
import { useAuth } from "@/contexts/auth-context"
import { staggerContainer, fadeIn } from "@/lib/motion"

export default function DashboardPage() {
  const { user, userStats, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated || !user || !userStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-zinc-900 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-zinc-900 to-black text-white">
      <DashboardHeader />

      <main className="flex-grow py-8 bg-[url('/noise.svg')] bg-repeat bg-fixed bg-opacity-5">
        <div className="container mx-auto px-4">
          <motion.div 
            className="mb-8 border-l-4 border-red-500 pl-4" 
            initial="hidden" 
            animate="show" 
            variants={staggerContainer(0.1)}
          >
            <motion.h1 className="text-3xl font-bold text-white" variants={fadeIn("up", "tween", 0.1, 0.5)}>
              Dashboard
            </motion.h1>
            <motion.p className="text-gray-400 mt-1" variants={fadeIn("up", "tween", 0.2, 0.5)}>
              Welcome back, <span className="text-red-400 font-medium">{user.name}</span>! Here's an overview of your account.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
              <StatsCard
                title="API Calls"
                value={`${userStats.apiCalls} / ${userStats.apiCallsLimit}`}
                description="Used this month"
                icon={<Zap className="h-5 w-5" />}
                trend="up"
                trendValue="15%"
                color="red"
              />
            </motion.div>

            <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
              <StatsCard
                title="Product Descriptions"
                value={`${userStats.productDescriptionsGenerated} / ${userStats.productDescriptionsLimit}`}
                description="Generated this month"
                icon={<FileText className="h-5 w-5" />}
                trend="up"
                trendValue="8%"
                color="red"
              />
            </motion.div>

            <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
              <StatsCard
                title="Content Quality"
                value={`${userStats.contentQualityScore}%`}
                description="Based on engagement metrics"
                icon={<BarChart className="h-5 w-5" />}
                trend="up"
                trendValue="5%"
                color="red"
              />
            </motion.div>

            <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
              <StatsCard
                title="Subscription"
                value={user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                description={`Renews on ${new Date(user.nextBillingDate).toLocaleDateString()}`}
                icon={<CreditCard className="h-5 w-5" />}
                color="red"
              />
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
              <UsageChart stats={userStats} />
            </div>
            <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
              <ApiKeyCard user={user} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
              <ProfileCard user={user} />
            </div>
            <div className="lg:col-span-2 backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
              <SubscriptionOverview user={user} userStats={userStats} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

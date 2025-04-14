"use client"

import { motion } from "framer-motion"
import { 
  Users, 
  FileText, 
  BarChart3, 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight,
  Clock,
  Download
} from "lucide-react"
import { staggerContainer, fadeIn } from "@/lib/motion"
import { useAdminData } from "@/hooks/use-admin-data"
import AdminUserChart from "@/components/admin/admin-user-chart"
import AdminRevenueChart from "@/components/admin/admin-revenue-chart"
import AdminContentChart from "@/components/admin/admin-content-chart"
import AdminRecentUsers from "@/components/admin/admin-recent-users"
import AdminRecentContent from "@/components/admin/admin-recent-content"
import { Button } from "@/components/ui/button"

export default function AdminDashboardPage() {
  const { stats, recentUsers, recentContent } = useAdminData()

  return (
    <div>
      <motion.div 
        className="mb-8 border-l-4 border-red-500 pl-4" 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer(0.1)}
      >
        <motion.h1 className="text-3xl font-bold text-white tracking-tight" variants={fadeIn("up", "tween", 0.1, 0.5)}>
          Admin Dashboard
        </motion.h1>
        <motion.p className="text-gray-400 mt-1" variants={fadeIn("up", "tween", 0.2, 0.5)}>
          Platform overview and analytics
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
      >
        <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Users</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{stats.totalUsers.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <Users className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +{stats.userGrowth}%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">Total Content</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{stats.totalContent.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <FileText className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +{stats.contentGrowth}%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">API Calls</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{stats.totalApiCalls.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <BarChart3 className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +{stats.apiCallsGrowth}%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last month</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">Monthly Revenue</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">${stats.monthlyRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +{stats.revenueGrowth}%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last month</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div 
          variants={fadeIn("up", "tween", 0.5, 0.5)} 
          initial="hidden" 
          animate="show"
          className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">User Growth</h3>
              <p className="text-gray-400 text-sm mt-1">New registrations over time</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="p-6">
            <div className="h-80">
              <AdminUserChart />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn("up", "tween", 0.6, 0.5)} 
          initial="hidden" 
          animate="show"
          className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Revenue</h3>
              <p className="text-gray-400 text-sm mt-1">Monthly revenue breakdown</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="p-6">
            <div className="h-80">
              <AdminRevenueChart />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <motion.div
          variants={fadeIn("up", "tween", 0.7, 0.5)}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Content Generation</h3>
              <p className="text-gray-400 text-sm mt-1">Content types generated over time</p>
            </div>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
          <div className="p-6">
            <div className="h-80">
              <AdminContentChart />
            </div>
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn("up", "tween", 0.8, 0.5)} 
          initial="hidden" 
          animate="show"
          className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800">
            <h3 className="text-xl font-bold text-white">Subscription Plans</h3>
            <p className="text-gray-400 text-sm mt-1">Distribution of active plans</p>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-500 to-red-700 mr-2"></div>
                    <span className="text-sm font-medium text-white">Starter</span>
                  </div>
                  <span className="text-sm text-gray-400">{stats.plans.starter}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-600 to-red-700 rounded-full"
                    style={{ width: `${stats.plans.starter}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-400 to-red-600 mr-2"></div>
                    <span className="text-sm font-medium text-white">Professional</span>
                  </div>
                  <span className="text-sm text-gray-400">{stats.plans.professional}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                    style={{ width: `${stats.plans.professional}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2 items-center">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-300 to-red-500 mr-2"></div>
                    <span className="text-sm font-medium text-white">Enterprise</span>
                  </div>
                  <span className="text-sm text-gray-400">{stats.plans.enterprise}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                    style={{ width: `${stats.plans.enterprise}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div 
          variants={fadeIn("up", "tween", 0.9, 0.5)} 
          initial="hidden" 
          animate="show"
          className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Recent Users</h3>
              <p className="text-gray-400 text-sm mt-1">Latest user registrations</p>
            </div>
            <Button 
              variant="ghost"
              className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <Clock className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="p-4">
            <AdminRecentUsers users={recentUsers} />
          </div>
        </motion.div>

        <motion.div 
          variants={fadeIn("up", "tween", 1.0, 0.5)} 
          initial="hidden" 
          animate="show"
          className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden"
        >
          <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">Recent Content</h3>
              <p className="text-gray-400 text-sm mt-1">Latest content generated</p>
            </div>
            <Button 
              variant="ghost"
              className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              <Clock className="h-4 w-4 mr-2" />
              View All
            </Button>
          </div>
          <div className="p-4">
            <AdminRecentContent content={recentContent} />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

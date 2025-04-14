"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  BarChart3, 
  ArrowUpRight, 
  Download, 
  Filter,
  Clock,
  DollarSign,
  Zap,
  Activity
} from "lucide-react"
import { staggerContainer, fadeIn } from "@/lib/motion"
import { useAdminData } from "@/hooks/use-admin-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AdminApiUsageChart from "@/components/admin/admin-api-usage-chart"

export default function ApiManagementPage() {
  const { stats } = useAdminData()
  const [timeRange, setTimeRange] = useState("30days")
  
  // Sample data for token usage
  const tokenCostData = [
    { date: "Jan 1", tokens: 256423, cost: 0.51 },
    { date: "Jan 2", tokens: 312490, cost: 0.62 },
    { date: "Jan 3", tokens: 192830, cost: 0.39 },
    { date: "Jan 4", tokens: 289465, cost: 0.58 },
    { date: "Jan 5", tokens: 342175, cost: 0.68 },
  ]

  return (
    <div>
      <motion.div 
        className="mb-8 border-l-4 border-red-500 pl-4" 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer(0.1)}
      >
        <motion.h1 className="text-3xl font-bold text-white tracking-tight" variants={fadeIn("up", "tween", 0.1, 0.5)}>
          API Management
        </motion.h1>
        <motion.p className="text-gray-400 mt-1" variants={fadeIn("up", "tween", 0.2, 0.5)}>
          Monitor API usage, token consumption, and cost tracking
        </motion.p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
      >
        <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">Total API Calls</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{stats.totalApiCalls.toLocaleString()}</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <Activity className="h-5 w-5 text-red-500" />
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

        <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
          <div className="rounded-xl p-6 bg-gradient-to-br from-black via-zinc-900 to-red-950 border border-red-800/30 shadow-lg shadow-red-900/10 backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-300">Tokens Used (Monthly)</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">12,459,830</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <Zap className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +24%
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
                <p className="text-sm font-medium text-gray-300">Token Cost (Monthly)</p>
                <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">$248.92</h3>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-950 to-red-900 shadow-inner border border-white/5">
                <DollarSign className="h-5 w-5 text-red-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center text-green-400 bg-green-950/50 border border-green-800/20">
                +18%
                <ArrowUpRight className="ml-1 h-3 w-3" />
              </span>
              <span className="text-xs text-gray-400 ml-2">vs. last month</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="usage" className="mb-8">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <TabsList className="bg-black/30 border border-zinc-800 mb-2 sm:mb-0">
            <TabsTrigger 
              value="usage" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-red-800 data-[state=active]:text-white"
            >
              Usage Analytics
            </TabsTrigger>
            <TabsTrigger 
              value="tokens" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-red-800 data-[state=active]:text-white"
            >
              Token Consumption
            </TabsTrigger>
            <TabsTrigger 
              value="costs" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-700 data-[state=active]:to-red-800 data-[state=active]:text-white"
            >
              Cost Analysis
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-black/30 border-zinc-800 text-white focus:ring-red-800">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              size="icon"
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <TabsContent value="usage" className="mt-0">
          <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-96 p-4">
              <AdminApiUsageChart timeRange={timeRange} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tokens" className="mt-0">
          <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-96 p-4">
              {/* Token consumption chart would go here */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Token consumption chart visualization</p>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="costs" className="mt-0">
          <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden">
            <div className="h-96 p-4">
              {/* Cost analysis chart would go here */}
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-400">Cost analysis chart visualization</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden mb-8">
        <div className="p-6 border-b border-zinc-800 flex flex-wrap justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-white">Recent Token Usage</h3>
            <p className="text-gray-400 text-sm mt-1">Token consumption by request</p>
          </div>
          <Button 
            variant="ghost"
            className="text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
          >
            <Clock className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Request Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Tokens Used</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Estimated Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {tokenCostData.map((item, index) => (
                <tr key={index} className="hover:bg-zinc-900/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white">Content Generation</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-white text-right">{item.tokens.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                    <span className="text-green-400">${item.cost.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing 5 of 235 entries
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
              disabled
            >
              Previous
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-none"
            >
              1
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              2
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              3
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="text-gray-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { BarChart3, Calendar, Download, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { staggerContainer, fadeIn } from "@/lib/motion"
import { useAdminData } from "@/hooks/use-admin-data"
import AdminApiUsageChart from "@/components/admin/admin-api-usage-chart"
import AdminUserActivityChart from "@/components/admin/admin-user-activity-chart"
import AdminContentTypeChart from "@/components/admin/admin-content-type-chart"
import AdminPlanComparisonChart from "@/components/admin/admin-plan-comparison-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminAnalyticsPage() {
  const { stats } = useAdminData()
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div>
      <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
        <motion.div className="flex items-center mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
          <div className="bg-red-950/30 p-2 rounded-md mr-3">
            <BarChart3 className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
            <p className="text-muted-foreground">Platform usage and performance metrics</p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        initial="hidden"
        animate="show"
        variants={fadeIn("up", "tween", 0.2, 0.5)}
      >
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] bg-muted border-border text-foreground">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border text-foreground">
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
              <SelectItem value="year">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" className="border-border text-foreground hover:bg-muted">
          <Download className="h-4 w-4 mr-2" />
          Export Analytics
        </Button>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
      >
        <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">API Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApiCalls.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <div className={`text-xs ${stats.apiCallsGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.apiCallsGrowth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                  )}
                  {Math.abs(stats.apiCallsGrowth)}%
                </div>
                <div className="text-xs text-muted-foreground ml-1">vs. previous period</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Content Generated</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContent.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <div className={`text-xs ${stats.contentGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.contentGrowth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                  )}
                  {Math.abs(stats.contentGrowth)}%
                </div>
                <div className="text-xs text-muted-foreground ml-1">vs. previous period</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.5, 0.5)}>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeUsers.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <div className={`text-xs ${stats.userGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.userGrowth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                  )}
                  {Math.abs(stats.userGrowth)}%
                </div>
                <div className="text-xs text-muted-foreground ml-1">vs. previous period</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.6, 0.5)}>
          <Card className="shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <div className={`text-xs ${stats.revenueGrowth >= 0 ? "text-green-500" : "text-red-500"}`}>
                  {stats.revenueGrowth >= 0 ? (
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                  )}
                  {Math.abs(stats.revenueGrowth)}%
                </div>
                <div className="text-xs text-muted-foreground ml-1">vs. previous period</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <motion.div variants={fadeIn("up", "tween", 0.7, 0.5)} initial="hidden" animate="show">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>API Usage Over Time</CardTitle>
              <CardDescription>Daily API calls for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <AdminApiUsageChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 0.8, 0.5)} initial="hidden" animate="show">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>Daily active users for the selected period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <AdminUserActivityChart timeRange={timeRange} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div variants={fadeIn("up", "tween", 0.9, 0.5)} initial="hidden" animate="show">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Content Types</CardTitle>
              <CardDescription>Distribution of generated content by type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <AdminContentTypeChart />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeIn("up", "tween", 1.0, 0.5)} initial="hidden" animate="show">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Plan Comparison</CardTitle>
              <CardDescription>Revenue by subscription plan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <AdminPlanComparisonChart />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

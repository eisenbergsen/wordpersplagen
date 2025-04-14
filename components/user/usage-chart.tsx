"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { fadeIn } from "@/lib/motion"
import type { UserStats } from "@/contexts/auth-context"

interface UsageChartProps {
  stats: UserStats
}

export default function UsageChart({ stats }: UsageChartProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Format data for Recharts
    const formattedData = stats.apiCallsHistory.map((item) => ({
      date: new Date(item.date).getDate().toString(),
      apiCalls: item.count,
      fullDate: item.date,
    }))

    setChartData(formattedData)
  }, [stats])

  // Find the month to display
  const getMonthLabel = () => {
    if (stats.apiCallsHistory.length > 0) {
      const middleDate = new Date(stats.apiCallsHistory[Math.floor(stats.apiCallsHistory.length / 2)].date)
      return middleDate.toLocaleString("default", { month: "short" })
    }
    return ""
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.2, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">API Usage</h3>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-sm text-gray-500">Current Usage</div>
            <div className="text-2xl font-bold text-gray-900">
              {stats.apiCalls} / {stats.apiCallsLimit}
            </div>
          </div>
          <div className="text-sm text-gray-500">{stats.apiCallsLimit - stats.apiCalls} calls remaining</div>
        </div>

        <div className="relative h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 30,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280" 
                tick={{ fill: "#6b7280", fontFamily: "'Inter', sans-serif" }}
                label={{ 
                  value: getMonthLabel(), 
                  position: 'bottom', 
                  offset: 0, 
                  fill: "#374151", 
                  fontWeight: "bold",
                  fontFamily: "'Inter', sans-serif"
                }}
              />
              <YAxis 
                stroke="#6b7280" 
                tick={{ fill: "#6b7280", fontFamily: "'Inter', sans-serif" }} 
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  border: "1px solid #e5e7eb",
                  borderRadius: "4px",
                  fontFamily: "'Inter', sans-serif",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
                }}
                labelStyle={{ 
                  color: "#374151", 
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: "bold"
                }}
                labelFormatter={(value, entry) => {
                  const item = entry[0]?.payload
                  if (item && item.fullDate) {
                    return new Date(item.fullDate).toLocaleDateString()
                  }
                  return value
                }}
                formatter={(value) => [`${value} calls`, "API Calls"]}
              />
              <Bar 
                dataKey="apiCalls" 
                name="API Calls" 
                fill="#f97316" 
                radius={[4, 4, 0, 0]} 
                fillOpacity={0.8}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
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
    <div className="w-full h-full p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-white">API Usage Analytics</h3>
          <p className="text-gray-400 text-sm mt-1">Track your API consumption over time</p>
        </div>
        <div className="flex items-center gap-1">
          <div className="px-2 py-1 rounded text-xs font-medium bg-gradient-to-r from-red-700 to-red-900 text-white shadow-sm">
            Last 10 Days
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-6 bg-black/30 p-4 rounded-lg border border-zinc-800">
        <div>
          <div className="text-sm text-gray-400">Current Usage</div>
          <div className="flex items-baseline gap-1.5">
            <div className="text-2xl font-bold text-white">{stats.apiCalls}</div>
            <div className="text-sm font-medium text-gray-400">/ {stats.apiCallsLimit}</div>
          </div>
        </div>
        <div className="text-sm">
          <span className="text-gray-400">Remaining: </span>
          <span className="text-white font-medium">{stats.apiCallsLimit - stats.apiCalls} calls</span>
        </div>
      </div>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 30,
            }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#b91c1c" stopOpacity={0.8} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
            <XAxis 
              dataKey="date" 
              stroke="#a1a1aa" 
              tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }}
              axisLine={{ stroke: '#333333' }}
              tickLine={{ stroke: '#333333' }}
              label={{ 
                value: getMonthLabel(), 
                position: 'bottom', 
                offset: 0, 
                fill: "#a1a1aa", 
                fontWeight: "bold" 
              }}
            />
            <YAxis 
              stroke="#a1a1aa" 
              tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }}
              axisLine={{ stroke: '#333333' }}
              tickLine={{ stroke: '#333333' }}
              tickCount={5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "#ffffff",
                border: "1px solid #333333",
                borderRadius: "8px",
                fontFamily: "'Figtree', sans-serif",
                backdropFilter: "blur(8px)",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
              }}
              labelStyle={{ color: "#ffffff", fontFamily: "'Figtree', sans-serif" }}
              labelFormatter={(value, entry) => {
                const item = entry[0]?.payload
                if (item && item.fullDate) {
                  return new Date(item.fullDate).toLocaleDateString()
                }
                return value
              }}
              cursor={{ fill: 'rgba(239, 68, 68, 0.1)' }}
              formatter={(value) => [`${value} calls`, "API Calls"]}
            />
            <Bar 
              dataKey="apiCalls" 
              name="API Calls" 
              fill="url(#barGradient)" 
              radius={[4, 4, 0, 0]} 
              animationDuration={1500}
              barSize={30}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-center gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm bg-gradient-to-b from-red-500 to-red-700"></div>
          <span>API Calls</span>
        </div>
      </div>
    </div>
  )
}

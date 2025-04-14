"use client"

import { useEffect, useState } from "react"
import { useAdminData } from "@/hooks/use-admin-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export default function AdminApiUsageChart({ timeRange }: { timeRange: string }) {
  const { apiUsageData } = useAdminData()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Filter data based on time range
    let filteredLabels = apiUsageData.labels
    let filteredData = apiUsageData.apiCalls

    if (timeRange === "7days") {
      filteredLabels = apiUsageData.labels.slice(-7)
      filteredData = apiUsageData.apiCalls.slice(-7)
    } else if (timeRange === "30days") {
      filteredLabels = apiUsageData.labels.slice(-30)
      filteredData = apiUsageData.apiCalls.slice(-30)
    } else if (timeRange === "90days") {
      filteredLabels = apiUsageData.labels.slice(-90)
      filteredData = apiUsageData.apiCalls.slice(-90)
    }

    // Format data for Recharts
    const formattedData = filteredLabels.map((label, index) => ({
      date: label,
      apiCalls: filteredData[index],
    }))

    setChartData(formattedData)
  }, [apiUsageData, timeRange])

  return (
    <div className="w-full h-full" style={{ minHeight: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            dataKey="date"
            stroke="#a1a1aa"
            tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis stroke="#a1a1aa" tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              color: "#ffffff",
              border: "1px solid #333333",
              borderRadius: "4px",
              fontFamily: "'Figtree', sans-serif",
            }}
            labelStyle={{ color: "#ffffff", fontFamily: "'Figtree', sans-serif" }}
            itemStyle={{ color: "#e5e5e5", fontFamily: "'Figtree', sans-serif" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontFamily: "'Figtree', sans-serif",
              color: "#a1a1aa",
            }}
          />
          <Bar dataKey="apiCalls" name="API Calls" fill="#ef4444" radius={[4, 4, 0, 0]} animationDuration={1500} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useAdminData } from "@/hooks/use-admin-data"

export default function AdminRevenueChart() {
  const { revenueData } = useAdminData()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Format data for Recharts
    const formattedData = revenueData.labels.map((label, index) => ({
      month: label,
      revenue: revenueData.revenue[index],
    }))

    setChartData(formattedData)
  }, [revenueData])

  return (
    <div className="w-full h-full" style={{ minHeight: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis 
            dataKey="month" 
            stroke="#a1a1aa" 
            tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }}
          />
          <YAxis 
            stroke="#a1a1aa" 
            tick={{ fill: "#a1a1aa", fontFamily: "'Figtree', sans-serif" }}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#171717",
              color: "#ffffff",
              border: "1px solid #333333",
              borderRadius: "4px",
              fontFamily: "'Figtree', sans-serif",
            }}
            labelStyle={{ color: "#ffffff", fontFamily: "'Figtree', sans-serif" }}
            formatter={(value) => [`$${(value as number).toLocaleString()}`, "Revenue"]}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontFamily: "'Figtree', sans-serif",
              color: "#a1a1aa",
            }}
          />
          <Bar 
            dataKey="revenue" 
            name="Revenue" 
            fill="#ef4444" 
            radius={[4, 4, 0, 0]} 
            animationDuration={1500} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

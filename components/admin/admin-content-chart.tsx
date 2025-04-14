"use client"

import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from "recharts"
import { useAdminData } from "@/hooks/use-admin-data"

export default function AdminContentChart() {
  const { contentData } = useAdminData()
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Format data for Recharts
    const formattedData = contentData.labels.map((label, index) => ({
      month: label,
      productDescriptions: contentData.productDescriptions[index],
      blogPosts: contentData.blogPosts[index],
      marketingContent: contentData.marketingContent[index],
    }))

    setChartData(formattedData)
  }, [contentData])

  return (
    <div className="w-full h-full" style={{ minHeight: "300px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
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
            itemStyle={{ color: "#e5e5e5", fontFamily: "'Figtree', sans-serif" }}
          />
          <Legend
            wrapperStyle={{
              paddingTop: "10px",
              fontFamily: "'Figtree', sans-serif",
              color: "#a1a1aa",
            }}
          />
          <Area 
            type="monotone" 
            dataKey="productDescriptions" 
            name="Product Descriptions" 
            stroke="#3b82f6" 
            fill="rgba(59, 130, 246, 0.1)" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            dataKey="blogPosts" 
            name="Blog Posts" 
            stroke="#10b981" 
            fill="rgba(16, 185, 129, 0.1)" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
          <Area 
            type="monotone" 
            dataKey="marketingContent" 
            name="Marketing Content" 
            stroke="#f59e0b" 
            fill="rgba(245, 158, 11, 0.1)" 
            strokeWidth={2}
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useAdminData } from "@/hooks/use-admin-data"

Chart.register(...registerables)

export default function AdminContentTypeChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { contentTypeData } = useAdminData()

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Product Descriptions", "Blog Posts", "Marketing Content"],
        datasets: [
          {
            data: [contentTypeData.productDescriptions, contentTypeData.blogPosts, contentTypeData.marketingContent],
            backgroundColor: ["rgba(59, 130, 246, 0.7)", "rgba(16, 185, 129, 0.7)", "rgba(245, 158, 11, 0.7)"],
            borderColor: ["#3b82f6", "#10b981", "#f59e0b"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "#a1a1aa",
              font: {
                family: "'Figtree', sans-serif",
              },
              padding: 20,
            },
          },
          tooltip: {
            backgroundColor: "#171717",
            titleColor: "#ffffff",
            bodyColor: "#e5e5e5",
            borderColor: "#333333",
            borderWidth: 1,
            padding: 10,
            bodyFont: {
              family: "'Figtree', sans-serif",
            },
            titleFont: {
              family: "'Figtree', sans-serif",
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [contentTypeData])

  return <canvas ref={chartRef} />
}

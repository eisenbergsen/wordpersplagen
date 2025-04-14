"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useAdminData } from "@/hooks/use-admin-data"

Chart.register(...registerables)

export default function AdminUserActivityChart({ timeRange }: { timeRange: string }) {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { userActivityData } = useAdminData()

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Filter data based on time range
    let filteredLabels = userActivityData.labels
    let filteredData = userActivityData.activeUsers

    if (timeRange === "7days") {
      filteredLabels = userActivityData.labels.slice(-7)
      filteredData = userActivityData.activeUsers.slice(-7)
    } else if (timeRange === "30days") {
      filteredLabels = userActivityData.labels.slice(-30)
      filteredData = userActivityData.activeUsers.slice(-30)
    } else if (timeRange === "90days") {
      filteredLabels = userActivityData.labels.slice(-90)
      filteredData = userActivityData.activeUsers.slice(-90)
    }

    // Create new chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: "Active Users",
            data: filteredData,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            borderWidth: 2,
            tension: 0.3,
            fill: true,
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
        scales: {
          x: {
            grid: {
              color: "#333333",
              drawBorder: false,
            },
            ticks: {
              color: "#a1a1aa",
              font: {
                family: "'Figtree', sans-serif",
              },
              maxRotation: 45,
              minRotation: 45,
            },
          },
          y: {
            grid: {
              color: "#333333",
              drawBorder: false,
            },
            ticks: {
              color: "#a1a1aa",
              font: {
                family: "'Figtree', sans-serif",
              },
            },
            beginAtZero: true,
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [userActivityData, timeRange])

  return <canvas ref={chartRef} />
}

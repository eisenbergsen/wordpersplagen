"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"
import { useAdminData } from "@/hooks/use-admin-data"

Chart.register(...registerables)

export default function AdminPlanComparisonChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)
  const { planComparisonData } = useAdminData()

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
      type: "bar",
      data: {
        labels: ["Starter", "Professional", "Enterprise"],
        datasets: [
          {
            label: "Revenue",
            data: [planComparisonData.starter, planComparisonData.professional, planComparisonData.enterprise],
            backgroundColor: ["rgba(239, 68, 68, 0.7)", "rgba(59, 130, 246, 0.7)", "rgba(139, 92, 246, 0.7)"],
            borderColor: ["#ef4444", "#3b82f6", "#8b5cf6"],
            borderWidth: 1,
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#171717",
            titleColor: "#ffffff",
            bodyColor: "#e5e5e5",
            borderColor: "#333333",
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => `$${context.parsed.y.toLocaleString()}`,
            },
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
              callback: (value) => "$" + value.toLocaleString(),
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
  }, [planComparisonData])

  return <canvas ref={chartRef} />
}

"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, ArrowDownRight } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
  color?: "red" | "blue" | "green" | "purple"
}

export default function StatsCard({
  title,
  value,
  description,
  icon,
  trend = "neutral",
  trendValue,
  color = "red",
}: StatsCardProps) {
  const colorClasses = {
    red: {
      bg: "bg-gradient-to-br from-black via-zinc-900 to-red-950",
      border: "border-red-800/30",
      iconBg: "bg-gradient-to-br from-red-950 to-red-900",
      iconColor: "text-red-500",
      trendUp: "text-green-400 bg-green-950/50 border border-green-800/20",
      trendDown: "text-red-400 bg-red-950/50 border border-red-800/20",
      shadowColor: "shadow-red-900/10",
    },
    blue: {
      bg: "bg-gradient-to-br from-black via-zinc-900 to-blue-950",
      border: "border-blue-800/30",
      iconBg: "bg-gradient-to-br from-blue-950 to-blue-900",
      iconColor: "text-blue-500",
      trendUp: "text-green-400 bg-green-950/50 border border-green-800/20",
      trendDown: "text-red-400 bg-red-950/50 border border-red-800/20",
      shadowColor: "shadow-blue-900/10",
    },
    green: {
      bg: "bg-gradient-to-br from-black via-zinc-900 to-green-950",
      border: "border-green-800/30",
      iconBg: "bg-gradient-to-br from-green-950 to-green-900",
      iconColor: "text-green-500",
      trendUp: "text-green-400 bg-green-950/50 border border-green-800/20",
      trendDown: "text-red-400 bg-red-950/50 border border-red-800/20",
      shadowColor: "shadow-green-900/10",
    },
    purple: {
      bg: "bg-gradient-to-br from-black via-zinc-900 to-purple-950",
      border: "border-purple-800/30",
      iconBg: "bg-gradient-to-br from-purple-950 to-purple-900",
      iconColor: "text-purple-500",
      trendUp: "text-green-400 bg-green-950/50 border border-green-800/20",
      trendDown: "text-red-400 bg-red-950/50 border border-red-800/20",
      shadowColor: "shadow-purple-900/10",
    },
  }

  const selectedColor = colorClasses[color]

  return (
    <motion.div
      className={`rounded-xl p-6 ${selectedColor.bg} ${selectedColor.border} shadow-lg ${selectedColor.shadowColor} backdrop-blur-sm`}
      whileHover={{ y: -5, transition: { duration: 0.2 }, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-300">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-white tracking-tight">{value}</h3>
          {description && <p className="text-sm text-gray-400 mt-1">{description}</p>}
        </div>
        <div className={`p-3 rounded-lg ${selectedColor.iconBg} shadow-inner border border-white/5`}>
          <div className={selectedColor.iconColor}>{icon}</div>
        </div>
      </div>

      {trend && trendValue && (
        <div className="mt-4 flex items-center">
          <span
            className={`text-xs font-medium px-2.5 py-1.5 rounded-full flex items-center ${
              trend === "up"
                ? selectedColor.trendUp
                : trend === "down"
                  ? selectedColor.trendDown
                  : "text-gray-400 bg-gray-900/50 border border-gray-700/20"
            }`}
          >
            {trend === "up" ? "+" : trend === "down" ? "-" : ""}
            {trendValue}
            {trend !== "neutral" &&
              (trend === "up" ? (
                <ArrowUpRight className="ml-1 h-3 w-3" />
              ) : (
                <ArrowDownRight className="ml-1 h-3 w-3" />
              ))}
          </span>
          <span className="text-xs text-gray-400 ml-2">vs. last month</span>
        </div>
      )}
    </motion.div>
  )
}

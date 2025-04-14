"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  image?: string
  color?: "orange" | "amber" | "red"
  darkMode?: boolean
}

export default function FeatureCard({
  icon,
  title,
  description,
  image,
  color = "red",
  darkMode = false,
}: FeatureCardProps) {
  const colorClasses = {
    orange: {
      gradient: "from-orange-500 to-amber-500",
      hoverGradient: "from-orange-600 to-amber-600",
      iconBg: "bg-orange-500",
      border: darkMode ? "border-orange-900" : "border-orange-200",
    },
    amber: {
      gradient: "from-amber-500 to-orange-500",
      hoverGradient: "from-amber-600 to-orange-600",
      iconBg: "bg-amber-500",
      border: darkMode ? "border-amber-900" : "border-amber-200",
    },
    red: {
      gradient: "from-red-500 to-red-600",
      hoverGradient: "from-red-600 to-red-700",
      iconBg: "bg-red-500",
      border: darkMode ? "border-red-900/30" : "border-red-200",
    },
  }

  const selectedColor = colorClasses[color]
  const bgColor = darkMode ? "bg-card" : "bg-white"
  const borderColor = darkMode ? "border-border" : "border-gray-100"

  return (
    <motion.div
      className={`${bgColor} rounded-xl shadow-xl border ${borderColor} hover:shadow-2xl transition-all duration-300 group overflow-hidden h-full`}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {image && (
        <div className="relative h-48 w-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedColor.gradient} opacity-80 z-10`}></div>
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
            <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
          </div>
        </div>
      )}
      <div className="p-6">
        {!image && (
          <div className="flex items-center mb-4">
            <div
              className={`w-10 h-10 ${selectedColor.iconBg} rounded-lg flex items-center justify-center text-white mr-3`}
            >
              {icon}
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
          </div>
        )}
        <p className="text-muted-foreground">{description}</p>

        <div className="mt-4 pt-4 border-t border-border">
          <motion.button
            className={`text-sm font-medium bg-gradient-to-r ${selectedColor.gradient} bg-clip-text text-transparent flex items-center`}
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Learn more <ArrowRight className={`ml-1 h-3 w-3 text-${color}-500`} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

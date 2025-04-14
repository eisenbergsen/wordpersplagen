"use client"

import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PricingCardProps {
  title: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular?: boolean
  color?: "orange" | "amber" | "red"
  image?: string
}

export default function PricingCard({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonVariant,
  popular = false,
  color = "red",
  image,
}: PricingCardProps) {
  const colorClasses = {
    orange: {
      gradient: "from-orange-500 to-amber-500",
      hoverGradient: "from-orange-600 to-amber-600",
      bg: "bg-gradient-to-br from-orange-900 to-orange-950",
      border: "border-white-800",
      text: "text-orange-500",
      checkColor: "text-orange-500",
      popularBg: "bg-orange-500",
    },
    amber: {
      gradient: "from-amber-500 to-orange-500",
      hoverGradient: "from-amber-600 to-orange-600",
      bg: "bg-gradient-to-br from-amber-900 to-amber-950",
      border: "border-white-800",
      text: "text-amber-500",
      checkColor: "text-amber-500",
      popularBg: "bg-amber-500",
    },
    red: {
      gradient: "from-black-500 to-black-700",
      hoverGradient: "from-red-600 to-red-800",
      bg: "bg-gradient-to-br from-black-900 to-black-950",
      border: "border-white-800",
      text: "text-red-500",
      checkColor: "text-red-500",
      popularBg: "bg-red-600",
    },
  }

  const selectedColor = colorClasses[color]

  return (
    <motion.div
      className={cn(
        "rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden h-full",
        popular ? `scale-105 z-10` : "",
      )}
      whileHover={{ y: popular ? -5 : -10, transition: { duration: 0.3 } }}
    >
      {image && (
        <div className="relative h-56 w-full overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${selectedColor.gradient} opacity-80 z-10`}></div>
          <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
          <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
            <h3 className="text-xl font-bold text-white drop-shadow-md">{title}</h3>
            {popular && (
              <div className="bg-white text-xs font-bold px-3 py-1 rounded-full text-red-600">Most Popular</div>
            )}
          </div>
        </div>
      )}

      <div className={cn("p-8 h-full", image ? selectedColor.bg : `${selectedColor.bg} border ${selectedColor.border}`)}>
        {!image && (
          <>
            <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
            {popular && (
              <div
                className={`absolute top-0 right-0 ${selectedColor.popularBg} text-white text-xs font-bold px-3 py-1 rounded-bl-lg`}
              >
                Most Popular
              </div>
            )}
          </>
        )}

        <div className="mt-4 mb-6">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400 ml-2">{period}</span>
        </div>

        <p className="text-gray-300 mb-6">{description}</p>

        <Button
          className={cn(
            "w-full mb-8",
            buttonVariant === "default"
              ? `bg-gradient-to-r ${selectedColor.gradient} hover:bg-gradient-to-r hover:${selectedColor.hoverGradient}`
              : `border ${selectedColor.text} hover:bg-gray-700`,
          )}
          variant={buttonVariant}
        >
          {buttonText} {buttonVariant === "default" && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={`h-5 w-5 ${selectedColor.checkColor} mr-3 mt-0.5 flex-shrink-0`} />
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

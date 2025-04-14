"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  avatar?: string
  rating?: number
  darkMode?: boolean
}

export default function TestimonialCard({
  quote,
  author,
  role,
  avatar,
  rating = 5,
  darkMode = false,
}: TestimonialCardProps) {
  const bgColor = darkMode ? "bg-card" : "bg-white"
  const borderColor = darkMode ? "border-border" : "border-gray-100"

  return (
    <motion.div
      className={`${bgColor} rounded-xl shadow-xl border ${borderColor} p-6 h-full flex flex-col`}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      <div className="flex-grow">
        <div className="flex space-x-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < rating ? "text-red-500 fill-red-500" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="text-muted-foreground mb-6">"{quote}"</p>
      </div>
      <div className="flex items-center mt-4">
        {avatar && (
          <div className="mr-3">
            <img src={avatar || "/placeholder.svg"} alt={author} className="w-10 h-10 rounded-full object-cover" />
          </div>
        )}
        <div>
          <h4 className="font-bold text-foreground">{author}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}

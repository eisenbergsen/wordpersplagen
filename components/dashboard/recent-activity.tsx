"use client"

import { motion } from "framer-motion"
import { FileText, ShoppingBag, Mail, CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { RecentActivity } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"

interface RecentActivityCardProps {
  activities: RecentActivity[]
}

export default function RecentActivityCard({ activities }: RecentActivityCardProps) {
  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Function to get icon based on activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "product_description":
        return <ShoppingBag className="h-5 w-5" />
      case "blog_post":
        return <FileText className="h-5 w-5" />
      case "marketing_content":
        return <Mail className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  // Function to get status icon based on activity status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "processing":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  // Function to get activity type label
  const getActivityTypeLabel = (type: string) => {
    switch (type) {
      case "product_description":
        return "Product Description"
      case "blog_post":
        return "Blog Post"
      case "marketing_content":
        return "Marketing Content"
      default:
        return "Content"
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.2, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="divide-y divide-gray-100">
        {activities.length > 0 ? (
          activities.map((activity) => (
            <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {getActivityTypeLabel(activity.type)} • {formatDate(activity.date)}
                      </p>
                    </div>
                    <div className="flex items-center">{getStatusIcon(activity.status)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-6 text-center text-gray-500">No recent activity found.</div>
        )}
      </div>
      {activities.length > 0 && (
        <div className="p-4 border-t border-gray-100">
          <button className="text-sm font-medium text-orange-600 hover:text-orange-500 w-full text-center">
            View all activity
          </button>
        </div>
      )}
    </motion.div>
  )
}

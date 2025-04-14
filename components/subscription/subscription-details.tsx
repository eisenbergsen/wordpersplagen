"use client"

import { motion } from "framer-motion"
import { Calendar, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { User } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"

interface SubscriptionDetailsProps {
  user: User
}

export default function SubscriptionDetails({ user }: SubscriptionDetailsProps) {
  const getPlanDetails = () => {
    switch (user.plan) {
      case "starter":
        return {
          name: "Starter",
          price: user.billingCycle === "monthly" ? "$29" : "$290",
          period: user.billingCycle === "monthly" ? "per month" : "per year",
          color: "orange",
        }
      case "professional":
        return {
          name: "Professional",
          price: user.billingCycle === "monthly" ? "$79" : "$790",
          period: user.billingCycle === "monthly" ? "per month" : "per year",
          color: "amber",
        }
      case "enterprise":
        return {
          name: "Enterprise",
          price: user.billingCycle === "monthly" ? "$199" : "$1,990",
          period: user.billingCycle === "monthly" ? "per month" : "per year",
          color: "red",
        }
      default:
        return {
          name: "Starter",
          price: user.billingCycle === "monthly" ? "$29" : "$290",
          period: user.billingCycle === "monthly" ? "per month" : "per year",
          color: "orange",
        }
    }
  }

  const plan = getPlanDetails()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const getStatusColor = () => {
    switch (user.subscriptionStatus) {
      case "active":
        return "text-green-600"
      case "past_due":
        return "text-amber-600"
      case "canceled":
        return "text-red-600"
      default:
        return "text-green-600"
    }
  }

  const getStatusText = () => {
    switch (user.subscriptionStatus) {
      case "active":
        return "Active"
      case "past_due":
        return "Past Due"
      case "canceled":
        return "Canceled"
      default:
        return "Active"
    }
  }

  const getBillingCycleText = () => {
    return user.billingCycle === "monthly" ? "Monthly" : "Annual"
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Subscription Details</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center">
              <h4 className="text-2xl font-bold text-gray-900">{plan.name} Plan</h4>
              <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()} bg-gray-100`}>
                {getStatusText()}
              </span>
            </div>
            <p className="mt-1 text-gray-600">
              {plan.price} {plan.period}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Change Plan
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Calendar className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Billing Cycle</h5>
                <p className="text-sm text-gray-600 mt-1">{getBillingCycleText()}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <CreditCard className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Next Billing Date</h5>
                <p className="text-sm text-gray-600 mt-1">{formatDate(user.nextBillingDate)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <Clock className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h5 className="text-sm font-medium text-gray-900">Subscription Started</h5>
                <p className="text-sm text-gray-600 mt-1">{formatDate(user.subscriptionStartDate)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Billing Options</h4>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <CreditCard className="mr-2 h-4 w-4" />
              Update Payment Method
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
              <Calendar className="mr-2 h-4 w-4" />
              Change Billing Cycle
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

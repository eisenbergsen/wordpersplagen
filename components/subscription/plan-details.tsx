"use client"

import { motion } from "framer-motion"
import { Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import type { User, UserStats } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"

interface PlanDetailsProps {
  user: User
  stats: UserStats
}

export default function PlanDetails({ user, stats }: PlanDetailsProps) {
  const getPlanDetails = () => {
    switch (user.plan) {
      case "starter":
        return {
          name: "Starter",
          price: "$29",
          color: "orange",
          features: [
            "Up to 50 AI-generated product descriptions per month",
            "5 blog posts per month",
            "Basic SEO optimization",
            "Email support",
            "WooCommerce integration",
          ],
        }
      case "professional":
        return {
          name: "Professional",
          price: "$79",
          color: "amber",
          features: [
            "Up to 200 AI-generated product descriptions per month",
            "15 blog posts per month",
            "Advanced SEO optimization",
            "Marketing content generation",
            "Priority email support",
            "Customer history analysis",
            "WooCommerce integration",
          ],
        }
      case "enterprise":
        return {
          name: "Enterprise",
          price: "$199",
          color: "red",
          features: [
            "Unlimited AI-generated product descriptions",
            "Unlimited blog posts",
            "Premium SEO optimization",
            "Advanced marketing content generation",
            "24/7 priority support",
            "Advanced customer history analysis",
            "Custom AI training for your brand voice",
            "WooCommerce integration",
          ],
        }
      default:
        return {
          name: "Starter",
          price: "$29",
          color: "orange",
          features: [
            "Up to 50 AI-generated product descriptions per month",
            "5 blog posts per month",
            "Basic SEO optimization",
            "Email support",
            "WooCommerce integration",
          ],
        }
    }
  }

  const plan = getPlanDetails()

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  const productDescriptionPercentage = Math.min(
    (stats.productDescriptionsGenerated / stats.productDescriptionsLimit) * 100,
    100,
  )

  const blogPostPercentage = Math.min((stats.blogPostsGenerated / stats.blogPostsLimit) * 100, 100)

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Current Plan</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center">
              <h4 className="text-2xl font-bold text-gray-900">{plan.name}</h4>
              <span className={`ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor()} bg-gray-100`}>
                {getStatusText()}
              </span>
            </div>
            <p className="mt-1 text-gray-600">
              {plan.price} per month • Next billing date: {formatDate(user.nextBillingDate)}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600">
              Upgrade Plan
            </Button>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-700">
                Product Descriptions: {stats.productDescriptionsGenerated} / {stats.productDescriptionsLimit}
              </div>
              <div className="text-xs text-gray-500">
                {stats.productDescriptionsLimit - stats.productDescriptionsGenerated} remaining
              </div>
            </div>
            <Progress value={productDescriptionPercentage} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-gray-700">
                Blog Posts: {stats.blogPostsGenerated} / {stats.blogPostsLimit}
              </div>
              <div className="text-xs text-gray-500">{stats.blogPostsLimit - stats.blogPostsGenerated} remaining</div>
            </div>
            <Progress value={blogPostPercentage} className="h-2" />
          </div>
        </div>

        {user.subscriptionStatus === "past_due" && (
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-amber-800">Payment Issue Detected</h5>
              <p className="text-sm text-amber-700 mt-1">
                We were unable to process your last payment. Please update your payment method to avoid service
                interruption.
              </p>
              <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700">
                Update Payment Method
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <h5 className="text-sm font-medium text-gray-900 mb-4">Plan Features</h5>
          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

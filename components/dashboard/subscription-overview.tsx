"use client"

import { motion } from "framer-motion"
import { CreditCard, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { fadeIn } from "@/lib/motion"
import type { User, UserStats } from "@/contexts/auth-context"
import Link from "next/link"

interface SubscriptionOverviewProps {
  user: User
  userStats: UserStats
}

export default function SubscriptionOverview({ user, userStats }: SubscriptionOverviewProps) {
  const getPlanDetails = () => {
    switch (user.plan) {
      case "starter":
        return {
          name: "Starter",
          price: "$29",
          color: "red",
          features: [
            "Up to 50 AI-generated product descriptions per month",
            "5 blog posts per month",
            "Basic SEO optimization",
            "Email support",
          ],
        }
      case "professional":
        return {
          name: "Professional",
          price: "$79",
          color: "blue",
          features: [
            "Up to 200 AI-generated product descriptions per month",
            "15 blog posts per month",
            "Advanced SEO optimization",
            "Marketing content generation",
            "Priority email support",
          ],
        }
      case "enterprise":
        return {
          name: "Enterprise",
          price: "$199",
          color: "purple",
          features: [
            "Unlimited AI-generated product descriptions",
            "Unlimited blog posts",
            "Premium SEO optimization",
            "Advanced marketing content generation",
            "24/7 priority support",
          ],
        }
      default:
        return {
          name: "Starter",
          price: "$29",
          color: "red",
          features: [
            "Up to 50 AI-generated product descriptions per month",
            "5 blog posts per month",
            "Basic SEO optimization",
            "Email support",
          ],
        }
    }
  }

  const plan = getPlanDetails()

  const productDescriptionPercentage = Math.min(
    (userStats.productDescriptionsGenerated / userStats.productDescriptionsLimit) * 100,
    100,
  )

  const blogPostPercentage = Math.min((userStats.blogPostsGenerated / userStats.blogPostsLimit) * 100, 100)

  const apiCallsPercentage = Math.min((userStats.apiCalls / userStats.apiCallsLimit) * 100, 100)

  return (
    <motion.div
      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden h-full"
      variants={fadeIn("up", "tween", 0.2, 0.5)}
    >
      <div className="p-6 border-b border-border flex items-center">
        <div className="bg-red-950/30 p-2 rounded-md mr-3">
          <CreditCard className="h-5 w-5 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Subscription Plan</h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <div className="flex items-center">
              <h4 className="text-2xl font-bold text-foreground">{plan.name} Plan</h4>
              <span className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium text-green-500 bg-green-950/30">
                Active
              </span>
            </div>
            <p className="mt-1 text-muted-foreground">
              {plan.price} per month • Renews on {new Date(user.nextBillingDate).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/subscription">
              <Button className="bg-red-500 hover:bg-red-600 text-white">Manage Subscription</Button>
            </Link>
          </div>
        </div>

        <div className="space-y-6 mb-6">
          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-foreground">
                API Calls: {userStats.apiCalls} / {userStats.apiCallsLimit}
              </div>
              <div className="text-xs text-muted-foreground">
                {userStats.apiCallsLimit - userStats.apiCalls} remaining
              </div>
            </div>
            <Progress value={apiCallsPercentage} className="h-2 bg-muted" indicatorClassName="bg-red-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-foreground">
                Product Descriptions: {userStats.productDescriptionsGenerated} / {userStats.productDescriptionsLimit}
              </div>
              <div className="text-xs text-muted-foreground">
                {userStats.productDescriptionsLimit - userStats.productDescriptionsGenerated} remaining
              </div>
            </div>
            <Progress value={productDescriptionPercentage} className="h-2 bg-muted" indicatorClassName="bg-blue-500" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm font-medium text-foreground">
                Blog Posts: {userStats.blogPostsGenerated} / {userStats.blogPostsLimit}
              </div>
              <div className="text-xs text-muted-foreground">
                {userStats.blogPostsLimit - userStats.blogPostsGenerated} remaining
              </div>
            </div>
            <Progress value={blogPostPercentage} className="h-2 bg-muted" indicatorClassName="bg-green-500" />
          </div>
        </div>

        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Need more resources?{" "}
              <Link href="/subscription" className="text-red-500 hover:text-red-400">
                Upgrade your plan
              </Link>
            </div>
            <Link href="/subscription">
              <Button
                variant="outline"
                size="sm"
                className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                View All Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

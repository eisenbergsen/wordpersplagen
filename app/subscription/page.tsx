"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { CreditCard, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { useAuth } from "@/contexts/auth-context"
import { staggerContainer, fadeIn } from "@/lib/motion"

export default function SubscriptionPage() {
  const { user, userStats, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated || !user || !userStats) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$29",
      description: "Perfect for small stores just getting started with AI content.",
      features: [
        "Up to 50 AI-generated product descriptions per month",
        "5 blog posts per month",
        "Basic SEO optimization",
        "Email support",
        "WooCommerce integration",
        "500 API calls per month",
      ],
      color: "red",
      popular: false,
      apiCallsLimit: 500,
      productDescriptionsLimit: 50,
      blogPostsLimit: 5,
    },
    {
      id: "professional",
      name: "Professional",
      price: "$79",
      description: "Ideal for growing stores with a moderate product catalog.",
      features: [
        "Up to 200 AI-generated product descriptions per month",
        "15 blog posts per month",
        "Advanced SEO optimization",
        "Marketing content generation",
        "Priority email support",
        "Customer history analysis",
        "WooCommerce integration",
        "1,000 API calls per month",
      ],
      color: "blue",
      popular: true,
      apiCallsLimit: 1000,
      productDescriptionsLimit: 200,
      blogPostsLimit: 15,
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$199",
      description: "For large stores with extensive content needs.",
      features: [
        "Unlimited AI-generated product descriptions",
        "Unlimited blog posts",
        "Premium SEO optimization",
        "Advanced marketing content generation",
        "24/7 priority support",
        "Advanced customer history analysis",
        "Custom AI training for your brand voice",
        "WooCommerce integration",
        "5,000 API calls per month",
      ],
      color: "purple",
      popular: false,
      apiCallsLimit: 5000,
      productDescriptionsLimit: 999999,
      blogPostsLimit: 999999,
    },
  ]

  const colorClasses = {
    red: {
      card: "border-red-500/20",
      badge: "bg-red-950/30 text-red-500",
      button: "bg-red-500 hover:bg-red-600 text-white",
      buttonOutline: "border-red-500/20 text-red-500 hover:bg-red-950/30",
      check: "text-red-500",
      popularBadge: "bg-red-500 text-white",
    },
    blue: {
      card: "border-blue-500/20",
      badge: "bg-blue-950/30 text-blue-500",
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      buttonOutline: "border-blue-500/20 text-blue-500 hover:bg-blue-950/30",
      check: "text-blue-500",
      popularBadge: "bg-blue-500 text-white",
    },
    purple: {
      card: "border-purple-500/20",
      badge: "bg-purple-950/30 text-purple-500",
      button: "bg-purple-500 hover:bg-purple-600 text-white",
      buttonOutline: "border-purple-500/20 text-purple-500 hover:bg-purple-950/30",
      check: "text-purple-500",
      popularBadge: "bg-purple-500 text-white",
    },
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
            <motion.div className="flex items-center mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
              <div className="bg-red-950/30 p-2 rounded-md mr-3">
                <CreditCard className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Subscription Plans</h1>
                <p className="text-muted-foreground">Choose the perfect plan for your business needs</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            initial="hidden"
            animate="show"
            variants={staggerContainer(0.2)}
          >
            {plans.map((plan, index) => {
              const colors = colorClasses[plan.color as keyof typeof colorClasses]
              const isCurrentPlan = user.plan === plan.id

              return (
                <motion.div
                  key={plan.id}
                  variants={fadeIn("up", "tween", 0.1 + index * 0.1, 0.5)}
                  className={`relative bg-card rounded-xl border ${colors.card} shadow-sm overflow-hidden ${
                    plan.popular ? "md:-mt-4 md:mb-4" : ""
                  }`}
                >
                  {plan.popular && (
                    <div
                      className={`absolute top-0 right-0 ${colors.popularBadge} text-xs font-bold px-3 py-1 rounded-bl-lg`}
                    >
                      Most Popular
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground ml-1">per month</span>
                    </div>
                    <p className="text-muted-foreground mb-6">{plan.description}</p>

                    {isCurrentPlan ? (
                      <Button className="w-full mb-6 bg-muted text-muted-foreground cursor-default">
                        Current Plan
                      </Button>
                    ) : (
                      <Button className={`w-full mb-6 ${colors.button}`}>
                        {plan.popular ? "Upgrade Now" : "Select Plan"} <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    )}

                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <Check className={`h-5 w-5 ${colors.check} mr-3 flex-shrink-0 mt-0.5`} />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="bg-card rounded-xl border border-border shadow-sm overflow-hidden"
            initial="hidden"
            animate="show"
            variants={fadeIn("up", "tween", 0.4, 0.5)}
          >
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-foreground">Plan Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Feature
                    </th>
                    {plans.map((plan) => (
                      <th
                        key={plan.id}
                        className={`px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider ${
                          plan.popular ? "bg-muted" : ""
                        }`}
                      >
                        {plan.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">API Calls</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-api`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.apiCallsLimit.toLocaleString()} / month
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Product Descriptions</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-desc`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.productDescriptionsLimit === 999999 ? "Unlimited" : plan.productDescriptionsLimit} / month
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Blog Posts</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-blog`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.blogPostsLimit === 999999 ? "Unlimited" : plan.blogPostsLimit} / month
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">SEO Optimization</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-seo`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.id === "starter" ? "Basic" : plan.id === "professional" ? "Advanced" : "Premium"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Support</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-support`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.id === "starter"
                          ? "Email"
                          : plan.id === "professional"
                            ? "Priority Email"
                            : "24/7 Priority"}
                      </td>
                    ))}
                  </tr>
                  <tr className="hover:bg-muted/30">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">Custom AI Training</td>
                    {plans.map((plan) => (
                      <td
                        key={`${plan.id}-ai`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-center text-foreground"
                      >
                        {plan.id === "enterprise" ? (
                          <Check className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

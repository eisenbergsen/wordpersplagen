"use client"

import { useState } from "react"
import { Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface PricingFeature {
  name: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

interface PricingPlan {
  id: string
  name: string
  price: string
  period: string
  description: string
  features: string[]
  buttonText: string
  buttonVariant: "default" | "outline"
  popular: boolean
  color: "orange" | "amber" | "red"
  image?: string
}

const features: PricingFeature[] = [
  {
    name: "Product Descriptions",
    starter: "50/month",
    professional: "200/month",
    enterprise: "Unlimited",
  },
  {
    name: "Blog Posts",
    starter: "5/month",
    professional: "15/month",
    enterprise: "Unlimited",
  },
  {
    name: "SEO Optimization",
    starter: "Basic",
    professional: "Advanced",
    enterprise: "Premium",
  },
  {
    name: "Marketing Content",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "Customer History Analysis",
    starter: false,
    professional: true,
    enterprise: true,
  },
  {
    name: "Custom AI Training",
    starter: false,
    professional: false,
    enterprise: true,
  },
  {
    name: "Support",
    starter: "Email",
    professional: "Priority Email",
    enterprise: "24/7 Priority",
  },
]

const plans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for small stores just getting started with AI content.",
    features: [
      "Up to 50 AI-generated product descriptions per month",
      "5 blog posts per month",
      "Basic SEO optimization",
      "Email support",
      "WooCommerce integration",
    ],
    buttonText: "Get Started",
    buttonVariant: "outline",
    popular: false,
    color: "orange",
    image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "professional",
    name: "Professional",
    price: "$79",
    period: "per month",
    description: "Ideal for growing stores with a moderate product catalog.",
    features: [
      "Up to 200 AI-generated product descriptions per month",
      "15 blog posts per month",
      "Advanced SEO optimization",
      "Marketing content generation",
      "Priority email support",
      "Customer history analysis",
      "WooCommerce integration",
    ],
    buttonText: "Get Started",
    buttonVariant: "default",
    popular: true,
    color: "amber",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$199",
    period: "per month",
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
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
    color: "red",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=300&auto=format&fit=crop",
  },
]

export default function PricingSelector() {
  const [selectedPlan, setSelectedPlan] = useState<string>("professional")
  const router = useRouter()

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleSubscribe = () => {
    // In a real app, this would redirect to checkout or registration
    router.push("/signup?plan=" + selectedPlan)
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl shadow-xl overflow-hidden border-2 transition-all duration-300 ${
              selectedPlan === plan.id
                ? "border-red-500 transform scale-105 z-10"
                : "border-transparent hover:border-red-300"
            }`}
            onClick={() => handleSelectPlan(plan.id)}
          >
            <div className="relative h-48 w-full overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${
                  plan.id === "starter"
                    ? "from-orange-500 to-amber-500"
                    : plan.id === "professional"
                      ? "from-amber-500 to-orange-500"
                      : "from-red-500 to-orange-500"
                } opacity-80 z-10`}
              ></div>
              <img src={plan.image || "/placeholder.svg"} alt={plan.name} className="w-full h-full object-cover" />
              <div className="absolute top-0 left-0 right-0 p-4 z-20 flex justify-between items-center">
                <h3 className="text-xl font-bold text-white drop-shadow-md">{plan.name}</h3>
                {plan.popular && (
                  <div className="bg-white text-xs font-bold px-3 py-1 rounded-full text-orange-600">Most Popular</div>
                )}
              </div>
            </div>

            <div className="p-8 bg-white">
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600 ml-2">{plan.period}</span>
              </div>

              <p className="text-gray-600 mb-6">{plan.description}</p>

              <Button
                className={`w-full mb-8 ${
                  plan.buttonVariant === "default"
                    ? `bg-gradient-to-r ${
                        plan.id === "starter"
                          ? "from-orange-500 to-amber-500"
                          : plan.id === "professional"
                            ? "from-amber-500 to-orange-500"
                            : "from-red-500 to-orange-500"
                      } hover:opacity-90`
                    : `border ${
                        plan.id === "starter"
                          ? "text-orange-700"
                          : plan.id === "professional"
                            ? "text-amber-700"
                            : "text-red-700"
                      } hover:bg-gray-50`
                }`}
                variant={plan.buttonVariant}
                onClick={handleSubscribe}
              >
                {plan.buttonText}
              </Button>

              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check
                      className={`h-5 w-5 ${
                        plan.id === "starter"
                          ? "text-orange-600"
                          : plan.id === "professional"
                            ? "text-amber-600"
                            : "text-red-600"
                      } mr-3 mt-0.5 flex-shrink-0`}
                    />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-orange-50 to-amber-50">
              <th className="py-4 px-6 text-left text-gray-700 font-semibold border-b border-gray-200">Feature</th>
              <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b border-gray-200">Starter</th>
              <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b border-gray-200 bg-gradient-to-r from-amber-100/50 to-orange-100/50">
                Professional
              </th>
              <th className="py-4 px-6 text-center text-gray-700 font-semibold border-b border-gray-200">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-4 px-6 text-gray-800 border-b border-gray-100">{feature.name}</td>
                <td className="py-4 px-6 text-center text-gray-800 border-b border-gray-100">
                  {typeof feature.starter === "boolean" ? (
                    feature.starter ? (
                      <Check className="mx-auto h-5 w-5 text-orange-600" />
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500">
                        <X className="h-4 w-4" />
                      </span>
                    )
                  ) : (
                    feature.starter
                  )}
                </td>
                <td className="py-4 px-6 text-center text-gray-800 border-b border-gray-100 bg-gradient-to-r from-amber-50/30 to-orange-50/30">
                  {typeof feature.professional === "boolean" ? (
                    feature.professional ? (
                      <Check className="mx-auto h-5 w-5 text-orange-600" />
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500">
                        <X className="h-4 w-4" />
                      </span>
                    )
                  ) : (
                    feature.professional
                  )}
                </td>
                <td className="py-4 px-6 text-center text-gray-800 border-b border-gray-100">
                  {typeof feature.enterprise === "boolean" ? (
                    feature.enterprise ? (
                      <Check className="mx-auto h-5 w-5 text-orange-600" />
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-500">
                        <X className="h-4 w-4" />
                      </span>
                    )
                  ) : (
                    feature.enterprise
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

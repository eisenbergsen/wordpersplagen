"use client"

import { ArrowRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { motion } from "framer-motion"
import { staggerContainer, fadeIn } from "@/lib/motion"
import PricingCard from "@/components/pricing-card"

export default function PricingPage() {
  const pricingPlans = [
    {
      title: "Starter",
      price: "$19",
      period: "/month",
      description: "Perfect for small stores just getting started with AI content.",
      features: [
        "Up to 50 AI-generated descriptions",
        "Basic SEO optimization",
        "Email support",
        "1 user account",
        "Standard API access",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      color: "red" as const,
      image: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
    },
    {
      title: "Professional",
      price: "$49",
      period: "/month",
      description: "Ideal for growing businesses with more content needs.",
      features: [
        "Up to 200 AI-generated descriptions",
        "Advanced SEO optimization",
        "Priority email support",
        "3 user accounts",
        "Enhanced API access",
        "Content scheduling",
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const,
      popular: true,
      color: "red" as const,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    },
    {
      title: "Enterprise",
      price: "$99",
      period: "/month",
      description: "For large stores with high-volume content requirements.",
      features: [
        "Unlimited AI-generated descriptions",
        "Premium SEO optimization",
        "24/7 priority support",
        "10 user accounts",
        "Full API access",
        "Content scheduling",
        "Custom AI training",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const,
      color: "red" as const,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black-900">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-black-900 via-black-800 to-black -z-10" />
          <div className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-cover -z-10" />

          <div className="container mx-auto px-4 py-24">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Choose the Perfect Plan for Your Store
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Select a subscription plan that fits your needs and start generating AI-powered content for your
                WooCommerce store.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-12 md:py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black-100 to-black-800 h-full -z-10" />
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.2)}
            >
              {pricingPlans.map((plan, index) => (
                <motion.div key={plan.title} variants={fadeIn("up", "tween", 0.1 * index, 0.5)}>
                  <PricingCard {...plan} />
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="mt-16 max-w-3xl mx-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn("up", "tween", 0.4, 0.5)}
            >
              <div className="bg-gray-800 rounded-xl p-8 shadow-xl border border-gray-700">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full flex items-center justify-center text-white">
                      <Star className="h-6 w-6" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Need a custom plan?</h3>
                    <p className="text-gray-300 mb-6">
                      We offer custom plans for stores with specific needs. Contact our sales team to discuss your
                      requirements and get a tailored solution for your business.
                    </p>
                    <Button className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800">
                      Contact Sales <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 md:py-24 bg-gradient-to-b from-black-800 to-black-900">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Frequently Asked Questions
              </motion.h2>
              <motion.p
                className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Find answers to common questions about our AI WordPress plugin.
              </motion.p>
            </motion.div>

            <motion.div
              className="max-w-3xl mx-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <div className="space-y-6">
                <motion.div
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                  variants={fadeIn("up", "tween", 0.1, 0.5)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-bold mb-2 text-white">Can I upgrade or downgrade my plan at any time?</h3>
                  <p className="text-gray-300">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will take effect at the start of
                    your next billing cycle.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                  variants={fadeIn("up", "tween", 0.2, 0.5)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-bold mb-2 text-white">Do you offer a free trial?</h3>
                  <p className="text-gray-300">
                    Yes, we offer a 14-day free trial for all plans. No credit card required to get started.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                  variants={fadeIn("up", "tween", 0.3, 0.5)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-bold mb-2 text-white">
                    How does the AI generate content based on customer history?
                  </h3>
                  <p className="text-gray-300">
                    Our AI analyzes customer purchase history, browsing behavior, and preferences to generate
                    personalized content that resonates with your audience.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                  variants={fadeIn("up", "tween", 0.4, 0.5)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-bold mb-2 text-white">
                    Is there a limit to how many products I can have in my store?
                  </h3>
                  <p className="text-gray-300">
                    No, there's no limit to the number of products you can have in your store. The plans only limit how
                    many AI-generated descriptions you can create per month.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gray-800 rounded-xl p-6 shadow-xl border border-gray-700"
                  variants={fadeIn("up", "tween", 0.5, 0.5)}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <h3 className="text-lg font-bold mb-2 text-white">Can I use the content on multiple websites?</h3>
                  <p className="text-gray-300">
                    Each subscription is valid for one WordPress installation. If you need to use the plugin on multiple
                    sites, you'll need a separate subscription for each site.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/60 to-black -z-10" />

          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Start Generating AI Content Today
              </motion.h2>
              <motion.p
                className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Join thousands of store owners who are using our AI plugin to create compelling content, improve SEO,
                and drive more sales.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeIn("up", "tween", 0.3, 0.5)}
              >
                <Button size="lg" className="bg-red-600 text-white hover:bg-red-700">
                  Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                  Schedule a Demo
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

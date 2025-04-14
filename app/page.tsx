"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap, Shield, BarChart4, FileText, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { staggerContainer, fadeIn } from "@/lib/motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-background to-background -z-10" />

          <div className="container mx-auto px-4 py-24 md:py-32">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div
                className="inline-flex items-center px-3 py-1 rounded-full bg-red-950/50 text-red-400 mb-6"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">AI-Powered Content Generation</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Transform Your WooCommerce Store with <span className="text-red-500">AI Product Tools</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.3, 0.5)}
              >
                Generate unique, SEO-optimized product descriptions, blog posts, and marketing content that improves
                search rankings and attracts more organic traffic.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeIn("up", "tween", 0.4, 0.5)}
              >
                <Link href="/signup">
                  <Button size="lg" className="bg-red-500 hover:bg-red-600 text-white">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted">
                    View Pricing
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Powerful Features for Your WooCommerce Store
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Our AI-powered plugin provides everything you need to create compelling content and boost your sales.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
                <FeatureCard
                  icon={<FileText className="h-6 w-6 text-red-500" />}
                  title="AI Product Descriptions"
                  description="Generate unique, SEO-optimized product descriptions that convert visitors into customers."
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <FeatureCard
                  icon={<BarChart4 className="h-6 w-6 text-red-500" />}
                  title="SEO Optimization"
                  description="Automatically optimize your content for search engines to improve rankings and visibility."
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <FeatureCard
                  icon={<Zap className="h-6 w-6 text-red-500" />}
                  title="Instant Blog Posts"
                  description="Create engaging blog posts in seconds that attract and retain customers."
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
                <FeatureCard
                  icon={<Users className="h-6 w-6 text-red-500" />}
                  title="Customer Analysis"
                  description="Analyze customer behavior to create personalized content that resonates with your audience."
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.5, 0.5)}>
                <FeatureCard
                  icon={<Shield className="h-6 w-6 text-red-500" />}
                  title="Brand Voice Training"
                  description="Train the AI to match your brand's unique voice and style for consistent messaging."
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.6, 0.5)}>
                <FeatureCard
                  icon={<Sparkles className="h-6 w-6 text-red-500" />}
                  title="Marketing Content"
                  description="Generate email campaigns, social media posts, and promotional content that drives engagement."
                  darkMode={true}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                How It Works
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Get started with our AI WordPress plugin in just a few simple steps.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div
                className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-xl"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                <div className="w-16 h-16 rounded-full bg-red-950/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-red-500">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Install the Plugin</h3>
                <p className="text-muted-foreground">
                  Install our plugin from the WordPress marketplace or upload it directly to your site.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-xl"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                <div className="w-16 h-16 rounded-full bg-red-950/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-red-500">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Store</h3>
                <p className="text-muted-foreground">
                  Connect your WooCommerce store and select the content types you want to generate.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col items-center text-center bg-card p-6 rounded-xl shadow-xl"
                variants={fadeIn("up", "tween", 0.3, 0.5)}
              >
                <div className="w-16 h-16 rounded-full bg-red-950/30 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-red-500">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Generate Content</h3>
                <p className="text-muted-foreground">
                  Start generating AI-powered content with a single click and watch your store grow.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-foreground mb-4"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                What Our Customers Say
              </motion.h2>
              <motion.p
                className="text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Join thousands of store owners who are already using our AI plugin to grow their business.
              </motion.p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
                <TestimonialCard
                  quote="This plugin has completely transformed how I create content for my store. The AI-generated product descriptions have increased my conversion rate by 35%!"
                  author="Sarah Johnson"
                  role="Owner, Fashion Boutique"
                  avatar="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
                  rating={5}
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <TestimonialCard
                  quote="I was skeptical at first, but the quality of the content is amazing. It's saved me countless hours and improved my SEO rankings dramatically."
                  author="Michael Chen"
                  role="CEO, Tech Gadgets"
                  avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop"
                  rating={5}
                  darkMode={true}
                />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <TestimonialCard
                  quote="The blog posts generated by this plugin are engaging and well-written. My organic traffic has increased by 50% since I started using it."
                  author="Emily Rodriguez"
                  role="Marketing Director, Home Goods"
                  avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=100&auto=format&fit=crop"
                  rating={4}
                  darkMode={true}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-red-900 to-red-950">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-white mb-6"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                Ready to Transform Your WooCommerce Store?
              </motion.h2>
              <motion.p
                className="text-lg text-red-200 mb-8 max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                Join thousands of store owners who are using our AI plugin to create compelling content, improve SEO,
                and drive more sales.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeIn("up", "tween", 0.3, 0.5)}
              >
                <Link href="/signup">
                  <Button size="lg" className="bg-white text-red-900 hover:bg-gray-100">
                    Start Your Free Trial <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                    View Pricing Plans
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

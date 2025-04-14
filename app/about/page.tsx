"use client"

import { motion } from "framer-motion"
import { staggerContainer, fadeIn } from "@/lib/motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Heart, Lightbulb, Target } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-background to-background -z-10" />

          <div className="container mx-auto px-4 py-24">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-foreground"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                About <span className="text-red-500">AI Content Pro</span>
              </motion.h1>

              <motion.p
                className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                We're on a mission to revolutionize how e-commerce stores create content using the power of artificial
                intelligence.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeIn("right", "tween", 0.1, 0.5)}>
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop"
                    alt="Our team working"
                    className="w-full h-auto"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeIn("left", "tween", 0.2, 0.5)}>
                <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
                <p className="text-muted-foreground mb-4">
                  Founded in 2021, AI Content Pro began with a simple observation: e-commerce store owners were spending
                  countless hours writing product descriptions, blog posts, and marketing content.
                </p>
                <p className="text-muted-foreground mb-4">
                  Our founders, a team of AI specialists and e-commerce experts, saw an opportunity to leverage the
                  latest advancements in artificial intelligence to solve this problem.
                </p>
                <p className="text-muted-foreground">
                  After months of development and testing, we launched our AI WordPress plugin, designed specifically
                  for WooCommerce stores. Today, we're proud to serve thousands of store owners worldwide, helping them
                  create compelling content that drives sales and improves SEO.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Our Mission & Values */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn("up", "tween", 0.1, 0.5)}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission & Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're guided by a set of core values that shape everything we do, from product development to customer
                support.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div className="bg-background rounded-xl p-6 shadow-xl" variants={fadeIn("up", "tween", 0.1, 0.5)}>
                <div className="w-12 h-12 bg-red-950/30 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Customer First</h3>
                <p className="text-muted-foreground">
                  We put our customers at the center of everything we do, constantly seeking feedback and improving our
                  product.
                </p>
              </motion.div>

              <motion.div className="bg-background rounded-xl p-6 shadow-xl" variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <div className="w-12 h-12 bg-red-950/30 rounded-full flex items-center justify-center mb-4">
                  <Lightbulb className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible with AI, staying at the forefront of
                  technology.
                </p>
              </motion.div>

              <motion.div className="bg-background rounded-xl p-6 shadow-xl" variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <div className="w-12 h-12 bg-red-950/30 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Quality</h3>
                <p className="text-muted-foreground">
                  We're committed to delivering the highest quality AI-generated content that truly represents our
                  customers' brands.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeIn("up", "tween", 0.1, 0.5)}
            >
              <h2 className="text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're a diverse team of AI specialists, developers, and e-commerce experts passionate about helping
                store owners succeed.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-xl"
                variants={fadeIn("up", "tween", 0.1, 0.5)}
              >
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format&fit=crop"
                  alt="David Chen"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">David Chen</h3>
                  <p className="text-red-500 font-medium mb-3">CEO & Co-Founder</p>
                  <p className="text-muted-foreground text-sm">
                    Former AI researcher with a passion for e-commerce and content marketing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-xl"
                variants={fadeIn("up", "tween", 0.2, 0.5)}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
                  alt="Sarah Johnson"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">Sarah Johnson</h3>
                  <p className="text-red-500 font-medium mb-3">CTO & Co-Founder</p>
                  <p className="text-muted-foreground text-sm">
                    Machine learning expert with 10+ years of experience in natural language processing.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-xl"
                variants={fadeIn("up", "tween", 0.3, 0.5)}
              >
                <img
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop"
                  alt="Michael Rodriguez"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">Michael Rodriguez</h3>
                  <p className="text-red-500 font-medium mb-3">Head of Product</p>
                  <p className="text-muted-foreground text-sm">
                    Former WooCommerce store owner with a deep understanding of e-commerce challenges.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-card rounded-xl overflow-hidden shadow-xl"
                variants={fadeIn("up", "tween", 0.4, 0.5)}
              >
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop"
                  alt="Emily Zhang"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1 text-foreground">Emily Zhang</h3>
                  <p className="text-red-500 font-medium mb-3">Head of Customer Success</p>
                  <p className="text-muted-foreground text-sm">
                    Dedicated to ensuring our customers get the most out of our AI plugin.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-red-900 to-red-950 text-white">
          <div className="container mx-auto px-4">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)}>
                <div className="text-4xl md:text-5xl font-bold mb-2">5,000+</div>
                <p className="text-red-200">Active Users</p>
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <div className="text-4xl md:text-5xl font-bold mb-2">10M+</div>
                <p className="text-red-200">Content Pieces Generated</p>
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
                <p className="text-red-200">Customer Satisfaction</p>
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
                <div className="text-4xl md:text-5xl font-bold mb-2">35%</div>
                <p className="text-red-200">Average Conversion Increase</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={staggerContainer(0.1)}
            >
              <motion.h2 className="text-3xl font-bold text-foreground mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
                Get in Touch
              </motion.h2>
              <motion.p className="text-muted-foreground mb-8" variants={fadeIn("up", "tween", 0.2, 0.5)}>
                Have questions about our AI WordPress plugin? We'd love to hear from you.
              </motion.p>
              <motion.div className="bg-card rounded-xl p-8 shadow-xl" variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">Contact Information</h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Email:</strong> support@aicontentpro.com
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Phone:</strong> +1 (555) 123-4567
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Address:</strong> 123 AI Street, San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-foreground">Office Hours</h3>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Monday-Friday:</strong> 9:00 AM - 6:00 PM PST
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Saturday:</strong> 10:00 AM - 2:00 PM PST
                      </p>
                      <p className="text-muted-foreground">
                        <strong className="text-foreground">Sunday:</strong> Closed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

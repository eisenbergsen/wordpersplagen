"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import { fadeIn } from "@/lib/motion"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-100">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          <motion.div className="md:col-span-1" variants={fadeIn("up", "tween", 0.1, 0.5)}>
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                AI Content Pro
              </span>
            </Link>
            <p className="mt-4 text-gray-600 max-w-xs">
              AI-powered content generation for WooCommerce stores to improve SEO and drive more sales.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-orange-600 transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Product</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/features" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-orange-600 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={fadeIn("up", "tween", 0.4, 0.5)}>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-600 hover:text-orange-600 transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-12 pt-8 border-t border-gray-200"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeIn("up", "tween", 0.5, 0.5)}
        >
          <p className="text-gray-500 text-sm text-center">
            &copy; {new Date().getFullYear()} AI Content Pro. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

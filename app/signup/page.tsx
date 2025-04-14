"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn, staggerContainer } from "@/lib/motion"
import Logo from "@/components/logo"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signup } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid"
    }

    if (!password) {
      newErrors.password = "Password is required"
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await signup(name, email, password)
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      setErrors({ form: "An error occurred during signup. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div className="w-full max-w-md" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
          <div className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="p-8">
              <motion.div variants={fadeIn("up", "tween", 0.1, 0.5)} className="flex justify-center mb-8">
                <Logo size="large" />
              </motion.div>

              <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
                <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Create your account</h1>
                <p className="text-muted-foreground mb-6 text-center">
                  Join thousands of users creating AI-powered content.
                </p>
              </motion.div>

              {errors.form && (
                <motion.div
                  className="mb-4 p-3 bg-red-950/30 border border-red-800/50 text-red-400 rounded-md"
                  variants={fadeIn("up", "tween", 0.2, 0.5)}
                >
                  {errors.form}
                </motion.div>
              )}

              <motion.form onSubmit={handleSubmit} variants={fadeIn("up", "tween", 0.3, 0.5)}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Full Name
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        className={`pl-10 bg-muted border-border text-foreground ${
                          errors.name ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email Address
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={`pl-10 bg-muted border-border text-foreground ${
                          errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-foreground">
                      Password
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 bg-muted border-border text-foreground ${
                          errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-foreground">
                      Confirm Password
                    </Label>
                    <div className="relative mt-1">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className={`pl-10 bg-muted border-border text-foreground ${
                          errors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""
                        }`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>

              <motion.div className="mt-6 text-center text-sm" variants={fadeIn("up", "tween", 0.4, 0.5)}>
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link href="/login" className="font-medium text-red-500 hover:text-red-400">
                    Log in
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

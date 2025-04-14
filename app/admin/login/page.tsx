"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn, staggerContainer } from "@/lib/motion"
import Logo from "@/components/logo"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { adminLogin } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!email.trim()) {
      newErrors.email = "Email is required"
    }

    if (!password) {
      newErrors.password = "Password is required"
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
      await adminLogin(email, password)
      router.push("/admin/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ form: "Invalid email or password. Please try again." })
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
                <h1 className="text-2xl font-bold text-foreground mb-2 text-center">Admin Login</h1>
                <p className="text-muted-foreground mb-6 text-center">
                  Log in to access the admin dashboard and manage your platform.
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
                        placeholder="admin@example.com"
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
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-foreground">
                        Password
                      </Label>
                      <Link href="#" className="text-sm font-medium text-red-500 hover:text-red-400">
                        Forgot password?
                      </Link>
                    </div>
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

                  <div className="flex items-center">
                    <Checkbox
                      id="remember-me"
                      checked={rememberMe}
                      onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      className="border-muted-foreground data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-muted-foreground">
                      Remember me
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-red-500 hover:bg-red-600 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...
                      </>
                    ) : (
                      <>
                        Log in <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </motion.form>

              <motion.div className="mt-6 text-center text-sm" variants={fadeIn("up", "tween", 0.4, 0.5)}>
                <p className="text-muted-foreground">
                  Return to{" "}
                  <Link href="/login" className="font-medium text-red-500 hover:text-red-400">
                    User Login
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

"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// Mock user data
export type User = {
  id: string
  name: string
  email: string
  avatar: string
  company?: string
  website?: string
  plan: "starter" | "professional" | "enterprise"
  subscriptionStatus: "active" | "past_due" | "canceled"
  nextBillingDate: string
  subscriptionStartDate: string
  billingCycle: "monthly" | "annual"
  apiKey: string
  apiKeyLastUsed?: string
  role?: "user" | "admin"
}

// Mock user stats
export type UserStats = {
  productDescriptionsGenerated: number
  productDescriptionsLimit: number
  blogPostsGenerated: number
  blogPostsLimit: number
  seoScore: number
  contentQualityScore: number
  apiCalls: number
  apiCallsLimit: number
  apiCallsHistory: {
    date: string
    count: number
  }[]
}

// Mock recent activities
export type RecentActivity = {
  id: string
  type: "product_description" | "blog_post" | "marketing_content" | "api_call"
  title: string
  date: string
  status: "completed" | "processing" | "failed"
}

// Mock billing history
export type BillingRecord = {
  id: string
  date: string
  amount: string
  status: "paid" | "pending" | "failed"
  invoice: string
  period: string
}

type AuthContextType = {
  user: User | null
  userStats: UserStats | null
  recentActivities: RecentActivity[]
  billingHistory: BillingRecord[]
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  adminLogin: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  generateContent: (type: string, title: string) => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
  regenerateApiKey: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user data
const mockUser: User = {
  id: "user-1",
  name: "John Smith",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&auto=format&fit=crop",
  company: "Acme Inc.",
  website: "https://acme-example.com",
  plan: "professional",
  subscriptionStatus: "active",
  nextBillingDate: "2025-05-15",
  subscriptionStartDate: "2024-11-15",
  billingCycle: "monthly",
  apiKey: "wp_ai_content_pro_8f7d3e2c1a5b9f0e4d7c8b3a2e1d5f9c",
  apiKeyLastUsed: "2025-04-10T09:45:22Z",
  role: "user",
}

// Mock admin user
const mockAdminUser: User = {
  id: "admin-1",
  name: "WordPress Admin",
  email: "admin@wordpressplugin.com",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=100&auto=format&fit=crop",
  company: "AI WordPress Plugin",
  website: "https://aiwordpressplugin.com",
  plan: "enterprise",
  subscriptionStatus: "active",
  nextBillingDate: "2025-05-15",
  subscriptionStartDate: "2024-01-15",
  billingCycle: "annual",
  apiKey: "wp_ai_admin_8f7d3e2c1a5b9f0e4d7c8b3a2e1d5f9c",
  apiKeyLastUsed: "2024-05-22T14:25:00Z",
  role: "admin",
}

// Mock user stats
const mockUserStats: UserStats = {
  productDescriptionsGenerated: 87,
  productDescriptionsLimit: 200,
  blogPostsGenerated: 8,
  blogPostsLimit: 15,
  seoScore: 82,
  contentQualityScore: 91,
  apiCalls: 342,
  apiCallsLimit: 1000,
  apiCallsHistory: [
    { date: "2025-04-10", count: 42 },
    { date: "2025-04-09", count: 38 },
    { date: "2025-04-08", count: 51 },
    { date: "2025-04-07", count: 29 },
    { date: "2025-04-06", count: 35 },
    { date: "2025-04-05", count: 47 },
    { date: "2025-04-04", count: 32 },
    { date: "2025-04-03", count: 44 },
    { date: "2025-04-02", count: 28 },
    { date: "2025-04-01", count: 36 },
  ],
}

// Mock recent activities
const mockRecentActivities: RecentActivity[] = [
  {
    id: "activity-1",
    type: "product_description",
    title: "Organic Cotton T-Shirt",
    date: "2025-04-10T14:30:00Z",
    status: "completed",
  },
  {
    id: "activity-2",
    type: "blog_post",
    title: "10 Ways to Improve Your E-commerce SEO",
    date: "2025-04-09T10:15:00Z",
    status: "completed",
  },
  {
    id: "activity-3",
    type: "api_call",
    title: "API Request: Generate Product Description",
    date: "2025-04-09T08:45:00Z",
    status: "completed",
  },
  {
    id: "activity-4",
    type: "marketing_content",
    title: "Summer Sale Email Campaign",
    date: "2025-04-08T16:45:00Z",
    status: "completed",
  },
  {
    id: "activity-5",
    type: "product_description",
    title: "Wireless Bluetooth Headphones",
    date: "2025-04-07T09:20:00Z",
    status: "completed",
  },
]

// Mock billing history
const mockBillingHistory: BillingRecord[] = [
  {
    id: "invoice-1",
    date: "2025-04-01",
    amount: "$79.00",
    status: "paid",
    invoice: "#INV-2025-001",
    period: "April 1, 2025 - April 30, 2025",
  },
  {
    id: "invoice-2",
    date: "2025-03-01",
    amount: "$79.00",
    status: "paid",
    invoice: "#INV-2025-002",
    period: "March 1, 2025 - March 31, 2025",
  },
  {
    id: "invoice-3",
    date: "2025-02-01",
    amount: "$79.00",
    status: "paid",
    invoice: "#INV-2025-003",
    period: "February 1, 2025 - February 28, 2025",
  },
  {
    id: "invoice-4",
    date: "2025-01-01",
    amount: "$79.00",
    status: "paid",
    invoice: "#INV-2025-004",
    period: "January 1, 2025 - January 31, 2025",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userStats, setUserStats] = useState<UserStats | null>(null)
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([])
  const [billingHistory, setBillingHistory] = useState<BillingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      setUserStats(mockUserStats)
      setRecentActivities(mockRecentActivities)
      setBillingHistory(mockBillingHistory)
    }
    setIsLoading(false)
  }, [])

  // Add a dummy user account for easy login
  const dummyUser = {
    email: "demo@example.com",
    password: "password123",
  }

  // Add a dummy admin account for easy login
  const dummyAdmin = {
    email: "admin@wordpressplugin.com",
    password: "admin123",
  }

  // Update the login function to check for the dummy user
  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if it's the dummy user
    if (email === dummyUser.email && password === dummyUser.password) {
      // Use a slightly modified mock user for the dummy account
      const dummyLoggedInUser = {
        ...mockUser,
        name: "Demo User",
        email: dummyUser.email,
        company: "Demo Company",
        website: "https://demo-company.com",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop",
        plan: "professional",
        apiKey: "wp_ai_demo_8f7d3e2c1a5b9f0e4d7c8b3a2e1d5f9c",
        apiKeyLastUsed: new Date().toISOString(),
      }

      setUser(dummyLoggedInUser)
      setUserStats({
        ...mockUserStats,
        apiCalls: 342,
        apiCallsLimit: 1000,
        productDescriptionsGenerated: 87,
        productDescriptionsLimit: 200,
        blogPostsGenerated: 8,
        blogPostsLimit: 15,
      })
      setRecentActivities(mockRecentActivities)
      setBillingHistory(mockBillingHistory)

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(dummyLoggedInUser))

      setIsLoading(false)
      router.push("/dashboard")
      return
    }

    // For demo purposes, any email/password combination works
    // In a real app, you would validate credentials against a backend
    setUser(mockUser)
    setUserStats(mockUserStats)
    setRecentActivities(mockRecentActivities)
    setBillingHistory(mockBillingHistory)

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(mockUser))

    setIsLoading(false)
    router.push("/dashboard")
  }

  // Admin login function
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check if it's the dummy admin
    if (email === dummyAdmin.email && password === dummyAdmin.password) {
      setUser(mockAdminUser)
      setUserStats(mockUserStats)
      setRecentActivities(mockRecentActivities)
      setBillingHistory(mockBillingHistory)

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(mockAdminUser))

      setIsLoading(false)
      router.push("/admin/dashboard")
      return
    }

    // For demo purposes, allow any admin@* email to login as admin
    if (email.includes("admin@")) {
      setUser({
        ...mockAdminUser,
        email,
      })
      setUserStats(mockUserStats)
      setRecentActivities(mockRecentActivities)
      setBillingHistory(mockBillingHistory)

      // Store user in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...mockAdminUser,
          email,
        }),
      )

      setIsLoading(false)
      router.push("/admin/dashboard")
      return
    }

    // If not admin, throw error
    setIsLoading(false)
    throw new Error("Invalid admin credentials")
  }

  // Mock signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a new user based on the mock user but with the provided name and email
    const newUser = {
      ...mockUser,
      name,
      email,
      plan: "starter" as const, // New users start with the starter plan
      apiKey: `wp_ai_content_pro_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    }

    setUser(newUser)
    setUserStats({
      ...mockUserStats,
      productDescriptionsGenerated: 0,
      productDescriptionsLimit: 50, // Starter plan limit
      blogPostsGenerated: 0,
      blogPostsLimit: 5, // Starter plan limit
      apiCalls: 0,
      apiCallsLimit: 500, // Starter plan API limit
      apiCallsHistory: mockUserStats.apiCallsHistory.map((item) => ({ ...item, count: 0 })),
    })
    setRecentActivities([])
    setBillingHistory([])

    // Store user in localStorage
    localStorage.setItem("user", JSON.stringify(newUser))

    setIsLoading(false)
    router.push("/dashboard")
  }

  // Mock logout function
  const logout = () => {
    setUser(null)
    setUserStats(null)
    setRecentActivities([])
    setBillingHistory([])
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock content generation function
  const generateContent = async (type: string, title: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Create a new activity
    const newActivity: RecentActivity = {
      id: `activity-${Date.now()}`,
      type: type as any,
      title,
      date: new Date().toISOString(),
      status: "completed",
    }

    // Update stats based on content type
    if (userStats) {
      const updatedStats = { ...userStats }

      if (type === "product_description") {
        updatedStats.productDescriptionsGenerated += 1
      } else if (type === "blog_post") {
        updatedStats.blogPostsGenerated += 1
      }

      // Update API calls
      updatedStats.apiCalls += 1

      // Update API call history for today
      const today = new Date().toISOString().split("T")[0]
      const todayIndex = updatedStats.apiCallsHistory.findIndex((item) => item.date === today)

      if (todayIndex >= 0) {
        updatedStats.apiCallsHistory[todayIndex].count += 1
      } else {
        // If today is not in the history, add it
        updatedStats.apiCallsHistory.unshift({ date: today, count: 1 })
        // Keep only the last 10 days
        updatedStats.apiCallsHistory = updatedStats.apiCallsHistory.slice(0, 10)
      }

      setUserStats(updatedStats)
    }

    // Add the new activity to the beginning of the list
    setRecentActivities([newActivity, ...recentActivities.slice(0, 4)])
  }

  // Mock update profile function
  const updateProfile = async (data: Partial<User>) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    setIsLoading(false)
  }

  // Mock regenerate API key function
  const regenerateApiKey = async () => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (user) {
      const newApiKey = `wp_ai_content_pro_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      const updatedUser = { ...user, apiKey: newApiKey }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }

    setIsLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userStats,
        recentActivities,
        billingHistory,
        isAuthenticated: !!user,
        isLoading,
        login,
        adminLogin,
        signup,
        logout,
        generateContent,
        updateProfile,
        regenerateApiKey,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

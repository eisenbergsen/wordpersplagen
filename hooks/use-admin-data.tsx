"use client"

import { useState, useEffect } from "react"

export interface AdminUser {
  id: number
  name: string
  email: string
  avatar: string
  plan: "starter" | "professional" | "enterprise"
  status: "active" | "inactive" | "pending"
  joinedDate: string
  lastActive: string
}

export interface AdminContent {
  id: number
  title: string
  type: "product_description" | "blog_post" | "marketing_content"
  userId: number
  status: "published" | "draft" | "archived"
  createdAt: string
}

interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalContent: number
  totalApiCalls: number
  monthlyRevenue: number
  userGrowth: number
  contentGrowth: number
  apiCallsGrowth: number
  revenueGrowth: number
  plans: {
    starter: number
    professional: number
    enterprise: number
  }
}

interface UserGrowthData {
  labels: string[]
  newUsers: number[]
  activeUsers: number[]
}

interface RevenueData {
  labels: string[]
  revenue: number[]
}

interface ContentData {
  labels: string[]
  productDescriptions: number[]
  blogPosts: number[]
  marketingContent: number[]
}

interface ApiUsageData {
  labels: string[]
  apiCalls: number[]
}

interface UserActivityData {
  labels: string[]
  activeUsers: number[]
}

interface ContentTypeData {
  productDescriptions: number
  blogPosts: number
  marketingContent: number
}

interface PlanComparisonData {
  starter: number
  professional: number
  enterprise: number
}

export function useAdminData() {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    activeUsers: 0,
    totalContent: 0,
    totalApiCalls: 0,
    monthlyRevenue: 0,
    userGrowth: 0,
    contentGrowth: 0,
    apiCallsGrowth: 0,
    revenueGrowth: 0,
    plans: {
      starter: 0,
      professional: 0,
      enterprise: 0,
    },
  })

  const [allUsers, setAllUsers] = useState<AdminUser[]>([])
  const [recentUsers, setRecentUsers] = useState<AdminUser[]>([])
  const [allContent, setAllContent] = useState<AdminContent[]>([])
  const [recentContent, setRecentContent] = useState<AdminContent[]>([])
  const [userGrowthData, setUserGrowthData] = useState<UserGrowthData>({
    labels: [],
    newUsers: [],
    activeUsers: [],
  })
  const [revenueData, setRevenueData] = useState<RevenueData>({
    labels: [],
    revenue: [],
  })
  const [contentData, setContentData] = useState<ContentData>({
    labels: [],
    productDescriptions: [],
    blogPosts: [],
    marketingContent: [],
  })
  const [apiUsageData, setApiUsageData] = useState<ApiUsageData>({
    labels: [],
    apiCalls: [],
  })
  const [userActivityData, setUserActivityData] = useState<UserActivityData>({
    labels: [],
    activeUsers: [],
  })
  const [contentTypeData, setContentTypeData] = useState<ContentTypeData>({
    productDescriptions: 0,
    blogPosts: 0,
    marketingContent: 0,
  })
  const [planComparisonData, setPlanComparisonData] = useState<PlanComparisonData>({
    starter: 0,
    professional: 0,
    enterprise: 0,
  })

  useEffect(() => {
    // Mock data for admin dashboard
    const mockStats: AdminStats = {
      totalUsers: 2547,
      activeUsers: 1823,
      totalContent: 12458,
      totalApiCalls: 345982,
      monthlyRevenue: 28750,
      userGrowth: 12,
      contentGrowth: 18,
      apiCallsGrowth: 24,
      revenueGrowth: 15,
      plans: {
        starter: 35,
        professional: 45,
        enterprise: 20,
      },
    }

    // Generate mock users
    const mockUsers: AdminUser[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      avatar: `https://i.pravatar.cc/150?img=${i + 1}`,
      plan: i % 5 === 0 ? "enterprise" : i % 3 === 0 ? "professional" : "starter",
      status: i % 10 === 0 ? "pending" : i % 7 === 0 ? "inactive" : "active",
      joinedDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      lastActive: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
    }))

    // Generate mock content
    const mockContent: AdminContent[] = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      title: `Content ${i + 1} - ${i % 3 === 0 ? "Product Description" : i % 2 === 0 ? "Blog Post" : "Marketing Email"}`,
      type: i % 3 === 0 ? "product_description" : i % 2 === 0 ? "blog_post" : "marketing_content",
      userId: Math.floor(Math.random() * 50) + 1,
      status: i % 5 === 0 ? "archived" : i % 3 === 0 ? "draft" : "published",
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 90 * 24 * 60 * 60 * 1000)).toISOString(),
    }))

    // Generate dates for the last 12 months
    const last12Months = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setMonth(date.getMonth() - 11 + i)
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
    })

    // Generate dates for the last 90 days
    const last90Days = Array.from({ length: 90 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - 89 + i)
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    })

    // Generate user growth data
    const mockUserGrowthData: UserGrowthData = {
      labels: last12Months,
      newUsers: Array.from({ length: 12 }, () => Math.floor(Math.random() * 300) + 100),
      activeUsers: Array.from({ length: 12 }, () => Math.floor(Math.random() * 1500) + 500),
    }

    // Generate revenue data
    const mockRevenueData: RevenueData = {
      labels: last12Months,
      revenue: Array.from({ length: 12 }, () => Math.floor(Math.random() * 20000) + 15000),
    }

    // Generate content data
    const mockContentData: ContentData = {
      labels: last12Months,
      productDescriptions: Array.from({ length: 12 }, () => Math.floor(Math.random() * 500) + 200),
      blogPosts: Array.from({ length: 12 }, () => Math.floor(Math.random() * 200) + 50),
      marketingContent: Array.from({ length: 12 }, () => Math.floor(Math.random() * 300) + 100),
    }

    // Generate API usage data
    const mockApiUsageData: ApiUsageData = {
      labels: last90Days,
      apiCalls: Array.from({ length: 90 }, () => Math.floor(Math.random() * 5000) + 1000),
    }

    // Generate user activity data
    const mockUserActivityData: UserActivityData = {
      labels: last90Days,
      activeUsers: Array.from({ length: 90 }, () => Math.floor(Math.random() * 1000) + 500),
    }

    // Generate content type data
    const mockContentTypeData: ContentTypeData = {
      productDescriptions: 7845,
      blogPosts: 2356,
      marketingContent: 2257,
    }

    // Generate plan comparison data
    const mockPlanComparisonData: PlanComparisonData = {
      starter: 8500,
      professional: 12750,
      enterprise: 7500,
    }

    setStats(mockStats)
    setAllUsers(mockUsers)
    setRecentUsers(mockUsers.slice(0, 5))
    setAllContent(mockContent)
    setRecentContent(mockContent.slice(0, 5))
    setUserGrowthData(mockUserGrowthData)
    setRevenueData(mockRevenueData)
    setContentData(mockContentData)
    setApiUsageData(mockApiUsageData)
    setUserActivityData(mockUserActivityData)
    setContentTypeData(mockContentTypeData)
    setPlanComparisonData(mockPlanComparisonData)
  }, [])

  return {
    stats,
    allUsers,
    recentUsers,
    allContent,
    recentContent,
    userGrowthData,
    revenueData,
    contentData,
    apiUsageData,
    userActivityData,
    contentTypeData,
    planComparisonData,
  }
}

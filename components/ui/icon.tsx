"use client"

import React from "react"
import dynamic from "next/dynamic"
import { LucideProps } from "lucide-react"
import { 
  Home, Menu, X, Bell, Settings, LogOut, ChevronDown, 
  LayoutDashboard, FileText, CreditCard, HelpCircle, 
  Package, History, User, Users, BarChart, Shield, 
  AlertCircle, CheckCircle, XCircle, ArrowRight, Calendar
} from "lucide-react"
import { cn } from "@/lib/utils"

const iconComponents = {
  Home,
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileText,
  CreditCard,
  HelpCircle,
  Package,
  History,
  User,
  Users,
  BarChart,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  ArrowRight,
  Calendar
}

export type IconName = keyof typeof iconComponents

interface IconProps extends LucideProps {
  name: IconName
  className?: string
}

export function Icon({ name, className, ...props }: IconProps) {
  const IconComponent = iconComponents[name]

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return <IconComponent className={cn(className)} {...props} />
}

export function getDynamicIcon(name: string): React.ComponentType<LucideProps> | null {
  const iconName = name as IconName
  
  if (iconComponents[iconName]) {
    return iconComponents[iconName]
  }
  
  try {
    // Attempt to dynamically load an icon if not in the predefined list
    return dynamic(() => import("lucide-react").then((mod) => mod[iconName]))
  } catch (error) {
    console.error(`Failed to load icon: ${name}`, error)
    return null
  }
} 
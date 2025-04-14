import { IconName } from "@/components/ui/icon"

export const THEME = {
  PRIMARY: 'red-500',
  PRIMARY_HOVER: 'red-600',
  PRIMARY_DARK: 'red-800',
  PRIMARY_LIGHT: 'red-400',
  PRIMARY_SHADOW: 'shadow-red-900/20',
  ACCENT: 'zinc-800',
  ACCENT_HOVER: 'zinc-700',
  ACCENT_LIGHT: 'zinc-700',
  ACCENT_DARK: 'zinc-900',
  BORDER: 'border-zinc-800',
  TEXT: {
    PRIMARY: 'text-white',
    SECONDARY: 'text-gray-400',
    ACCENT: 'text-gray-300',
  },
  BACKGROUND: {
    CARD: 'bg-card',
    DARK: 'bg-black/80',
    GRADIENT: 'bg-gradient-to-r from-red-600 to-red-800',
  }
};

interface NavigationItem {
  name: string
  path: string
  icon?: IconName
}

export const NAVIGATION = {
  MAIN: [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' }
  ] as NavigationItem[],
  
  DASHBOARD: [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Content', path: '/dashboard/content', icon: 'FileText' },
    { name: 'Subscription', path: '/subscription', icon: 'CreditCard' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'Settings' }
  ] as NavigationItem[],
  
  USER_DROPDOWN: [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Content', path: '/dashboard/content', icon: 'FileText' },
    { name: 'Subscription', path: '/subscription', icon: 'CreditCard' },
    { name: 'Settings', path: '/dashboard/settings', icon: 'Settings' }
  ] as NavigationItem[]
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    SIGNUP: '/api/auth/signup',
    ADMIN_LOGIN: '/api/auth/admin-login',
  },
  USER: {
    PROFILE: '/api/user/profile',
    UPDATE_PROFILE: '/api/user/profile/update',
    REGENERATE_API_KEY: '/api/user/api-key/regenerate',
  },
  CONTENT: {
    GENERATE: '/api/content/generate',
  }
}; 
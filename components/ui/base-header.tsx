"use client"

import { useState, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

export interface BaseHeaderProps {
  className?: string
  logoComponent: ReactNode
  navigationComponent?: ReactNode
  actionsComponent?: ReactNode
  mobileMenuComponent?: ReactNode
  isScrollSensitive?: boolean
  isDarkMode?: boolean
}

export function BaseHeader({
  className,
  logoComponent,
  navigationComponent,
  actionsComponent,
  mobileMenuComponent,
  isScrollSensitive = false,
  isDarkMode = false,
}: BaseHeaderProps) {
  const isMobile = useMobile()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    if (!isScrollSensitive) return

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isScrollSensitive])

  const baseStyles = cn(
    "sticky top-0 z-50 transition-all duration-300",
    isDarkMode
      ? "bg-black/80 backdrop-blur-md border-b border-zinc-800"
      : "bg-card backdrop-blur-md",
    isScrollSensitive && scrolled
      ? "shadow-md border-transparent"
      : !isDarkMode && "border-b border-border",
    className
  )

  return (
    <motion.header
      className={baseStyles}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">{logoComponent}</div>

          {!isMobile && navigationComponent}
          {!isMobile && actionsComponent}

          {isMobile && mobileMenuComponent && (
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isMobile && isMenuOpen && mobileMenuComponent && (
            <motion.div
              className="md:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {mobileMenuComponent}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
} 
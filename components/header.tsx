"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BaseHeader } from "@/components/ui/base-header"
import { Navigation } from "@/components/ui/navigation"
import { NAVIGATION } from "@/lib/constants"
import Logo from "@/components/logo"

export default function Header() {
  const renderLogo = () => (
    <Link href="/" className="flex items-center">
      <Logo size="medium" />
    </Link>
  )

  const renderNavigation = () => (
    <Navigation 
      items={NAVIGATION.MAIN} 
      variant="main" 
      className="hidden md:flex"
    />
  )

  const renderActions = () => (
    <div className="hidden md:flex items-center space-x-4">
      <Link href="/login">
        <Button variant="outline" size="sm" className="border-border text-foreground hover:bg-muted">
          Log In
        </Button>
      </Link>
      <Link href="/signup">
        <Button size="sm" className="bg-red-500 hover:bg-red-600 text-white">
          Sign Up
        </Button>
      </Link>
    </div>
  )

  const renderMobileMenu = () => (
    <div className="container mx-auto px-4 py-4">
      <Navigation 
        items={NAVIGATION.MAIN} 
        variant="main" 
        className="flex flex-col space-y-4"
        onItemClick={() => {/* Close mobile menu */}}
      />
      <div className="flex space-x-4 pt-2 mt-4">
        <Link href="/login" className="flex-1">
          <Button
            variant="outline"
            size="sm"
            className="w-full border-border text-foreground hover:bg-muted"
          >
            Log In
          </Button>
        </Link>
        <Link href="/signup" className="flex-1">
          <Button size="sm" className="w-full bg-red-500 hover:bg-red-600 text-white">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  )

  return (
    <BaseHeader
      logoComponent={renderLogo()}
      navigationComponent={renderNavigation()}
      actionsComponent={renderActions()}
      mobileMenuComponent={renderMobileMenu()}
      isScrollSensitive={true}
    />
  )
}

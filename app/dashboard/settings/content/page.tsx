"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Save } from "lucide-react"
import DashboardHeader from "@/components/dashboard-header"
import Sidebar from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { staggerContainer, fadeIn } from "@/lib/motion"

export default function ContentSettingsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const [language, setLanguage] = useState("English")
  const [writingStyle, setWritingStyle] = useState("Professional")
  const [maxLength, setMaxLength] = useState("1000")
  const [maxShortLength, setMaxShortLength] = useState("300")
  const [maxTagCount, setMaxTagCount] = useState("3")
  const [aiModel, setAiModel] = useState("GPT-4o - Versatile, high-intelligence flagship model")

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />

      <main className="flex-grow flex">
        <div className="w-64 hidden md:block">
          <Sidebar activeItem="content" />
        </div>

        <div className="flex-grow p-6">
          <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
            <motion.div className="flex items-center mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
              <div className="bg-red-500/10 p-2 rounded-md mr-3">
                <Settings className="h-6 w-6 text-red-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Content Settings</h1>
            </motion.div>
          </motion.div>

          <motion.div className="space-y-8 max-w-3xl" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
            <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
              <div className="mb-6">
                <Label htmlFor="language" className="text-foreground mb-2 block">
                  Language
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language" className="w-full bg-card border-border text-foreground">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <Label htmlFor="writing-style" className="text-foreground mb-2 block">
                  Writing Style
                </Label>
                <Select value={writingStyle} onValueChange={setWritingStyle}>
                  <SelectTrigger id="writing-style" className="w-full bg-card border-border text-foreground">
                    <SelectValue placeholder="Select writing style" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="Professional">Professional</SelectItem>
                    <SelectItem value="Casual">Casual</SelectItem>
                    <SelectItem value="Formal">Formal</SelectItem>
                    <SelectItem value="Friendly">Friendly</SelectItem>
                    <SelectItem value="Technical">Technical</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Select the writing style for your product descriptions
                </p>
              </div>

              <div className="mb-6">
                <Label htmlFor="max-length" className="text-foreground mb-2 block">
                  Maximum Length
                </Label>
                <Input
                  id="max-length"
                  type="number"
                  value={maxLength}
                  onChange={(e) => setMaxLength(e.target.value)}
                  className="bg-card border-border text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum character length for normal product descriptions
                </p>
              </div>

              <div className="mb-6">
                <Label htmlFor="max-short-length" className="text-foreground mb-2 block">
                  Maximum Short Description Length
                </Label>
                <Input
                  id="max-short-length"
                  type="number"
                  value={maxShortLength}
                  onChange={(e) => setMaxShortLength(e.target.value)}
                  className="bg-card border-border text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Maximum character length for short product descriptions
                </p>
              </div>

              <div className="mb-6">
                <Label htmlFor="max-tag-count" className="text-foreground mb-2 block">
                  Maximum Tag Count
                </Label>
                <Input
                  id="max-tag-count"
                  type="number"
                  value={maxTagCount}
                  onChange={(e) => setMaxTagCount(e.target.value)}
                  className="bg-card border-border text-foreground"
                />
                <p className="text-sm text-muted-foreground mt-2">Maximum number of tags to generate for products</p>
              </div>

              <div className="mb-6">
                <Label htmlFor="ai-model" className="text-foreground mb-2 block">
                  AI Model for Single Generation
                </Label>
                <Select value={aiModel} onValueChange={setAiModel}>
                  <SelectTrigger id="ai-model" className="w-full bg-card border-border text-foreground">
                    <SelectValue placeholder="Select AI model" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border text-foreground">
                    <SelectItem value="GPT-4o - Versatile, high-intelligence flagship model">
                      GPT-4o - Versatile, high-intelligence flagship model
                    </SelectItem>
                    <SelectItem value="GPT-3.5 Turbo - Fast and cost-effective model">
                      GPT-3.5 Turbo - Fast and cost-effective model
                    </SelectItem>
                    <SelectItem value="Claude 3 - Specialized for long-form content">
                      Claude 3 - Specialized for long-form content
                    </SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  Select the AI model to use for single generating feature
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
              <Button className="bg-red-500 hover:bg-red-600 text-white">
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

function Settings(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

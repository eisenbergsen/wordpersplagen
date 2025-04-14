"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Key, Copy, RefreshCw, Check, Eye, EyeOff, AlertCircle, Loader2, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import DashboardHeader from "@/components/dashboard-header"
import { useAuth } from "@/contexts/auth-context"
import { staggerContainer, fadeIn } from "@/lib/motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function ApiKeysPage() {
  const { user, isAuthenticated, isLoading, regenerateApiKey } = useAuth()
  const router = useRouter()

  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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

  const apiKey = user.apiKey

  // Mask the API key, showing only the first 4 and last 4 characters
  const maskedApiKey = showApiKey
    ? apiKey
    : `${apiKey.substring(0, 4)}${"•".repeat(apiKey.length - 8)}${apiKey.substring(apiKey.length - 4)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleRegenerateApiKey = async () => {
    setIsRegenerating(true)
    setIsDialogOpen(false)

    try {
      await regenerateApiKey()
    } catch (error) {
      console.error("Error regenerating API key:", error)
    } finally {
      setIsRegenerating(false)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never"

    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <motion.div className="mb-8" initial="hidden" animate="show" variants={staggerContainer(0.1)}>
            <motion.div className="flex items-center mb-6" variants={fadeIn("up", "tween", 0.1, 0.5)}>
              <div className="bg-red-950/30 p-2 rounded-md mr-3">
                <Key className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">API Key Management</h1>
                <p className="text-muted-foreground">Manage your API keys for accessing AI Product Tools</p>
              </div>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 gap-8">
            <motion.div
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
              variants={fadeIn("up", "tween", 0.2, 0.5)}
              initial="hidden"
              animate="show"
            >
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">Primary API Key</h3>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this API key to authenticate requests to the AI Product Tools API. Keep this key secure and do
                    not share it publicly.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-center">
                      <Clock className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Last Used</p>
                        <p className="text-sm text-muted-foreground">{formatDate(user.apiKeyLastUsed)}</p>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg border border-border flex items-center">
                      <Calendar className="h-5 w-5 text-red-500 mr-3" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Created On</p>
                        <p className="text-sm text-muted-foreground">{formatDate(user.subscriptionStartDate)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="flex items-center">
                    <div className="flex-1 bg-muted border border-border rounded-l-md p-3 font-mono text-sm overflow-x-auto text-foreground">
                      {maskedApiKey}
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-3 bg-card border-t border-r border-b border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="p-3 bg-card border-t border-r border-b border-border rounded-r-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      disabled={copied}
                    >
                      {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border border-border mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-2">Example Usage</h4>
                  <pre className="bg-card p-3 rounded-md text-xs overflow-x-auto border border-border">
                    <code className="text-muted-foreground">
                      {`curl -X POST https://api.aiproducttools.com/v1/generate \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -d '{"prompt": "Generate a product description for a wireless headphone"}'`}
                    </code>
                  </pre>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="border-red-500/20 text-red-500 hover:bg-red-950/30">
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Regenerate API Key
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border text-foreground">
                    <DialogHeader>
                      <DialogTitle>Regenerate API Key</DialogTitle>
                      <DialogDescription className="text-muted-foreground">
                        Are you sure you want to regenerate your API key? This action cannot be undone and your current
                        API key will be invalidated immediately.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="bg-red-950/20 border border-red-800/30 rounded-md p-4 flex items-start">
                      <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-red-400">
                        Any applications or scripts using your current API key will stop working. Make sure to update
                        them with the new key.
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        className="border-border text-foreground hover:bg-muted"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleRegenerateApiKey}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={isRegenerating}
                      >
                        {isRegenerating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Regenerating...
                          </>
                        ) : (
                          "Regenerate Key"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>

            <motion.div
              className="bg-card rounded-xl shadow-sm border border-border overflow-hidden"
              variants={fadeIn("up", "tween", 0.3, 0.5)}
              initial="hidden"
              animate="show"
            >
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-bold text-foreground">API Documentation</h3>
              </div>
              <div className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Learn how to use our API to generate content, manage products, and more.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border hover:border-red-500/30 transition-colors">
                    <h4 className="text-sm font-medium text-foreground mb-2">Getting Started</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Learn the basics of our API and how to make your first request.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/20 text-red-500 hover:bg-red-950/30"
                    >
                      View Guide
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border border-border hover:border-red-500/30 transition-colors">
                    <h4 className="text-sm font-medium text-foreground mb-2">API Reference</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Complete documentation of all available endpoints and parameters.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/20 text-red-500 hover:bg-red-950/30"
                    >
                      View Reference
                    </Button>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg border border-border hover:border-red-500/30 transition-colors">
                    <h4 className="text-sm font-medium text-foreground mb-2">Code Examples</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Sample code in various languages to help you integrate quickly.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-red-500/20 text-red-500 hover:bg-red-950/30"
                    >
                      View Examples
                    </Button>
                  </div>
                </div>

                <div className="bg-muted/30 p-4 rounded-lg border border-border">
                  <h4 className="text-sm font-medium text-foreground mb-2">Rate Limits</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    Your current plan ({user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}) includes the following
                    rate limits:
                  </p>
                  <ul className="list-disc list-inside text-xs text-muted-foreground space-y-1">
                    <li>Maximum of 10 requests per second</li>
                    <li>Maximum of 1,000 requests per hour</li>
                    <li>
                      Maximum of{" "}
                      {user.plan === "starter" ? "10,000" : user.plan === "professional" ? "50,000" : "200,000"}{" "}
                      requests per month
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}

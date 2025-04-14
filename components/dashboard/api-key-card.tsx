"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, RefreshCw, Check, Eye, EyeOff, AlertCircle, Loader2, Key } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { User } from "@/contexts/auth-context"

interface ApiKeyCardProps {
  user: User
}

export default function ApiKeyCard({ user }: ApiKeyCardProps) {
  const { regenerateApiKey } = useAuth()
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

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
    <motion.div
      className="bg-card rounded-xl shadow-sm border border-border overflow-hidden h-full"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-border flex items-center">
        <div className="bg-red-950/30 p-2 rounded-md mr-3">
          <Key className="h-5 w-5 text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-foreground">API Key</h3>
      </div>
      <div className="p-6">
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-4">
            Use this API key to authenticate requests to the AI Product Tools API.
          </p>
          <div className="flex items-center text-sm text-muted-foreground mb-4">
            <span className="mr-2">Last used:</span>
            <span className="font-medium text-foreground">{formatDate(user.apiKeyLastUsed)}</span>
          </div>
        </div>

        <div className="relative">
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

        <div className="mt-6">
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
                  Are you sure you want to regenerate your API key? This action cannot be undone and your current API
                  key will be invalidated immediately.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-red-950/20 border border-red-800/30 rounded-md p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-400">
                  Any applications or scripts using your current API key will stop working. Make sure to update them
                  with the new key.
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
      </div>
    </motion.div>
  )
}

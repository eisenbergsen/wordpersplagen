"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Copy, RefreshCw, Check, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react"
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

export default function ApiKeyManager() {
  const { user, regenerateApiKey } = useAuth()
  const [showApiKey, setShowApiKey] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (!user) return null

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
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.1, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">API Key</h3>
      </div>
      <div className="p-6">
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this API key to authenticate requests to the AI Content Pro API. Keep this key secure and do not share
            it publicly.
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-2">Last used:</span>
            <span className="font-medium">{formatDate(user.apiKeyLastUsed)}</span>
          </div>
        </div>

        <div className="relative">
          <div className="flex items-center">
            <div className="flex-1 bg-gray-50 border border-gray-200 rounded-l-md p-3 font-mono text-sm overflow-x-auto">
              {maskedApiKey}
            </div>
            <button
              onClick={() => setShowApiKey(!showApiKey)}
              className="p-3 bg-gray-100 border-t border-r border-b border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
            >
              {showApiKey ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
            <button
              onClick={copyToClipboard}
              className="p-3 bg-gray-100 border-t border-r border-b border-gray-200 rounded-r-md text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition-colors"
              disabled={copied}
            >
              {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="mt-6">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50">
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate API Key
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Regenerate API Key</DialogTitle>
                <DialogDescription>
                  Are you sure you want to regenerate your API key? This action cannot be undone and your current API
                  key will be invalidated immediately.
                </DialogDescription>
              </DialogHeader>
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-600 mr-3 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-amber-700">
                  Any applications or scripts using your current API key will stop working. Make sure to update them
                  with the new key.
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleRegenerateApiKey}
                  className="bg-orange-600 hover:bg-orange-700"
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

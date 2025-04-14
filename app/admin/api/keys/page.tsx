"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  Copy, 
  Check, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  Trash, 
  Plus, 
  Key,
  Calendar,
  Clock
} from "lucide-react"
import { staggerContainer, fadeIn } from "@/lib/motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// Define the interface for API key objects
interface ApiKey {
  id: string;
  name: string;
  key: string;
  plan: string;
  createdAt: string;
  lastUsed: string | null;
  status: string;
}

// Mock data for API keys
const mockApiKeys: ApiKey[] = [
  {
    id: "api_key_1",
    name: "Production Key",
    key: "pk_live_51LkG7n2eZvKYlo2Czxbo2M1veGBRxibVNxCYVDblp",
    plan: "enterprise",
    createdAt: "2024-04-15T10:30:00Z",
    lastUsed: "2024-05-22T14:25:00Z",
    status: "active"
  },
  {
    id: "api_key_2",
    name: "Development Key",
    key: "pk_test_51LkG7n2eZvKYlo2C8b5j3K1lmYUAB5FGh9YiMAJd6",
    plan: "pro",
    createdAt: "2024-04-20T08:15:00Z",
    lastUsed: "2024-05-21T11:45:00Z",
    status: "active"
  },
  {
    id: "api_key_3",
    name: "Testing Key",
    key: "pk_test_51LmN8k3fZvLYlo2C8b5j3K1lmYUAB5FGh9YiPOFg7",
    plan: "basic",
    createdAt: "2024-05-01T09:20:00Z",
    lastUsed: "2024-05-15T16:30:00Z",
    status: "revoked"
  }
]

export default function ApiKeysManagementPage() {
  const [apiKeys, setApiKeys] = useState(mockApiKeys)
  const [showKey, setShowKey] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<Record<string, boolean>>({})
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isRevokeDialogOpen, setIsRevokeDialogOpen] = useState<Record<string, boolean>>({})
  const [newKeyPlan, setNewKeyPlan] = useState("basic")
  const [newKeyName, setNewKeyName] = useState("")
  const [newlyCreatedKey, setNewlyCreatedKey] = useState<string | null>(null)

  const toggleShowKey = (keyId: string) => {
    setShowKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (keyId: string, keyValue: string) => {
    navigator.clipboard.writeText(keyValue)
    setCopied({ ...copied, [keyId]: true })
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [keyId]: false }))
    }, 2000)
  }

  const openRevokeDialog = (keyId: string) => {
    setIsRevokeDialogOpen(prev => ({ ...prev, [keyId]: true }))
  }

  const closeRevokeDialog = (keyId: string) => {
    setIsRevokeDialogOpen(prev => ({ ...prev, [keyId]: false }))
  }

  const handleRevokeKey = (keyId: string) => {
    // Update the status of the key to revoked
    setApiKeys(
      apiKeys.map(key => 
        key.id === keyId 
          ? { ...key, status: "revoked" } 
          : key
      )
    )
    closeRevokeDialog(keyId)
  }

  const handleCreateKey = () => {
    // Generate a new random API key
    const newKeyValue = `pk_${Math.random().toString(36).substring(2, 10)}_${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
    
    // Create a new key object
    const newKey = {
      id: `api_key_${apiKeys.length + 1}`,
      name: newKeyName || `API Key ${apiKeys.length + 1}`,
      key: newKeyValue,
      plan: newKeyPlan,
      createdAt: new Date().toISOString(),
      lastUsed: null,
      status: "active"
    }
    
    // Add the new key to the list
    setApiKeys([...apiKeys, newKey])
    
    // Show the newly created key
    setNewlyCreatedKey(newKeyValue)
    
    // Close the create dialog
    setIsCreateDialogOpen(false)
    
    // Reset form values
    setNewKeyName("")
    setNewKeyPlan("basic")
  }

  const formatDate = (dateString: string | null) => {
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

  // Mask an API key, showing only first 4 and last 4 characters
  const maskApiKey = (key: string, shouldShow: boolean) => {
    return shouldShow
      ? key
      : `${key.substring(0, 8)}${"•".repeat(24)}${key.substring(key.length - 8)}`
  }

  // Get plan badge color
  const getPlanBadgeClass = (plan: string) => {
    switch (plan) {
      case "enterprise":
        return "bg-purple-950/30 text-purple-500 border-purple-800/30"
      case "pro":
        return "bg-blue-950/30 text-blue-500 border-blue-800/30"
      case "basic":
      default:
        return "bg-green-950/30 text-green-500 border-green-800/30"
    }
  }

  return (
    <div>
      <motion.div 
        className="mb-8 border-l-4 border-red-500 pl-4" 
        initial="hidden" 
        animate="show" 
        variants={staggerContainer(0.1)}
      >
        <motion.h1 className="text-3xl font-bold text-white tracking-tight" variants={fadeIn("up", "tween", 0.1, 0.5)}>
          API Keys Management
        </motion.h1>
        <motion.p className="text-gray-400 mt-1" variants={fadeIn("up", "tween", 0.2, 0.5)}>
          Manage API keys for developers accessing the AI WordPress Plugin API
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex justify-between items-center mb-6"
        initial="hidden"
        animate="show"
        variants={staggerContainer(0.1)}
      >
        <motion.div variants={fadeIn("up", "tween", 0.2, 0.5)}>
          <p className="text-gray-400">
            <span className="font-medium text-white">{apiKeys.filter(k => k.status === "active").length}</span> Active Keys
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn("up", "tween", 0.3, 0.5)}>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800">
                <Plus className="h-4 w-4 mr-2" />
                Create New API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-zinc-900 border border-zinc-800 text-white">
              <DialogHeader>
                <DialogTitle>Create New API Key</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Create a new API key for developer access. You'll only be able to view the key once after creation.
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="text-right text-sm font-medium text-gray-300">
                    Key Name
                  </label>
                  <input
                    id="name"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    placeholder="Production Key"
                    className="col-span-3 bg-zinc-800 border border-zinc-700 rounded-md px-3 py-2 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="plan" className="text-right text-sm font-medium text-gray-300">
                    Plan
                  </label>
                  <Select value={newKeyPlan} onValueChange={setNewKeyPlan}>
                    <SelectTrigger id="plan" className="col-span-3 bg-zinc-800 border-zinc-700 text-white focus:ring-red-500">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                      <SelectItem value="basic">Basic Plan</SelectItem>
                      <SelectItem value="pro">Pro Plan</SelectItem>
                      <SelectItem value="enterprise">Enterprise Plan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" className="border-zinc-700 text-gray-300 hover:bg-zinc-800" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateKey}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                >
                  Create Key
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* New key created dialog */}
          {newlyCreatedKey && (
            <Dialog 
              open={newlyCreatedKey !== null} 
              onOpenChange={(open) => !open && setNewlyCreatedKey(null)}
            >
              <DialogContent className="bg-zinc-900 border border-zinc-800 text-white">
                <DialogHeader>
                  <DialogTitle>API Key Created</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Your new API key has been created. Save this key somewhere safe — you won't be able to see it again.
                  </DialogDescription>
                </DialogHeader>
                
                <div className="my-4">
                  <div className="bg-zinc-950 border border-zinc-800 rounded-md p-3 font-mono text-sm overflow-x-auto text-green-400">
                    {newlyCreatedKey}
                  </div>
                </div>
                
                <div className="bg-amber-950/30 border border-amber-800/30 rounded-md p-4 my-2">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                    <p className="text-sm text-amber-400">
                      This key will only be displayed once. Store it in a secure location.
                    </p>
                  </div>
                </div>
                
                <DialogFooter>
                  <Button 
                    onClick={() => {
                      navigator.clipboard.writeText(newlyCreatedKey)
                      setTimeout(() => setNewlyCreatedKey(null), 500)
                    }}
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy and Close
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden mb-8"
        initial="hidden"
        animate="show"
        variants={fadeIn("up", "tween", 0.3, 0.5)}
      >
        <div className="p-6 border-b border-zinc-800 flex items-center">
          <div className="p-2 bg-red-950/30 rounded-md mr-3">
            <Key className="h-5 w-5 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-white">API Keys</h2>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">API Key</TableHead>
                <TableHead className="text-gray-400">Plan</TableHead>
                <TableHead className="text-gray-400">Created</TableHead>
                <TableHead className="text-gray-400">Last Used</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
                <TableHead className="text-gray-400 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id} className="border-zinc-800 hover:bg-zinc-900/50">
                  <TableCell className="font-medium text-white">{apiKey.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <code className="bg-zinc-900 px-2 py-1 rounded text-xs font-mono text-gray-300 mr-2 flex-1 overflow-hidden">
                        {maskApiKey(apiKey.key, !!showKey[apiKey.id])}
                      </code>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => toggleShowKey(apiKey.id)}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-zinc-800"
                      >
                        {showKey[apiKey.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => copyToClipboard(apiKey.id, apiKey.key)}
                        className="h-8 w-8 text-gray-400 hover:text-white hover:bg-zinc-800"
                        disabled={copied[apiKey.id]}
                      >
                        {copied[apiKey.id] ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getPlanBadgeClass(apiKey.plan)}`}>
                      {apiKey.plan.charAt(0).toUpperCase() + apiKey.plan.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-2 text-gray-500" />
                      {formatDate(apiKey.createdAt)}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-2 text-gray-500" />
                      {formatDate(apiKey.lastUsed)}
                    </div>
                  </TableCell>
                  <TableCell>
                    {apiKey.status === "active" ? (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-green-950/30 text-green-500 border border-green-800/30">
                        Active
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-950/30 text-red-500 border border-red-800/30">
                        Revoked
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {apiKey.status === "active" && (
                      <Dialog 
                        open={!!isRevokeDialogOpen[apiKey.id]} 
                        onOpenChange={(open) => setIsRevokeDialogOpen(prev => ({ ...prev, [apiKey.id]: open }))}
                      >
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                            onClick={() => openRevokeDialog(apiKey.id)}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Revoke
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-zinc-900 border border-zinc-800 text-white">
                          <DialogHeader>
                            <DialogTitle>Revoke API Key</DialogTitle>
                            <DialogDescription className="text-gray-400">
                              Are you sure you want to revoke this API key? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="bg-red-950/30 border border-red-800/30 rounded-md p-4 my-4 flex items-start">
                            <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                            <div className="text-sm text-red-400">
                              Any applications using this API key will immediately lose access to the API.
                            </div>
                          </div>
                          
                          <DialogFooter>
                            <Button 
                              variant="outline" 
                              className="border-zinc-700 text-gray-300 hover:bg-zinc-800"
                              onClick={() => closeRevokeDialog(apiKey.id)}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="destructive"
                              onClick={() => handleRevokeKey(apiKey.id)}
                            >
                              Revoke Key
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      <motion.div
        className="backdrop-blur-sm bg-black/40 border border-zinc-800 rounded-xl shadow-xl overflow-hidden mb-8"
        initial="hidden"
        animate="show"
        variants={fadeIn("up", "tween", 0.4, 0.5)}
      >
        <div className="p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">API Security Best Practices</h2>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-start">
            <div className="bg-amber-950/30 p-2 rounded-md mr-3 mt-0.5">
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-md font-medium text-white">Never Hard-Code API Keys</h3>
              <p className="text-gray-400 text-sm mt-1">
                Never include API keys directly in your code. Use environment variables or secure vaults instead.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-amber-950/30 p-2 rounded-md mr-3 mt-0.5">
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-md font-medium text-white">Rotate Keys Regularly</h3>
              <p className="text-gray-400 text-sm mt-1">
                Periodically refresh your API keys to reduce the risk of compromised keys being used.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-amber-950/30 p-2 rounded-md mr-3 mt-0.5">
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-md font-medium text-white">Restrict Key Access</h3>
              <p className="text-gray-400 text-sm mt-1">
                Use different API keys for different applications and teams to limit exposure if a key is compromised.
              </p>
            </div>
          </div>
          
          <div className="flex items-start">
            <div className="bg-amber-950/30 p-2 rounded-md mr-3 mt-0.5">
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div>
              <h3 className="text-md font-medium text-white">Monitor API Usage</h3>
              <p className="text-gray-400 text-sm mt-1">
                Regularly check the API usage logs to detect any unusual activity that might indicate a compromised key.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 
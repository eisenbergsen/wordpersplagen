"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Loader2, FileText, ShoppingBag, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"

export default function ContentGenerator() {
  const [contentType, setContentType] = useState("product_description")
  const [title, setTitle] = useState("")
  const [keywords, setKeywords] = useState("")
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState("")
  const { generateContent } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim()) {
      return
    }

    setIsGenerating(true)
    setGeneratedContent("")

    try {
      await generateContent(contentType, title)

      // Simulate content generation with a mock response
      const mockResponses: Record<string, string> = {
        product_description: `# ${title}\n\nIntroducing our premium ${title}, designed to elevate your everyday experience. This high-quality product features durable construction and elegant design that seamlessly blends with any style.\n\n## Key Features\n\n- Premium quality materials ensure long-lasting performance\n- Ergonomic design for maximum comfort and usability\n- Versatile functionality for various applications\n- Easy to clean and maintain\n\n## Why Choose Our ${title}?\n\nOur ${title} stands out from competitors with its superior craftsmanship and attention to detail. Each product undergoes rigorous quality testing to ensure it meets our high standards.\n\nPerfect for both personal use and as a thoughtful gift, the ${title} comes in a variety of colors to match your preferences.`,
        blog_post: `# ${title}\n\n## Introduction\n\nIn today's fast-paced digital marketplace, staying ahead of the competition requires innovative strategies and a deep understanding of your audience. This blog post explores effective approaches to ${title} and provides actionable insights for implementation.\n\n## Understanding the Landscape\n\nBefore diving into specific strategies, it's essential to understand the current market landscape. Recent studies show that businesses implementing ${title.toLowerCase()} techniques see an average increase of 27% in customer engagement and a 35% boost in conversion rates.\n\n## Key Strategies\n\n1. **Audience Segmentation**: Divide your audience into specific groups based on behavior, preferences, and demographics.\n\n2. **Personalized Content**: Create tailored content that resonates with each segment of your audience.\n\n3. **Data-Driven Decision Making**: Use analytics to inform your strategy and optimize for better results.\n\n4. **Omnichannel Approach**: Ensure consistency across all customer touchpoints.\n\n## Implementation Tips\n\nWhen implementing these strategies, start small and scale gradually. Test different approaches and measure results to determine what works best for your specific business needs.\n\n## Conclusion\n\nBy focusing on ${title.toLowerCase()}, businesses can significantly improve their market position and build stronger relationships with their customers. The key is consistency, authenticity, and a willingness to adapt based on performance data.`,
        marketing_content: `# ${title} Campaign\n\n## Subject Line: Discover the Amazing Benefits of Our Latest Offering!\n\n---\n\nDear Valued Customer,\n\nWe're excited to introduce our latest promotion: **${title}**!\n\n### Limited Time Offer\n\nFor a limited time only, enjoy exclusive benefits when you participate in our ${title} campaign:\n\n- Special discounts on premium products\n- Early access to new releases\n- Complimentary bonus items with qualifying purchases\n- Extended warranty on select items\n\n### Why This Matters To You\n\nOur ${title} campaign is designed specifically with your needs in mind. We've carefully crafted this promotion to provide maximum value while addressing the common challenges our customers face.\n\n### Take Action Today\n\nDon't miss out on this exceptional opportunity! Click the button below to learn more and take advantage of these special offers before they expire.\n\n[LEARN MORE]\n\nThank you for your continued support. We look forward to serving you!\n\nWarm regards,\nThe Marketing Team`,
      }

      // Simulate typing effect
      const content = mockResponses[contentType] || "Content generated successfully!"
      let index = 0

      const interval = setInterval(() => {
        setGeneratedContent(content.substring(0, index))
        index++

        if (index > content.length) {
          clearInterval(interval)
          setIsGenerating(false)
        }
      }, 10)
    } catch (error) {
      console.error("Error generating content:", error)
      setIsGenerating(false)
    }
  }

  const getContentTypeIcon = () => {
    switch (contentType) {
      case "product_description":
        return <ShoppingBag className="h-5 w-5" />
      case "blog_post":
        return <FileText className="h-5 w-5" />
      case "marketing_content":
        return <Mail className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.3, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Generate AI Content</h3>
      </div>
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <Select value={contentType} onValueChange={setContentType} disabled={isGenerating}>
                <SelectTrigger id="content-type" className="mt-1">
                  <SelectValue placeholder="Select content type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="product_description">Product Description</SelectItem>
                  <SelectItem value="blog_post">Blog Post</SelectItem>
                  <SelectItem value="marketing_content">Marketing Content</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="title">Title / Product Name</Label>
              <Input
                id="title"
                placeholder="Enter a title or product name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isGenerating}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="keywords">Keywords (optional)</Label>
              <Input
                id="keywords"
                placeholder="Enter keywords separated by commas"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                disabled={isGenerating}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone} disabled={isGenerating}>
                <SelectTrigger id="tone" className="mt-1">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              disabled={isGenerating || !title.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                </>
              ) : (
                <>
                  {getContentTypeIcon()}
                  <span className="ml-2">Generate Content</span>
                </>
              )}
            </Button>
          </div>
        </form>

        {(isGenerating || generatedContent) && (
          <div className="mt-6">
            <Label>Generated Content</Label>
            <div className="mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200 min-h-[200px] max-h-[400px] overflow-y-auto">
              {isGenerating && !generatedContent && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 text-orange-500 animate-spin" />
                </div>
              )}
              <div className="whitespace-pre-line font-mono text-sm">{generatedContent}</div>
            </div>
            {generatedContent && !isGenerating && (
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Copy
                </Button>
                <Button variant="outline" size="sm">
                  Download
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                  Save to Library
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

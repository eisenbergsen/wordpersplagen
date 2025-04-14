"use client"

import { motion } from "framer-motion"
import { Download, CheckCircle, AlertCircle, Clock } from "lucide-react"
import type { BillingRecord } from "@/contexts/auth-context"
import { fadeIn } from "@/lib/motion"

interface BillingHistoryProps {
  billingHistory: BillingRecord[]
}

export default function BillingHistory({ billingHistory }: BillingHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "pending":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <CheckCircle className="h-4 w-4 text-green-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Paid"
      case "pending":
        return "Pending"
      case "failed":
        return "Failed"
      default:
        return "Paid"
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "paid":
        return "text-green-600 bg-green-50"
      case "pending":
        return "text-amber-600 bg-amber-50"
      case "failed":
        return "text-red-600 bg-red-50"
      default:
        return "text-green-600 bg-green-50"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <motion.div
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
      variants={fadeIn("up", "tween", 0.2, 0.5)}
    >
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">Billing History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Download
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {billingHistory.map((record) => (
              <tr key={record.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{formatDate(record.date)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.invoice}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{record.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center ${getStatusClass(
                      record.status,
                    )}`}
                  >
                    {getStatusIcon(record.status)}
                    <span className="ml-1">{getStatusText(record.status)}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {record.status === "paid" && (
                    <button className="text-orange-600 hover:text-orange-900">
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {billingHistory.length === 0 ? (
        <div className="p-6 text-center text-gray-500">No billing history available.</div>
      ) : (
        <div className="p-4 border-t border-gray-100 text-center">
          <button className="text-sm font-medium text-orange-600 hover:text-orange-500">View all transactions</button>
        </div>
      )}
    </motion.div>
  )
}

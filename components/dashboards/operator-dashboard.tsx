"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, Clock } from "lucide-react"

interface OperatorDashboardProps {
  onAddAlert: (alert: any) => void
  onAddAudit: (entry: any) => void
}

export function OperatorDashboard({ onAddAlert, onAddAudit }: OperatorDashboardProps) {
  const [shiftLog, setShiftLog] = useState("")
  const [status, setStatus] = useState("running")

  const handleLogEntry = () => {
    if (shiftLog.trim()) {
      onAddAudit({
        action: "Shift Log Entry",
        details: shiftLog,
        category: "operation",
      })
      setShiftLog("")
    }
  }

  const handleIssueReport = () => {
    onAddAlert({
      id: Date.now(),
      type: "issue",
      severity: "high",
      message: "Issue reported by operator",
      details: shiftLog || "Unspecified issue",
      resolved: false,
      createdAt: new Date().toISOString(),
    })
    onAddAudit({
      action: "Issue Reported",
      details: shiftLog || "Unspecified issue",
      category: "incident",
    })
    setShiftLog("")
  }

  return (
    <div className="grid gap-6">
      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Current Shift Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="text-sm text-slate-600">Shift Time</div>
              <div className="text-2xl font-bold text-blue-900">6:00 AM - 2:00 PM</div>
            </div>
            <div className="p-4 rounded-lg bg-green-50 border border-green-200">
              <div className="text-sm text-slate-600">Production Status</div>
              <div className="text-2xl font-bold text-green-900">Running</div>
            </div>
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
              <div className="text-sm text-slate-600">Units Produced</div>
              <div className="text-2xl font-bold text-amber-900">1,245</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Log Entry */}
      <Card>
        <CardHeader>
          <CardTitle>Record Shift Activity</CardTitle>
          <CardDescription>Document events, issues, or status changes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="log-entry">Shift Log Entry</Label>
            <Textarea
              id="log-entry"
              placeholder="Enter shift notes, issues, or status updates..."
              value={shiftLog}
              onChange={(e) => setShiftLog(e.target.value)}
              className="mt-2 min-h-24"
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleLogEntry} className="flex-1 bg-blue-600 hover:bg-blue-700">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Log Entry
            </Button>
            <Button onClick={handleIssueReport} variant="destructive" className="flex-1" disabled={!shiftLog.trim()}>
              <AlertCircle className="w-4 h-4 mr-2" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Production Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Quality Score", value: "98.5%", status: "good" },
              { label: "Machine Uptime", value: "99.2%", status: "good" },
              { label: "Error Rate", value: "0.8%", status: "good" },
              { label: "Avg Cycle Time", value: "2.3 min", status: "good" },
            ].map((metric, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-600">{metric.label}</div>
                <div className="text-lg font-bold mt-1">{metric.value}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, AlertTriangle, Users, Package } from "lucide-react"

interface ManagerDashboardProps {
  alerts: any[]
  auditLog: any[]
}

export function ManagerDashboard({ alerts, auditLog }: ManagerDashboardProps) {
  const chartData = [
    { name: "Mon", produced: 4000, target: 4500 },
    { name: "Tue", produced: 4200, target: 4500 },
    { name: "Wed", produced: 4980, target: 4500 },
    { name: "Thu", produced: 4100, target: 4500 },
    { name: "Fri", produced: 4300, target: 4500 },
  ]

  const resolvedAlerts = alerts.filter((a) => a.resolved).length
  const activeAlerts = alerts.filter((a) => !a.resolved).length

  return (
    <div className="grid gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Package className="w-4 h-4" />
              Total Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">21,580</div>
            <p className="text-xs text-green-600">+5% vs target</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Efficiency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
            <p className="text-xs text-green-600">Target met</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              Active Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{activeAlerts}</div>
            <p className="text-xs text-red-600">{resolvedAlerts} resolved</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Team Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{auditLog.length}</div>
            <p className="text-xs text-slate-600">Log entries this shift</p>
          </CardContent>
        </Card>
      </div>

      {/* Production Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Production vs Target</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="produced" fill="#3b82f6" />
              <Bar dataKey="target" fill="#cbd5e1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* System Health */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">System Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "Equipment Status", value: "Operational", status: "good" },
              { label: "Network", value: "Connected", status: "good" },
              { label: "Database", value: "Synced", status: "good" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-green-600">✓ {item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Compliance Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: "QA Records", value: "100%", status: "good" },
              { label: "Safety Audits", value: "100%", status: "good" },
              { label: "Documentation", value: "100%", status: "good" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-medium text-green-600">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

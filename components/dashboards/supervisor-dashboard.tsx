"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Users, TrendingUp } from "lucide-react"

interface SupervisorDashboardProps {
  alerts: any[]
  onAddAudit: (entry: any) => void
}

export function SupervisorDashboard({ alerts, onAddAudit }: SupervisorDashboardProps) {
  const activeAlerts = alerts.filter((a) => !a.resolved)

  return (
    <div className="grid gap-6">
      {/* Overview */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="w-4 h-4" />
              Active Operators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-slate-600">All shifts covered</p>
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
            <div className="text-2xl font-bold text-red-600">{activeAlerts.length}</div>
            <p className="text-xs text-slate-600">Requiring attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Production Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-slate-600">vs. yesterday</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts & Issues</CardTitle>
          <CardDescription>Issues requiring supervisory review</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length > 0 ? (
            <div className="space-y-3">
              {activeAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-red-200 bg-red-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="destructive" className="mb-2">
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <p className="font-medium text-slate-900">{alert.message}</p>
                      <p className="text-sm text-slate-600 mt-1">{alert.details}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">No active issues</p>
          )}
        </CardContent>
      </Card>

      {/* Shift Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Shift Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { label: "Units Produced", value: "4,980" },
              { label: "Quality Pass Rate", value: "98.7%" },
              { label: "Downtime", value: "12 minutes" },
              { label: "Safety Incidents", value: "0" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between p-2 border-b border-slate-200">
                <span className="text-slate-600">{item.label}</span>
                <span className="font-semibold">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle2 } from "lucide-react"

interface AlertsPanelProps {
  alerts: any[]
  setAlerts: (alerts: any[]) => void
}

export function AlertsPanel({ alerts, setAlerts }: AlertsPanelProps) {
  const toggleResolve = (id: number) => {
    const updated = alerts.map((a) => (a.id === id ? { ...a, resolved: !a.resolved } : a))
    setAlerts(updated)
    localStorage.setItem("alerts", JSON.stringify(updated))
  }

  const deleteAlert = (id: number) => {
    const updated = alerts.filter((a) => a.id !== id)
    setAlerts(updated)
    localStorage.setItem("alerts", JSON.stringify(updated))
  }

  const activeAlerts = alerts.filter((a) => !a.resolved)
  const resolvedAlerts = alerts.filter((a) => a.resolved)

  return (
    <div className="space-y-6">
      {/* Active Alerts */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Active Alerts ({activeAlerts.length})
          </CardTitle>
          <CardDescription>Alerts requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlerts.length > 0 ? (
            <div className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border-2 border-red-200 bg-red-50">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="destructive" className="mb-2">
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-slate-600">{new Date(alert.createdAt).toLocaleTimeString()}</span>
                  </div>
                  <p className="font-medium text-slate-900 mb-2">{alert.message}</p>
                  <p className="text-sm text-slate-700 mb-3">{alert.details}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => toggleResolve(alert.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="w-3 h-3 mr-1" />
                      Resolve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600 text-center py-8">No active alerts</p>
          )}
        </CardContent>
      </Card>

      {/* Resolved Alerts */}
      {resolvedAlerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resolved Alerts ({resolvedAlerts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {resolvedAlerts.slice(0, 5).map((alert) => (
                <div key={alert.id} className="p-3 rounded-lg border border-green-200 bg-green-50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-700">{alert.message}</span>
                    <Button size="sm" variant="ghost" onClick={() => deleteAlert(alert.id)}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

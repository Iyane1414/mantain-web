"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut, Bell, BarChart3 } from "lucide-react"
import { OperatorDashboard } from "./dashboards/operator-dashboard"
import { SupervisorDashboard } from "./dashboards/supervisor-dashboard"
import { QADashboard } from "./dashboards/qa-dashboard"
import { ManagerDashboard } from "./dashboards/manager-dashboard"
import { WorkforceAnalytics } from "./dashboards/workforce-analytics"
import { AlertsPanel } from "./panels/alerts-panel"
import { AuditLog } from "./panels/audit-log"

interface DashboardProps {
  user: { role: string; name: string }
  onLogout: () => void
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [alerts, setAlerts] = useState<any[]>([])
  const [auditLog, setAuditLog] = useState<any[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("alerts")
    if (saved) setAlerts(JSON.parse(saved))

    const savedAudit = localStorage.getItem("auditLog")
    if (savedAudit) setAuditLog(JSON.parse(savedAudit))
  }, [])

  const addAlert = (alert: any) => {
    const updated = [alert, ...alerts]
    setAlerts(updated)
    localStorage.setItem("alerts", JSON.stringify(updated))
  }

  const addAuditLog = (entry: any) => {
    const updated = [
      {
        ...entry,
        timestamp: new Date().toISOString(),
        user: user.name,
      },
      ...auditLog,
    ]
    setAuditLog(updated)
    localStorage.setItem("auditLog", JSON.stringify(updated))
  }

  const getRoleComponent = () => {
    switch (user.role) {
      case "operator":
        return <OperatorDashboard onAddAlert={addAlert} onAddAudit={addAuditLog} />
      case "supervisor":
        return <SupervisorDashboard alerts={alerts} onAddAudit={addAuditLog} />
      case "qa":
        return <QADashboard onAddAudit={addAuditLog} />
      case "manager":
        return <ManagerDashboard alerts={alerts} auditLog={auditLog} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-bold">MantAIn</span>
            <span className="text-sm opacity-75">|</span>
            <span className="text-sm opacity-75">
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)} • {user.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Bell className="w-4 h-4" />
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-xs font-semibold">
                {alerts.length}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-card border border-border">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="workforce" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Workforce
            </TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="audit">Audit Log</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            {getRoleComponent()}
          </TabsContent>

          <TabsContent value="workforce" className="mt-6">
            <WorkforceAnalytics />
          </TabsContent>

          <TabsContent value="alerts" className="mt-6">
            <AlertsPanel alerts={alerts} setAlerts={setAlerts} />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditLog entries={auditLog} />
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <div className="bg-card rounded-lg border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Production Reports</h2>
              <p className="text-muted-foreground">Reports and analytics will appear here</p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface AuditLogProps {
  entries: any[]
}

export function AuditLog({ entries }: AuditLogProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "operation":
        return "bg-blue-100 text-blue-800"
      case "incident":
        return "bg-red-100 text-red-800"
      case "qa":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Audit Log</CardTitle>
        <CardDescription>Complete record of all system actions and changes</CardDescription>
      </CardHeader>
      <CardContent>
        {entries.length > 0 ? (
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {entries.map((entry, i) => (
              <div key={i} className="border-l-4 border-slate-300 pl-4 py-2 hover:bg-slate-50 rounded">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-slate-900">{entry.action}</p>
                    <p className="text-sm text-slate-600 mt-1">{entry.details}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge className={getCategoryColor(entry.category)}>{entry.category}</Badge>
                      <span className="text-xs text-slate-500">by {entry.user}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                    {new Date(entry.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-600 text-center py-8">No audit entries yet</p>
        )}
      </CardContent>
    </Card>
  )
}

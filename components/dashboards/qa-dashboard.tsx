"use client"

import { Badge } from "@/components/ui/badge"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { CheckCircle2, XCircle } from "lucide-react"

interface QADashboardProps {
  onAddAudit: (entry: any) => void
}

export function QADashboard({ onAddAudit }: QADashboardProps) {
  const [testResults, setTestResults] = useState<any[]>([])
  const [selectedResult, setSelectedResult] = useState("pass")

  const handleAddResult = () => {
    const result = {
      id: Date.now(),
      status: selectedResult,
      timestamp: new Date().toISOString(),
      batchId: `BATCH-${Math.floor(Math.random() * 10000)}`,
    }
    setTestResults([result, ...testResults])
    onAddAudit({
      action: "QA Test Result",
      details: `Test result recorded: ${selectedResult}`,
      category: "qa",
    })
  }

  const passCount = testResults.filter((r) => r.status === "pass").length
  const failCount = testResults.filter((r) => r.status === "fail").length
  const passRate = testResults.length > 0 ? ((passCount / testResults.length) * 100).toFixed(1) : 0

  return (
    <div className="grid gap-6">
      {/* QA Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testResults.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{passRate}%</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Failed Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{failCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Record Test Result */}
      <Card>
        <CardHeader>
          <CardTitle>Record Test Result</CardTitle>
          <CardDescription>Log quality control test results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button
              onClick={() => setSelectedResult("pass")}
              className={`flex-1 ${selectedResult === "pass" ? "bg-green-600 hover:bg-green-700" : "bg-slate-300"}`}
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Pass
            </Button>
            <Button
              onClick={() => setSelectedResult("fail")}
              className={`flex-1 ${selectedResult === "fail" ? "bg-red-600 hover:bg-red-700" : "bg-slate-300"}`}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Fail
            </Button>
          </div>
          <Button onClick={handleAddResult} className="w-full bg-blue-600 hover:bg-blue-700">
            Record Result
          </Button>
        </CardContent>
      </Card>

      {/* Recent Results */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          {testResults.length > 0 ? (
            <div className="space-y-2">
              {testResults.slice(0, 10).map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{result.batchId}</p>
                    <p className="text-sm text-slate-600">{new Date(result.timestamp).toLocaleTimeString()}</p>
                  </div>
                  <Badge
                    className={result.status === "pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {result.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-600">No test results recorded yet</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

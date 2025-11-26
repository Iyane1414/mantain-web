"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { AlertCircle, TrendingUp, Users, Zap } from "lucide-react"

interface WorkforceData {
  department: string
  manMachineRatio: string
  idealRatio: string
  staffing: "overstaffed" | "balanced" | "understaffed"
  riskLevel: "low" | "medium" | "high"
  projectedAttrition: number
  suggestedAction: string
}

const workforceData: WorkforceData[] = [
  {
    department: "Production Dept",
    manMachineRatio: "1:3",
    idealRatio: "1:2",
    staffing: "understaffed",
    riskLevel: "high",
    projectedAttrition: 15,
    suggestedAction: "Urgent hiring required",
  },
  {
    department: "Quality Control",
    manMachineRatio: "1:1.5",
    idealRatio: "1:1.5",
    staffing: "balanced",
    riskLevel: "low",
    projectedAttrition: 5,
    suggestedAction: "No immediate action",
  },
  {
    department: "Admin Dept",
    manMachineRatio: "1:0.8",
    idealRatio: "1:1",
    staffing: "overstaffed",
    riskLevel: "medium",
    projectedAttrition: 8,
    suggestedAction: "Workforce reshuffling",
  },
  {
    department: "Maintenance",
    manMachineRatio: "1:2.5",
    idealRatio: "1:2",
    staffing: "understaffed",
    riskLevel: "high",
    projectedAttrition: 12,
    suggestedAction: "Hire 2-3 technicians",
  },
]

const attritionTrend = [
  { month: "Jan", rate: 5 },
  { month: "Feb", rate: 6 },
  { month: "Mar", rate: 7 },
  { month: "Apr", rate: 9 },
  { month: "May", rate: 12 },
  { month: "Jun", rate: 14 },
]

const departmentUtilization = [
  { name: "Production", value: 65 },
  { name: "Quality", value: 85 },
  { name: "Admin", value: 110 },
  { name: "Maintenance", value: 70 },
]

const COLORS = ["#e07856", "#f4a460", "#2d3e50", "#ff8c42"]

export function WorkforceAnalytics() {
  const [selectedDept, setSelectedDept] = useState<string | null>(null)

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      case "medium":
        return "bg-orange-100 text-orange-800 border-orange-300"
      case "low":
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStaffingColor = (staffing: string) => {
    switch (staffing) {
      case "understaffed":
        return "text-red-600"
      case "overstaffed":
        return "text-orange-600"
      case "balanced":
        return "text-green-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Workforce Analytics</h1>
        <p className="text-gray-100">
          AI-powered workforce optimization combining operational efficiency, distribution, and HR analytics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white border-l-4 border-l-secondary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Departments at Risk</p>
              <p className="text-3xl font-bold text-primary">2</p>
            </div>
            <AlertCircle className="w-12 h-12 text-secondary" />
          </div>
        </Card>

        <Card className="bg-white border-l-4 border-l-accent p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg Projected Attrition</p>
              <p className="text-3xl font-bold text-primary">9.75%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-accent" />
          </div>
        </Card>

        <Card className="bg-white border-l-4 border-l-primary p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-primary">1,240</p>
            </div>
            <Users className="w-12 h-12 text-primary" />
          </div>
        </Card>
      </div>

      {/* Department Analysis */}
      <Card className="p-6">
        <h2 className="text-xl font-bold mb-4">Department Analysis</h2>
        <div className="space-y-3">
          {workforceData.map((dept) => (
            <div
              key={dept.department}
              className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedDept(dept.department)}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground">{dept.department}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(dept.riskLevel)}`}>
                  {dept.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Man-Machine</p>
                  <p className={`font-semibold ${getStaffingColor(dept.staffing)}`}>{dept.manMachineRatio}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Ideal Ratio</p>
                  <p className="font-semibold">{dept.idealRatio}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className={`font-semibold capitalize ${getStaffingColor(dept.staffing)}`}>{dept.staffing}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Projected Attrition</p>
                  <p className="font-semibold">{dept.projectedAttrition}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Action</p>
                  <p className="font-semibold text-secondary">{dept.suggestedAction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attrition Trend */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Projected Attrition Trend (6 months)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={attritionTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rate" stroke="#e07856" strokeWidth={2} dot={{ fill: "#e07856" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Department Utilization */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Department Utilization (%)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={departmentUtilization}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {departmentUtilization.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Staffing Recommendations */}
      <Card className="p-6 bg-accent/5 border-l-4 border-l-accent">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-5 h-5 text-accent" />
          AI Recommendations
        </h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              <strong>Production Dept:</strong> Hire 2-3 operators immediately. Current 1:3 ratio is critical.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              <strong>Admin Dept:</strong> Optimize by redistributing 2 employees to Production or Maintenance.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              <strong>Maintenance:</strong> Hire 1-2 technicians to reach ideal 1:2 ratio and reduce attrition risk.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent font-bold">•</span>
            <span>
              <strong>Quality Control:</strong> Maintain current staffing—performing optimally with balanced ratio and
              low attrition.
            </span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface LoginFormProps {
  onLogin: (role: string, name: string) => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState("operator")
  const [name, setName] = useState("")

  const roles = [
    { value: "operator", label: "Operator", description: "Line operator" },
    { value: "supervisor", label: "Supervisor", description: "Shift supervisor" },
    { value: "qa", label: "QA Specialist", description: "Quality assurance" },
    { value: "manager", label: "Manager", description: "Production manager" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim()) {
      onLogin(selectedRole, name)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f1419] via-[#1a2332] to-[#0f1419] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Soft glowing shapes for atmosphere */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#e07856]/20 to-transparent rounded-full blur-3xl opacity-40 animate-pulse"></div>
      <div
        className="absolute bottom-32 left-10 w-96 h-96 bg-gradient-to-tr from-[#f4a460]/20 to-transparent rounded-full blur-3xl opacity-30 animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-[#2d3e50]/20 to-transparent rounded-full blur-3xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}
      ></div>

      {/* Main glassmorphism card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl">
          {/* Title and description */}
          <h1 className="text-3xl font-bold text-white text-center mb-2">MantAIn</h1>
          <p className="text-white/60 text-center mb-6">Maintenance & Integrity Dashboard</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-white/90">Select Your Role</Label>
              <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                {roles.map((role) => (
                  <div
                    key={role.value}
                    className={`flex items-center space-x-3 p-4 rounded-xl transition-all cursor-pointer ${
                      selectedRole === role.value
                        ? "bg-gradient-to-r from-[#e07856]/30 to-[#f4a460]/20 border border-[#e07856]/40 shadow-lg shadow-[#e07856]/10"
                        : "bg-white/5 border border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <RadioGroupItem value={role.value} id={role.value} className="text-[#e07856]" />
                    <Label htmlFor={role.value} className="cursor-pointer flex-1">
                      <div className="font-medium text-white">{role.label}</div>
                      <div className="text-xs text-white/60">{role.description}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-white/90">
                Your Name
              </Label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#e07856]/50 focus:border-[#e07856] transition-all backdrop-blur-sm"
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#e07856] to-[#f4a460] hover:from-[#d6695f] hover:to-[#e0925c] text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-[#e07856]/30 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!name.trim()}
            >
              Login
            </Button>
          </form>

          {/* Footer note */}
          <p className="text-xs text-white/50 text-center mt-6">Secure Maintenance & Integrity System</p>
        </div>
      </div>
    </div>
  )
}

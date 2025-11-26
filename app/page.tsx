"use client"

import { useState, useEffect } from "react"
import { Dashboard } from "@/components/dashboard"
import { LoginForm } from "@/components/login-form"

export default function Home() {
  const [currentUser, setCurrentUser] = useState<{ role: string; name: string } | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem("currentUser")
    if (saved) {
      setCurrentUser(JSON.parse(saved))
    }
  }, [])

  const handleLogin = (role: string, name: string) => {
    const user = { role, name }
    setCurrentUser(user)
    localStorage.setItem("currentUser", JSON.stringify(user))
  }

  const handleLogout = () => {
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <Dashboard user={currentUser} onLogout={handleLogout} />
}

"use client"

import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"
import { useRouter } from "next/navigation"
import "./globals.css"

const cookies = new Cookies()

export default function HomePage() {
  const [token, setToken] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const t = cookies.get("token")
    if (!t) {
      router.push("/login") // 🚀 Redirect if no token
    } else {
      setToken(t)
    }
  }, [router])

  const handleLogout = () => {
    cookies.remove("token", { path: "/" })
    setToken(null)
    router.push("/login")
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Your JIRA Clone</h1>

      {token && (
        <div className="home-logged-in">
          <p>You are logged in ✅</p>
          <button onClick={handleLogout} className="home-button logout">Logout</button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"
import { useRouter } from "next/navigation"

import Navbar from "../components/Navbar/page.tsx"
import LeftSidebar from "../components/Leftsidebar/page.tsx"
import RightSidebar from "../components/Rightsidebar/page.tsx"
import Dashboard from "../components/Dashboard/page.tsx"
import Footer from "../components/Footer/page.tsx"

const cookies = new Cookies()

export default function MainPage() {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const token = cookies.get("token")
    if (!token) {
      router.push("/login")
    } else {
      setToken(token)
    }
  }, [router])

  if (!token) {
    return null // or loading spinner
  }

  return (
    <div className="page-container">
      <Navbar />

      <div className="page-body" style={{ display: "flex" }}>
        <LeftSidebar />
        <main style={{ flex: 1 }}>
          <Dashboard />
        </main>
        <RightSidebar />
      </div>

      <Footer className="footer" />
    </div>
  )
}

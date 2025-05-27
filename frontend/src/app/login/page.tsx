"use client"

import { useState } from "react"
import axios from "axios"
import { Cookies } from "react-cookie"
import Link from "next/link"
import { useRouter } from "next/navigation"
import styles from "./login.module.css"

const cookies = new Cookies()

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`
      const response = await axios.post(url, { email, password })

      const { token } = response.data
      cookies.set("token", token, { path: "/" })

      setError("")
      router.push("/") // ✅ Redirect to homepage
    } catch (err: any) {
      console.error("Login error:", err)
      setError(err.response?.data?.message || "Login failed")
    }
  }

  return (
    <div className={styles["login-container"]}>
      <h1 className={styles["login-title"]}>Login</h1>
      <form className={styles["login-form"]} onSubmit={handleLogin}>
        <label htmlFor="email" className={styles["login-label"]}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles["login-input"]}
          placeholder="user@domain.tld"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles["login-label"]}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles["login-input"]}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles["login-button"]}>Login</button>
        {error && <p className={styles["login-error"]}>Error: {error}</p>}
      </form>

      <p className={styles["login-register-text"]}>
        Don't have an account?{" "}
        <Link href="/register" className={styles["login-register-link"]}>Register here</Link>
      </p>
    </div>
  )
}

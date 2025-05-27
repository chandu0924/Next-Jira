"use client"

import { useState } from "react"
import axios from "axios"
import { Cookies } from "react-cookie"
import Link from "next/link"
import styles from "./register.module.css"

const cookies = new Cookies()

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`
      const response = await axios.post(url, { email, password })
      const { token } = response.data
      cookies.set("token", token, { path: "/" })
      setSuccess("Registration successful! You can now log in.")
      setError("")
    } catch (err: any) {
      console.error("Register error:", err)
      setError(err.response?.data?.message || "Registration failed")
      setSuccess("")
    }
  }

  return (
    <div className={styles["register-container"]}>
      <h1 className={styles["register-title"]}>Register</h1>
      <form className={styles["register-form"]} onSubmit={handleRegister}>
        <label htmlFor="email" className={styles["register-label"]}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          className={styles["register-input"]}
          placeholder="user@domain.tld"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password" className={styles["register-label"]}>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          className={styles["register-input"]}
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className={styles["register-button"]}>Register</button>
        {error && <p className={styles["register-error"]}>Error: {error}</p>}
        {success && <p className={styles["register-success"]}>{success}</p>}
      </form>

      <p className={styles["register-login-text"]}>
        Already have an account?{" "}
        <Link href="/Login" className={styles["register-login-link"]}>Login here</Link>
      </p>
    </div>
  )
}

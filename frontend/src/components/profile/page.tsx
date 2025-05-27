"use client"

import { useEffect, useState } from "react"
import { Cookies } from "react-cookie"
import styles from "./profile.module.css"

const cookies = new Cookies()

export default function ProfilePage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    const token = cookies.get("token")
    const storedEmail = cookies.get("email") // Assuming email is stored on login
    if (storedEmail) {
      setEmail(storedEmail)
      const username = storedEmail.split("@")[0]
      setName(username.charAt(0).toUpperCase() + username.slice(1))
    }
  }, [])

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileCard}>
        <div className={styles.avatar}></div>
        <h2 className={styles.name}>{name || "User"}</h2>
        <p className={styles.email}>{email}</p>
      </div>
    </div>
  )
}

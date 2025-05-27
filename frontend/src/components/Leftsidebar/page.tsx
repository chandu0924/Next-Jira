"use client"

import Link from "next/link"
import { useState } from "react"
import styles from "./leftsidebar.module.css"

export default function LeftSidebar() {
  const [backlogOpen, setBacklogOpen] = useState(false)

  return (
    <aside className={styles.sidebar}>
      <nav>
        <ul className={styles.menu}>
          <li>
            <button onClick={() => setBacklogOpen(!backlogOpen)} className={styles.menuButton}>
              Backlog ▾
            </button>
            {backlogOpen && (
              <ul className={styles.submenu}>
                <li><Link href="/backlog/epic">Epic</Link></li>
                <li><Link href="/backlog/user-story">User Story</Link></li>
                <li><Link href="/backlog/task">Task</Link></li>
                <li><Link href="/backlog/bug">Bug</Link></li>
              </ul>
            )}
          </li>
          <li><Link href="/projects">Projects</Link></li>
          <li><Link href="/main/sprints">Sprints</Link></li>
          <li><Link href="/tasks">Current Tasks</Link></li>
          <li><Link href="/resources">Resources</Link></li>
        </ul>
      </nav>
    </aside>
  )
}

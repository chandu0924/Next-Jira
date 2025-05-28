"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import styles from "./project.module.css"

const API_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`

export default function ProjectListPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<any[]>([])

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL)
      setProjects(res.data)
    } catch (err) {
      console.error("Failed to fetch projects:", err)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      fetchProjects()
    } catch (err) {
      console.error("Delete failed:", err)
      alert("Failed to delete project.")
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <div className={styles.projectListContainer}>
      <div className={styles.projectListHeader}>
        <h1 className={styles.projectHeading}>Projects</h1>
        <button onClick={() => router.push("/main/project/create")} className={styles.createButton}>
          ➕ Create Project
        </button>
      </div>

      <div className={styles.projectList}>
        {projects.map((proj) => (
            <div key={proj._id} className={styles.projectCard}>
            <h3 className={styles.projectTitle}>{proj.title}</h3>
            <p className={styles.projectDescription}>{proj.description}</p>
            <div className={styles.projectMeta}>
                <p><strong>Status:</strong> {proj.status}</p>
                <p><strong>Priority:</strong> {proj.priority}</p>
                <p><strong>Assignee:</strong> {proj.assignee}</p>
                <p><strong>Assigned By:</strong> {proj.assignedBy}</p>
                <p><strong>Tags:</strong> {proj.tags.join(", ")}</p>
            </div>
            <div className={styles.projectActions}>
                <button onClick={() => router.push(`/main/project/edit/${proj._id}`)} className={styles.projectEditButton}>
                ✏️ Edit
                </button>
                <button onClick={() => handleDelete(proj._id)} className={styles.projectDeleteButton}>
                🗑️ Delete
                </button>
            </div>
            </div>
        ))}
        </div>

    </div>
  )
}

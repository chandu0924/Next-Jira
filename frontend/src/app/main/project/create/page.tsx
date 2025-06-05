"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import styles from "../project.module.css";

export default function CreateProjectPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get("id");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completionDate: "",
    assignedDays: "",
    assignee: "",
    assignedBy: "",
    priority: "Medium",
    status: "Not Started",
    tags: "",
  });

  // ✅ Fetch data when editing
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`
        );
        const proj = res.data;

        setFormData({
          title: proj.title || "",
          description: proj.description || "",
          completionDate: proj.completionDate
            ? proj.completionDate.slice(0, 10)
            : "",
          assignedDays: proj.assignedDays || "",
          assignee: proj.assignee || "",
          assignedBy: proj.assignedBy || "",
          priority: proj.priority || "Medium",
          status: proj.status || "Not Started",
          tags: (proj.tags || []).join(", "),
        });
      } catch (err) {
        console.error("Failed to load project:", err);
      }
    };

    if (projectId) {
      fetchProject();
    }
  }, [projectId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const project = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (projectId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`,
          project
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects`,
          project
        );
      }

      router.push("/main/project");
    } catch (err) {
      console.error("Failed to save project:", err);
      alert("Failed to save project.");
    }
  };

  return (
    <div className={styles.projectFormSection}>
      <h1 className={styles.projectHeading}>
        {projectId ? "Edit Project" : "Create New Project"}
      </h1>
      <form onSubmit={handleSubmit} className={styles.projectForm}>
        <input
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className={styles.projectInput}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className={styles.projectTextarea}
          required
        />
        <input
          type="date"
          name="completionDate"
          value={formData.completionDate}
          onChange={handleChange}
          className={styles.projectInput}
        />
        <input
          type="number"
          name="assignedDays"
          placeholder="Days Assigned"
          value={formData.assignedDays}
          onChange={handleChange}
          className={styles.projectInput}
        />
        <input
          name="assignee"
          placeholder="Assignee Name"
          value={formData.assignee}
          onChange={handleChange}
          className={styles.projectInput}
          required
        />
        <input
          name="assignedBy"
          placeholder="Assigned By"
          value={formData.assignedBy}
          onChange={handleChange}
          className={styles.projectInput}
        />
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={styles.projectSelect}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </select>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={styles.projectSelect}
        >
          {/* <option>Not Started</option> */}
          <option>ToDo</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
        <input
          name="tags"
          placeholder="Tags (comma-separated)"
          value={formData.tags}
          onChange={handleChange}
          className={styles.projectInput}
        />
        <button type="submit" className={styles.projectButton}>
          {projectId ? "Save Project" : "Create Project"}
        </button>
      </form>
    </div>
  );
}

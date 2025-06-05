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
    assignedDays: 0,
    assignee: "",
    assignedBy: "",
    priority: "",
    status: "",
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
          assignedDays: proj.assignedDays || 0,
          assignee: proj.assignee || "",
          assignedBy: proj.assignedBy || "",
          priority: proj.priority || "Low",
          status: proj.status || "ToDo",
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

    // const project = {
    //   ...formData,
    //   tags: formData.tags.split(",").map((tag) => tag.trim()),
    // };
    const project = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (projectId) {
        console.log("project exist");

        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/projects/${projectId}`,
          project
        );
      } else {
        console.log("project new");
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
          required
        >
          <option value="" disabled>Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={styles.projectSelect}
          required
        >
          <option value="" disabled>Select status</option>
          <option value="ToDo">ToDo</option>
          <option value="InProgress">InProgress</option>
          <option value="Completed">Completed</option>
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

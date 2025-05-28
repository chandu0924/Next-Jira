const express = require("express")
const router = express.Router()
const Project = require("../models/Project")

// Create project
router.post("/", async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json(project)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find()
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get single project
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ error: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update project
router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Delete project
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id)
    res.json({ message: "Project deleted" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

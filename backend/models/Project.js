const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  completionDate: {
    type: Date,
  },

  assignedDays: {
    type: Number, // How many days were allocated
  },

  assignee: {
    type: String, // Name or userId of the person assigned
    required: true,
  },

  assignedBy: {
    type: String, // Who assigned the project (name or userId)
  },

  status: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "On Hold"],
    default: "Not Started",
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Critical"],
    default: "Medium",
  },

  tags: [String], // For categorization or labels (e.g., ['frontend', 'urgent'])

  members: [
    {
      name: String, // team members involved (optional)
      role: String,
    },
  ],
})

module.exports = mongoose.model("Project", projectSchema)

const express = require("express");
const authRoutes = require("./auth");
const projectRoutes = require("./project");

const router = express.Router();

router.use("/api", authRoutes);           // /api/login, /api/register, etc.
router.use("/api/projects", projectRoutes); // /api/projects/*

router.post("/api/test", (req, res) => {
  console.log("🎯 /api/test hit!");
  res.json({ message: "Test route worked!" });
});

module.exports = (app) => {
  app.use(router);
};

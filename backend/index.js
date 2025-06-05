const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require("./router/index");

dotenv.config();

const app = express();

// Middleware
// const corsOptions = {
//   origin: "http://localhost:3000", // frontend origin
//   credentials: true,               // allow cookies if needed
// };
const corsOptions = {
  // origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use(express.json());
// app.use(cors());
// app.enable("trust proxy");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Attach router
router(app); // << this is CRUCIAL

// Catch-all fallback to confirm server is running
app.use((req, res) => {
  res.status(404).send("❌ Route not found");
});

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use. Please use a different port.`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
});

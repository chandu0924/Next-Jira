const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const router = require('./router');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.enable('trust proxy');

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB error: ", err));

// Sample Route
app.get("/", (req, res) => {
  res.send("Backend is running");
});


router(app);
// Load your routes
// app.use("/api/users", require("./routes/userRoutes"));
// app.use("/api/projects", require("./routes/projectRoutes"));

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const moodRoutes = require("./routes/moodRoutes"); // Import routes
const authRoutes = require("./routes/authRoutes");
const affirmationRoutes = require("./routes/affirmationRoutes");
const cors = require("cors");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);  // 🔹 Protected Route
app.use("/api/affirmations", affirmationRoutes);  // 🔹 Protected Route

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use("/api/moods", require("./routes/moodRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Swastha API" });
});

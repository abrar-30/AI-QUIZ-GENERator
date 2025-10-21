import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

dotenv.config({ path: './.env' });

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());

// Only parse JSON for routes that expect a body (POST/PUT)


// Routes
app.use("/auth",express.json(), authRoutes);
app.use("/quiz", quizRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Quizzer Backend is running 🚀" });
});

// Global 404 handler for invalid routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({ message: "Server error" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

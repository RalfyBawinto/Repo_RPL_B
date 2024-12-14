import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import db from "./config/database.js";
import authRoutes from "./routers/authRoute.js";

const app = express();
const port = 3500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Test database connection
(async () => {
  try {
    await db.sync(); // Sinkronisasi model dengan database
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
})();

// Routes
app.use("/api/auth", authRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

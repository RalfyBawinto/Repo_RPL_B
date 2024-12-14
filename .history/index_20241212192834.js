import express from "express";
import { connectDatabase } from "./config/database.js";
import {
  bodyParserMiddleware,
  corsMiddleware,
} from "./middleware/authMiddleware.js";
import authRoutes from "./routers/authRoute.js";

const app = express();
const port = 3500;

app.use(bodyParserMiddleware);
app.use(corsMiddleware);

// Test database connection dan sinkronisasi
connectDatabase(); // Panggil fungsi koneksi database

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

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import authRoute from "./routers/authRoute.js"; // Pastikan import sesuai dengan nama file dan path
import userRoute from "./routes/userRoute.js";

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

app.use("/api/user", userRoute);

// Test database connection dan sinkronisasi
connectDatabase(); // Panggil fungsi koneksi database

// Menggunakan rute auth
app.use("/api", authRoute); // Memastikan rute sudah sesuai dengan path yang ditentukan

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import db from "./config/Database.js";
import userRoute from "./routers/userRoute.js";

const app = express();

try {
  // Memastikan koneksi ke database berhasil
  await db.authenticate();
  console.log("Database connection successful");
} catch (error) {
  console.error(error);
}

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Menggunakan routing untuk '/users' dari userRoute.js
app.use("/api", userRoute);

// Menjalankan server pada port 3001
app.listen(3500, () => console.log("Server is running on port 3500"));

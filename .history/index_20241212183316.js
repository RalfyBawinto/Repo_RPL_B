import express from "express";
import db from "./config/Database.js";
import userRoute from "./routers/userRoute.js";
import Users from "./models/UserModel.js"; // Pastikan impor model

const app = express();

try {
  // Memastikan koneksi ke database berhasil
  await db.authenticate();
  console.log("Database connection successful");

  // Sinkronisasi model dengan database
  await db.sync(); // Gunakan force: true jika ingin tabel diperbarui saat sudah ada
  console.log("Database synchronized");
} catch (error) {
  console.error(error);
}

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Menggunakan routing untuk '/users' dari userRoute.js
app.use("/api", userRoute);

// Menjalankan server pada port 3001
app.listen(3001, () => console.log("Server is running on port 3001"));

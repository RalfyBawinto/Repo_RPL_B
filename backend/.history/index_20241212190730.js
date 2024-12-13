import express from "express";
import db from "./config/Database.js";
import authRoute from "./routers/authRoute.js";

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
app.use("/api", authRoute);

const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

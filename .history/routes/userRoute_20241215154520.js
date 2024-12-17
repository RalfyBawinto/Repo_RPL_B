import express from "express";
import { getUserData } from "../controllers/authController.js";

const router = express.Router();

// Endpoint untuk mengambil data pengguna tanpa autentikasi token
router.get("/", (req, res) => {
  res.send("Daftar semua pengguna");
});

// Endpoint untuk mendapatkan data pengguna tanpa autentikasi
router.get("/user/profile", getUserData);

export default router;

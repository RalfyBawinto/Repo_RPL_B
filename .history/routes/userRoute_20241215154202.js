import express from "express";
import { getUserData } from "../controllers/authController.js";

const router = express.Router();

// Endpoint untuk mendapatkan daftar semua pengguna
router.get("/", (req, res) => {
  res.send("Daftar semua pengguna");
});

// Endpoint untuk profil pengguna
router.get("/profile", getUserData);

export default router;

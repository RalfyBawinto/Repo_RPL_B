import express from "express";
import {
  signup,
  login,
  getUsers,
  getUserData,
} from "../controllers/authController.js";

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/signup", signup);

// Rute untuk login
router.post("/login", login);

// Rute untuk mendapatkan semua user (tanpa autentikasi)
router.get("/users", getUsers);

// Rute untuk mengambil data pengguna tanpa autentikasi token
router.get("/auth/user", getUserData);

export default router;

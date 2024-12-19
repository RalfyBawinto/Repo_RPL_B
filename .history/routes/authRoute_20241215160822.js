import express from "express";
import {
  signup,
  login,
  getAllUsers,
  getUserData,
} from "../controllers/authController.js";

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/signup", signup);

// Rute untuk login
router.post("/login", login);

// Rute untuk mendapatkan semua user (tanpa autentikasi)
router.get("/users", getAllUsers);

// Rute untuk mengambil data pengguna tanpa autentikasi token
router.get("/user/profile", getUserData);

export default router;

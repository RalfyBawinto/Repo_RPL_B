import express from "express";
import {
  signup,
  login,
  getUsers,
  getUserData,
} from "../controllers/authController.js";
import verifyTokenDas from "../middlewares/verifyTokenDas.js";

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/auth/signup", signup);

// Rute untuk login
router.post("/auth/login", login);

// Rute untuk mendapatkan semua user (tanpa autentikasi)
router.get("/users", getUsers); // Memanggil fungsi getUsers dari controller

// Rute untuk mengambil data pengguna dengan autentikasi
router.get("/auth/user", verifyTokenDas, getUserData);

export default router;

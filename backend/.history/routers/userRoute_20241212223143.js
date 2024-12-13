import express from "express";
import { getUserData } from "../controllers/authController.js";
import verifyTokenDas from "../middlewares/verifyTokenDas.js"; // Pastikan path dan nama file sesuai

const router = express.Router();

// Endpoint untuk mengambil data pengguna tanpa autentikasi (hati-hati, biasanya butuh autentikasi)
router.get("/profile", getUserData);

// Endpoint untuk mendapatkan data pengguna dengan autentikasi menggunakan verifyTokenDas
router.get("/user/profile", verifyTokenDas, getUserData);

export default router;

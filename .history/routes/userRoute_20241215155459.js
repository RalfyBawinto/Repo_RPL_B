import express from "express";
import { getAllUsers } from "../controllers/authController.js";

const router = express.Router();

// Endpoint untuk mendapatkan semua pengguna
router.get("/", getAllUsers);

// Endpoint untuk mendapatkan data pengguna tanpa autentikasi
router.get("/user/profile", getUserData);

export default router;

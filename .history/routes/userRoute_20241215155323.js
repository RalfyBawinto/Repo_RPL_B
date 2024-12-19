import express from "express";
import { getAllUsers } from "../controllers/userController.js";

const router = express.Router();

// Endpoint untuk mengambil data pengguna tanpa autentikasi token
router.get("/", getAllUsers);

// Endpoint untuk mendapatkan data pengguna tanpa autentikasi
router.get("/user/profile", getUserData);

export default router;

import express from "express";

const router = express.Router();

// Endpoint untuk mengambil data pengguna tanpa autentikasi token
router.get("/profile", getUserData);

// Endpoint untuk mendapatkan data pengguna tanpa autentikasi
router.get("/user/profile", getUserData);

export default router;

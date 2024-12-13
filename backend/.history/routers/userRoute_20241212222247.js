import express from "express";
import { getUserData } from "../controllers/authController.js";
import verifyToken from "./middlewares/verifyTokenDas.js";

const router = express.Router();

// Endpoint untuk mengambil data pengguna
router.get("/profile", getUserData);

// Endpoint untuk mendapatkan data pengguna, agar name bisa tampil pada dashboard
router.get("/user/profile", verifyToken, getUserData);

export default router;

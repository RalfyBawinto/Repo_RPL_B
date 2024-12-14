import express from "express";
import { getUserData } from "../controllers/authController.js";

const router = express.Router();

// Endpoint untuk mengambil data pengguna
router.get("/profile", getUserData);

export default router;

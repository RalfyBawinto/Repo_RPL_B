import express from "express";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Endpoint untuk mendapatkan profil
router.get("/api/profile", protect, getProfile);

// Endpoint untuk memperbarui profil
router.post("/api/profile/update", protect, updateProfile);

export default router;

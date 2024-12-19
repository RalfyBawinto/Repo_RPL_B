import express from "express";
import { getProfileData, updateProfileData } from "../controllers/profile.js";

const router = express.Router();

// Endpoint untuk mengambil data profil
router.get("/profile/:userId", getProfileData);

// Endpoint untuk memperbarui data profil
router.put("/profile/:userId", updateProfileData);

export default router;

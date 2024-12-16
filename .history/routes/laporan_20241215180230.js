import express from "express";
import { createLaporan } from "../controllers/laporanController.js";
import { uploadImage } from "../utils/uploadImage.js"; // Impor fungsi upload gambar

const router = express.Router();

// Endpoint untuk membuat laporan kerusakan
router.post("/", uploadImage, createLaporan);

export default router;

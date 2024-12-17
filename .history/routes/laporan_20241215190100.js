import express from "express";
import { createLaporan } from "../controllers/laporanController.js"; // Impor controller
import { upload } from "../utils/uploadImage.js"; // Mengimpor instance upload dari multer

const router = express.Router();

// Endpoint untuk mengirim laporan kerusakan dengan upload gambar
router.post("/laporan", upload.single("gambar"), createLaporan);

export default router;

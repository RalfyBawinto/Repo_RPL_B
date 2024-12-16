import express from "express";
import { createLaporan } from "./controllers/laporanController.js";
import { uploadImage } from "./utils/uploadImage.js";

const router = express.Router();

// Endpoint untuk mengirim laporan kerusakan
router.post("/laporan", uploadImage, createLaporan);

export default router;

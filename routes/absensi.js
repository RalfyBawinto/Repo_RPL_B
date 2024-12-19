import express from "express";
import {
  generateQRCode,
  getAttendance,
  addAttendance,
} from "../controllers/absensiController.js";

const router = express.Router();

// Route untuk generate QR Code
router.get("/generate-qr", generateQRCode);

// Route untuk mendapatkan riwayat absensi
router.get("/attendance", getAttendance);

// Route untuk menambahkan absensi baru
router.post("/attendance", addAttendance);

export default router;

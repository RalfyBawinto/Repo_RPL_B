import express from "express";
import { createLaporan } from "../controllers/laporanController.js"; // Impor controller
import { upload } from "../utils/uploadImage.js"; // Mengimpor instance upload dari multer

const router = express.Router();

// Endpoint untuk mengirim laporan kerusakan dengan upload gambar
router.post(
  "/",
  (req, res, next) => {
    console.log("Middleware laporanRoute berhasil diakses");
    next();
  },
  upload.single("gambar"),
  createLaporan
);

// Endpoint untuk mendapatkan informasi dasar jika diakses dengan metode GET
router.get("/", (req, res) => {
  res.status(200).json({ message: "Endpoint laporan tersedia" });
});

export default router;

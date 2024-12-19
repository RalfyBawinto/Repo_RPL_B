import express from "express";
import { createLaporan } from "../controllers/laporanController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/laporan", upload.single("foto"), createLaporan);

export default router;

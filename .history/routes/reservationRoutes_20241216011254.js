import express from "express";
import {
  getAvailableRooms,
  createReservation,
  getReservationsByDate,
} from "../controllers/reservationController.js";

const router = express.Router();

// GET: Mendapatkan daftar ruangan yang tersedia pada tanggal tertentu
router.get("/available", getAvailableRooms);

// POST: Membuat reservasi baru
router.post("/create", createReservation);

// GET: Mendapatkan semua reservasi pada tanggal tertentu
router.get("/:date", getReservationsByDate);

export default router;

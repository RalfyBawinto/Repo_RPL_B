import express from "express";
import Reservation from "../models/ReservationModel.js";
import { checkRoomAvailability } from "../middleware/reservationMiddleware.js";

const router = express.Router();

// Tambah reservasi
router.post("/add", checkRoomAvailability, async (req, res) => {
  const { date, startTime, endTime, room } = req.body;

  try {
    await Reservation.create({ date, startTime, endTime, room });
    res.status(201).json({ message: "Reservasi berhasil dibuat!" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Gagal membuat reservasi." });
  }
});

// Ambil semua reservasi
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.findAll();
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ message: "Gagal mengambil data reservasi." });
  }
});

export default router;

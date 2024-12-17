import express from "express";
import Reservation from "../models/ReservationModel.js";
import { checkRoomAvailability } from "../middleware/reservationMiddleware.js";

const router = express.Router();

// Tambah reservasi
router.post("/add", checkRoomAvailability, async (req, res) => {
  const { date, startTime, endTime, room, name, role } = req.body;

  try {
    await Reservation.create({ date, startTime, endTime, room, name, role });
    res.status(201).json({ message: "Reservasi berhasil dibuat!" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Gagal membuat reservasi." });
  }
});

export default router;

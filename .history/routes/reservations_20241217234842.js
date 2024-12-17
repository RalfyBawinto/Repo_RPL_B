import express from "express";
import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";
import { checkRoomAvailability } from "../middlewares/reservationMiddleware.js"; // Hanya sekali

const router = express.Router();

// Tambah reservasi
router.post("/add", checkRoomAvailability, async (req, res) => {
  const { date, startTime, endTime, room, name, role } = req.body;

  try {
    await Reservation.create({ date, startTime, endTime, room, name, role });
    res.status(200).json({
      message: "Reservasi berhasil dibuat!",
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Gagal membuat reservasi." });
  }
});

export default router;

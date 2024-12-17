import express from "express";
import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";
import User from "../models/UserModel.js"; // Pastikan model User sudah ada
import { checkRoomAvailability } from "../middlewares/reservationMiddleware.js";

const router = express.Router();

// Tambah reservasi
router.post("/add", checkRoomAvailability, async (req, res) => {
  const { date, startTime, endTime, room, name, role } = req.body;

  try {
    // Cek apakah name dan role ada di tabel users
    const userExists = await User.findOne({
      where: {
        name,
        role,
      },
    });

    if (!userExists) {
      return res.status(400).json({
        message:
          "Name atau Role tidak terdaftar di sistem. Silakan registrasi terlebih dahulu.",
      });
    }

    // Jika pengecekan lolos, lanjutkan dengan pembuatan reservasi
    await Reservation.create({ date, startTime, endTime, room, name, role });
    res.status(201).json({ message: "Reservasi berhasil dibuat!" });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ message: "Gagal membuat reservasi." });
  }
});

export default router;

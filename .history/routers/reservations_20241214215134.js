import express from "express";
import {
  createReservation,
  checkRoomAvailability,
  getReservationsByUser,
} from "../models/reservationModel.js";
import { getUserById } from "../models/UserModel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { userId, room, date, startTime, endTime } = req.body;

  try {
    // Cek ketersediaan ruangan
    const isUnavailable = await checkRoomAvailability(
      room,
      date,
      startTime,
      endTime
    );
    if (isUnavailable) {
      return res
        .status(400)
        .json({ message: "Ruangan belum selesai digunakan." });
    }

    // Buat reservasi
    const reservationId = await createReservation({
      userId,
      room,
      date,
      startTime,
      endTime,
    });
    const user = await getUserById(userId);

    res.status(201).json({
      message: "Reservasi berhasil dibuat.",
      data: {
        reservationId,
        name: user.name,
        role: user.role,
        room,
        date,
        startTime,
        endTime,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const reservations = await getReservationsByUser(userId);
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan server.", error });
  }
});

export default router;

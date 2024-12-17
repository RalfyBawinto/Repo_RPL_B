import express from "express";
import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";
import { checkRoomAvailability } from "../middlewares/reservationMiddleware.js";

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

// Middleware untuk cek ketersediaan ruangan
export const checkRoomAvailability = async (req, res, next) => {
  const { date, startTime, endTime, room } = req.body;

  try {
    const existingReservation = await Reservation.findOne({
      where: {
        date,
        room,
        [Op.or]: [
          { startTime: { [Op.lt]: endTime }, endTime: { [Op.gt]: startTime } },
        ],
      },
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({ message: "Ruangan sudah dipesan pada waktu tersebut." });
    }

    next();
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ message: "Gagal mengecek ketersediaan ruangan." });
  }
};

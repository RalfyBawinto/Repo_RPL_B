import { Router } from "express";
import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";

const router = Router();

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

// Endpoint untuk mengambil semua data reservasi
router.get("/api/reservations", async (req, res) => {
  try {
    // Mengambil semua data reservasi dari database
    const reservations = await Reservation.findAll();

    // Mengirimkan data reservasi sebagai respons
    res.json(reservations);
  } catch (error) {
    console.error("Error mengambil data reservasi:", error);
    res.status(500).json({ message: "Gagal mengambil data reservasi." });
  }
});

export default router;

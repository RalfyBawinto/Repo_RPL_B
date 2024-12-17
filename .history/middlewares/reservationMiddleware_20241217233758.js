import Reservation from "../models/ReservationModel.js";
import { Op } from "sequelize";

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

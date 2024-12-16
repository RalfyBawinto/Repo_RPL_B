// File: controllers/reservationController.js
import Reservation from "../models/Reservation.js";

// Mendapatkan daftar ruangan yang tersedia
export const getAvailableRooms = async (req, res) => {
  const { date, startTime, endTime } = req.query;

  try {
    const reservedRooms = await Reservation.findAll({
      where: {
        date,
        [Op.or]: [
          { startTime: { [Op.lt]: endTime, [Op.gte]: startTime } },
          { endTime: { [Op.gt]: startTime, [Op.lte]: endTime } },
        ],
      },
    });

    const reservedRoomNames = reservedRooms.map((r) => r.room);
    const allRooms = ["Cyber", "TBD", "Mulmed", "RPL"];
    const availableRooms = allRooms.filter(
      (room) => !reservedRoomNames.includes(room)
    );

    res.status(200).json({ availableRooms });
  } catch (error) {
    res.status(500).json({ message: "Error fetching available rooms", error });
  }
};

// Membuat reservasi baru
export const createReservation = async (req, res) => {
  const { date, startTime, endTime, room, userId } = req.body;

  try {
    // Cek apakah ruangan tersedia
    const isRoomTaken = await Reservation.findOne({
      where: {
        date,
        room,
        [Op.or]: [
          { startTime: { [Op.lt]: endTime, [Op.gte]: startTime } },
          { endTime: { [Op.gt]: startTime, [Op.lte]: endTime } },
        ],
      },
    });

    if (isRoomTaken) {
      return res
        .status(400)
        .json({ message: "Ruangan tidak tersedia pada waktu tersebut." });
    }

    const newReservation = await Reservation.create({
      date,
      startTime,
      endTime,
      room,
      userId,
    });

    res.status(201).json({
      message: "Reservasi berhasil dibuat!",
      reservation: newReservation,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating reservation", error });
  }
};

// Mendapatkan semua reservasi pada tanggal tertentu
export const getReservationsByDate = async (req, res) => {
  const { date } = req.params;

  try {
    const reservations = await Reservation.findAll({ where: { date } });
    res.status(200).json({ reservations });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reservations", error });
  }
};

// Sinkronisasi Database
(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized.");
  } catch (error) {
    console.error("Unable to synchronize database:", error);
  }
})();

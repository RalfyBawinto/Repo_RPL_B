import Reservation from "../models/reservationModel.js"; // Sesuaikan dengan model reservasi
import Room from "../models/roomModel.js"; // Sesuaikan dengan model ruangan

// Fungsi untuk memeriksa ketersediaan ruangan
export const checkRoomAvailability = async (req, res) => {
  const { userId, room, date, startTime, endTime } = req.body;

  try {
    // Cek apakah ada reservasi lain pada ruangan yang sama di waktu yang sama
    const existingReservation = await Reservation.findOne({
      where: {
        room: room,
        date: date,
        startTime: {
          [Op.lte]: endTime,
        },
        endTime: {
          [Op.gte]: startTime,
        },
      },
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({
          status: "unavailable",
          message: "Ruangan tidak tersedia pada waktu yang dipilih.",
        });
    }

    // Jika ruangan tersedia
    return res
      .status(200)
      .json({ status: "available", message: "Ruangan tersedia." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Terjadi kesalahan saat memeriksa ketersediaan ruangan.",
      });
  }
};

// Fungsi untuk membuat reservasi ruangan
export const createReservation = async (req, res) => {
  const { userId, room, date, startTime, endTime } = req.body;

  try {
    // Cek ketersediaan ruangan terlebih dahulu
    const existingReservation = await Reservation.findOne({
      where: {
        room: room,
        date: date,
        startTime: {
          [Op.lte]: endTime,
        },
        endTime: {
          [Op.gte]: startTime,
        },
      },
    });

    if (existingReservation) {
      return res
        .status(400)
        .json({
          status: "unavailable",
          message: "Ruangan tidak tersedia pada waktu yang dipilih.",
        });
    }

    // Jika ruangan tersedia, buat reservasi baru
    const newReservation = await Reservation.create({
      userId,
      room,
      date,
      startTime,
      endTime,
    });

    return res.status(201).json({
      status: "success",
      message: "Reservasi berhasil.",
      reservationId: newReservation.id,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        status: "error",
        message: "Terjadi kesalahan saat membuat reservasi.",
      });
  }
};

import Reservations from "../models/reservationModel.js";
import Users from "../models/UserModel.js";
import { Op } from "sequelize";

// Fungsi untuk memeriksa ketersediaan ruangan
export const checkRoomAvailability = async (room, date, startTime, endTime) => {
  try {
    // Mencari reservasi yang tumpang tindih dengan waktu yang diminta
    const existingReservations = await Reservations.findAll({
      where: {
        room,
        date,
        [Op.or]: [
          {
            startTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          {
            endTime: {
              [Op.between]: [startTime, endTime],
            },
          },
          {
            startTime: {
              [Op.lte]: startTime,
            },
            endTime: {
              [Op.gte]: endTime,
            },
          },
        ],
      },
    });

    // Mengembalikan true jika ada bentrok, false jika tidak
    return existingReservations.length > 0;
  } catch (error) {
    throw new Error(
      "Error saat memeriksa ketersediaan ruangan: " + error.message
    );
  }
};

// Fungsi untuk membuat reservasi baru
export const createReservation = async (reservationData) => {
  try {
    // Mengecek apakah pengguna ada
    const user = await Users.findOne({ where: { id: reservationData.userId } });
    if (!user) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    // Mengecek apakah ruangan tersedia
    const isRoomAvailable = await checkRoomAvailability(
      reservationData.room,
      reservationData.date,
      reservationData.startTime,
      reservationData.endTime
    );

    if (isRoomAvailable) {
      throw new Error("Ruangan sudah terpakai pada waktu tersebut.");
    }

    // Jika semua syarat terpenuhi, buat reservasi baru
    const newReservation = await Reservations.create(reservationData);
    return newReservation.id; // Mengembalikan ID reservasi yang baru dibuat
  } catch (error) {
    throw new Error("Error saat membuat reservasi: " + error.message);
  }
};

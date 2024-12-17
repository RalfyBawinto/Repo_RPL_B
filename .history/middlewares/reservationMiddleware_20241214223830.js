import Reservations from "../models/reservationModel.js";
import { Op } from "sequelize";

// Fungsi untuk memeriksa ketersediaan ruangan
export const checkRoomAvailability = async (room, date, startTime, endTime) => {
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
  return existingReservations.length > 0; // True jika ada bentrok
};

// Fungsi untuk membuat reservasi baru
export const createReservation = async (reservationData) => {
  const newReservation = await Reservations.create(reservationData);
  return newReservation.id; // Mengembalikan ID reservasi yang baru dibuat
};

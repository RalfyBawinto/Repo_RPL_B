import {
  checkRoomAvailability,
  createReservation,
} from "../services/reservationService.js";

// Fungsi untuk memeriksa ketersediaan ruangan
export const handleCheckRoom = async (data, socket) => {
  try {
    // Validasi format waktu yang diterima
    if (!isValidTime(data.startTime) || !isValidTime(data.endTime)) {
      socket.emit("reservationStatus", {
        status: "error",
        message: "Waktu yang dikirimkan tidak valid.",
      });
      return;
    }

    // Memanggil service untuk mengecek ketersediaan ruangan
    const { isAvailable, conflict } = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );

    // Mengirimkan status ruangan (tersedia atau tidak)
    if (isAvailable) {
      socket.emit("roomStatus", "available");
    } else {
      const conflictTimes = conflict.map((reservation) => ({
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      }));

      socket.emit("roomStatus", {
        status: "unavailable",
        message: "Ruangan tidak tersedia pada waktu tersebut.",
        conflictTimes: conflictTimes,
      });
    }
  } catch (error) {
    socket.emit("roomStatus", { status: "error", message: error.message });
  }
};

// Fungsi untuk membuat reservasi baru
export const handleCreateReservation = async (data, socket) => {
  try {
    // Validasi format waktu
    if (!isValidTime(data.startTime) || !isValidTime(data.endTime)) {
      socket.emit("reservationStatus", {
        status: "error",
        message: "Waktu yang dikirimkan tidak valid.",
      });
      return;
    }

    // Mengecek ketersediaan ruangan terlebih dahulu
    const { isAvailable, conflict } = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );

    if (isAvailable) {
      // Buat reservasi jika ruangan tersedia
      const newReservation = await createReservation(data);

      // Mengirimkan status berhasil dengan ID reservasi baru
      socket.emit("reservationStatus", {
        status: "success",
        reservationId: newReservation,
      });
    } else {
      // Mengirimkan status tidak tersedia jika ruangan sudah terpakai
      const conflictTimes = conflict.map((reservation) => ({
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      }));

      socket.emit("reservationStatus", {
        status: "unavailable",
        message: "Ruangan tidak tersedia pada waktu tersebut.",
        conflictTimes: conflictTimes,
      });
    }
  } catch (error) {
    socket.emit("reservationStatus", {
      status: "error",
      message: error.message,
    });
  }
};

// Fungsi untuk memvalidasi waktu
const isValidTime = (time) => {
  const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
  return regex.test(time);
};

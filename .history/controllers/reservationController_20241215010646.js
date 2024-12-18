import {
  checkRoomAvailability,
  createReservation,
} from "../services/reservationService.js";

// Fungsi untuk memeriksa ketersediaan ruangan
export const handleCheckRoom = async (data, socket) => {
  try {
    // Memanggil service untuk mengecek ketersediaan ruangan
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );

    // Mengirimkan status ruangan (tersedia atau tidak)
    socket.emit("roomStatus", isRoomAvailable ? "unavailable" : "available");
  } catch (error) {
    // Mengirimkan error jika terjadi kesalahan
    socket.emit("roomStatus", { status: "error", message: error.message });
  }
};

// Fungsi untuk membuat reservasi baru
export const handleCreateReservation = async (data, socket) => {
  try {
    // Mengecek ketersediaan ruangan terlebih dahulu
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );

    if (!isRoomAvailable) {
      // Buat reservasi jika ruangan tersedia
      const newReservation = await createReservation(data);

      // Mengirimkan status berhasil dengan ID reservasi baru
      socket.emit("reservationStatus", {
        status: "success",
        reservationId: newReservation,
      });
    } else {
      // Mengirimkan status tidak tersedia jika ruangan sudah terpakai
      socket.emit("reservationStatus", {
        status: "unavailable",
        message: "Ruangan tidak tersedia pada waktu tersebut.",
      });
    }
  } catch (error) {
    // Mengirimkan status error jika terjadi kesalahan
    socket.emit("reservationStatus", {
      status: "error",
      message: error.message,
    });
  }
};

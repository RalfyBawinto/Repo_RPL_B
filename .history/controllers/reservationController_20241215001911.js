import {
  checkRoomAvailability,
  createReservation,
} from "../services/reservationService.js";

// Fungsi untuk memeriksa ketersediaan ruangan
export const handleCheckRoom = async (data, socket) => {
  try {
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );
    socket.emit("roomStatus", isRoomAvailable ? "unavailable" : "available");
  } catch (error) {
    socket.emit("roomStatus", { status: "error", message: error.message });
  }
};

// Fungsi untuk membuat reservasi baru
export const handleCreateReservation = async (data, socket) => {
  try {
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );
    if (!isRoomAvailable) {
      // Buat reservasi jika ruangan tersedia
      const newReservation = await createReservation(data);
      socket.emit("reservationStatus", {
        status: "success",
        reservationId: newReservation,
      });
    } else {
      socket.emit("reservationStatus", {
        status: "unavailable",
        message: "Ruangan tidak tersedia pada waktu tersebut.",
      });
    }
  } catch (error) {
    socket.emit("reservationStatus", {
      status: "error",
      message: error.message,
    });
  }
};

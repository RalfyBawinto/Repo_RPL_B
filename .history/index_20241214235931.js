import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routers/userRoute.js";
import authRoute from "./routers/authRoute.js";
import monitoringRoute from "./routers/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import reservationRouter from "./routers/reservations.js";
import { checkRoomAvailability } from "./services/reservationService.js"; // Import middleware

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Ubah dengan URL frontend jika diperlukan
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route setup
app.use("/api/user", userRoute);
app.use("/api", authRoute);
app.use("/api", monitoringRoute);
app.use("/reservations", reservationRouter);

// Menambahkan route reservasi
export { io };

// Integrasi Socket.IO untuk notifikasi real-time
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Event untuk memeriksa ketersediaan ruangan
  socket.on("checkRoom", async (data) => {
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );
    // Kirim kembali status ketersediaan ke client
    socket.emit("roomStatus", isRoomAvailable ? "unavailable" : "available");
  });

  // Event untuk membuat reservasi baru
  socket.on("createReservation", async (data) => {
    const isRoomAvailable = await checkRoomAvailability(
      data.room,
      data.date,
      data.startTime,
      data.endTime
    );
    if (isRoomAvailable) {
      try {
        const reservationData = {
          userId: data.userId,
          room: data.room,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
        };
        // Panggil fungsi untuk membuat reservasi
        const newReservation = await createReservation(reservationData);
        // Kirim ID reservasi yang berhasil dibuat
        socket.emit("reservationStatus", {
          status: "success",
          reservationId: newReservation.id,
        });
      } catch (error) {
        socket.emit("reservationStatus", {
          status: "error",
          message: "Gagal membuat reservasi.",
        });
      }
    } else {
      socket.emit("reservationStatus", {
        status: "unavailable",
        message: "Ruangan tidak tersedia pada waktu yang dipilih.",
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Koneksi database
connectDatabase();

// Fungsi untuk menghubungkan ke database
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import reservationRouter from "./routes/reservation.js"; // Pastikan ini mengarah ke router yang benar
import {
  handleCheckRoom,
  handleCreateReservation,
} from "./controllers/reservationController.js"; // Pastikan ini mengarah ke controller yang benar

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Sesuaikan dengan URL frontend
    methods: ["GET", "POST", "FATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route setup
app.use("/user", userRoute); // Rute untuk user
app.use("/api", authRoute); // Rute untuk autentikasi
app.use("/api", monitoringRoute); // Rute untuk monitoring
app.use("/reservations", reservationRouter); // Menambahkan route reservasi

// Export `io` untuk digunakan di file lain jika diperlukan
export { io };

// Integrasi Socket.IO untuk notifikasi real-time
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Mendengarkan event untuk memeriksa ketersediaan ruangan
  socket.on("checkRoom", (data) => {
    handleCheckRoom(data, socket);
  });

  // Mendengarkan event untuk membuat reservasi
  socket.on("createReservation", (data) => {
    handleCreateReservation(data, socket);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Koneksi database
connectDatabase(); // Fungsi untuk menghubungkan ke database

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:/${port}`);
});

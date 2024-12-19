import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { connectDatabase } from "./config/Database.js";
import reservationRoutes from "./routes/reservation.js";

const app = express();
const server = http.createServer(app); // Gunakan http server untuk Socket.IO
const io = new Server(server); // Inisialisasi Socket.IO dengan server http
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Sesuaikan dengan URL frontend Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Koneksi ke database
connectDatabase();

// Menambahkan rute reservasi
app.use("/api/reservation", reservationRoutes); // Menghubungkan rute ke aplikasi Express

// Event listener untuk koneksi socket
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Event untuk memeriksa ketersediaan ruangan
  socket.on("checkRoom", (data) => {
    handleCheckRoom(data, socket); // Memanggil handler untuk memeriksa ketersediaan ruangan
  });

  // Event untuk membuat reservasi baru
  socket.on("createReservation", (data) => {
    handleCreateReservation(data, socket); // Memanggil handler untuk membuat reservasi
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

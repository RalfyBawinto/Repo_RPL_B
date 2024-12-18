import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import reservationRouter from "./routes/reservations.js"; // Pastikan import ini benar

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
app.use("/reservations", reservationRouter); // Menambahkan route reservasi

// Export `io` untuk digunakan di file lain
export { io };

// Integrasi Socket.IO untuk notifikasi real-time
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Koneksi database
connectDatabase(); // Fungsi untuk menghubungkan ke database

// Endpoint root
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

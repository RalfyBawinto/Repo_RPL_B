import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import reservationRouter from "./routes/reservation.js";
import laporanRoute from "./routes/laporan.js"; // Tambahkan import untuk laporan

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Sesuaikan dengan URL frontend Anda
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route setup
app.use("/users", userRoute); // Rute untuk user
app.use("/", authRoute); // Rute untuk autentikasi
app.use("/", monitoringRoute); // Rute untuk monitoring
app.use("/reservations", reservationRouter); // Rute untuk reservasi
app.use("/laporan", laporanRoute); // Tambahkan route untuk laporan kerusakan

// Export `io` untuk digunakan di file lain jika diperlukan
export { io };

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

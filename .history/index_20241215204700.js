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
import laporanRoute from "./routes/laporan.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

// Route setup
app.use("/users", userRoute);
app.use("/", authRoute);
app.use("/", monitoringRoute);
app.use("/reservations", reservationRouter);
app.use("/laporan", laporanRoute);

// Integrasi Socket.IO
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("checkRoom", (data) => {
    handleCheckRoom(data, socket);
  });

  socket.on("createReservation", (data) => {
    handleCreateReservation(data, socket);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Koneksi database
connectDatabase();

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running..");
});

// Memulai server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Ekspor `io` untuk digunakan di file lain
export { io };

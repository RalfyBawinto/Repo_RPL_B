import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import Reservation from "./models/ReservationModel.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Sinkronisasi Sequelize dengan database
(async () => {
  try {
    await db.authenticate();
    console.log("Database berhasil terkoneksi.");

    // Sinkronisasi model ke database (otomatis buat tabel jika belum ada)
    await Reservation.sync();
    console.log("Tabel Reservation telah dibuat atau sudah ada.");
  } catch (error) {
    console.error("Gagal terkoneksi ke database:", error);
  }
})();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend URL
    methods: ["GET", "POST", "FATCH"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route setup
app.use("/api/user", userRoute);
app.use("/api", authRoute);
app.use("/api", monitoringRoute);

// Export `io` for use in other files
export { io };

// Integrate Socket.IO
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

connectDatabase(); // Call function to connect to the database

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

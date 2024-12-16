import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js"; // Fungsi custom untuk koneksi database
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import reservationRoute from "./routes/reservationRoutes.js"; // Import reservation route
import { Server } from "socket.io";
import http from "http";

// Mengimpor model dan asosiasi
import "./models/UserModel.js";
import "./models/modelReservation.js";
import "./models/modelsAssociations.js"; // Memanggil asosiasi setelah semua model didefinisikan

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
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Route setup
app.use("/user", userRoute);
app.use("/", authRoute);
app.use("/", monitoringRoute);
app.use("/reservation", reservationRoute); // Menambahkan reservation route

// Integrasi Socket.IO
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

// Koneksi dan sinkronisasi database
connectDatabase()
  .then(() => {
    console.log("Database connected successfully");
    // Sinkronisasi model dengan database
    return db.sync();
  })
  .then(() => {
    console.log("Database synced.");
  })
  .catch((error) => {
    console.error("Error connecting or syncing database:", error);
  });

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

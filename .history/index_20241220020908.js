import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import reservationRoute from "./routes/reservations.js";
import reservationRouter from "./middlewares/reservationMiddleware.js";
import laporanRoute from "./routes/laporanRoute.js";
import profileRoutes from "./routes/ProfileRoute.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Menyusun socket.io di sini
const port = 3500;

// Koneksi database
connectDatabase();

// Setup middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST", "PUT"],
    allowedHeaders: ["Content-Type"],
  })
);

// Setup route
app.use("/api/user", userRoute);
app.use("/api", authRoute);
app.use("/api", monitoringRoute);
app.use("/api/reservations", reservationRoute);
app.use(reservationRouter);
app.use("/api", laporanRoute);
app.use("/api", profileRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running...");
});

// Ekspor io untuk digunakan di file lain
export { io };

// Menyiapkan server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

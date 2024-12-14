import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/database.js";
import userRoute from "./routers/userRoute.js";
import authRoute from "./routers/authRoute.js";
import monitoringRoute from "./routers/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Ganti dengan URL frontend Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/api/user", userRoute);
app.use("/api", authRoute);
app.use("/api", monitoringRoute);

// Integrasi Socket.IO
io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

connectDatabase(); // Panggil fungsi koneksi database

// Root endpoint
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Ekspor `io` untuk digunakan di file lain
export { io };

// Start server
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

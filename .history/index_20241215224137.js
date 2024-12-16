import express from "express";
import bodyParser from "body-parser";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";
import monitoringRoute from "./routes/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import { corsMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(corsMiddleware); // Gunakan middleware CORS dari authMiddleware.js

// Route setup
app.use("/user", userRoute); // Ganti "/api/user" menjadi "/user"
app.use("/auth", authRoute); // Ganti "/api" menjadi "/auth"
app.use("/monitoring", monitoringRoute); // Ganti "/api" menjadi "/monitoring"

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

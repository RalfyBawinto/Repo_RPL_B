import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connectDatabase } from "./config/Database.js";
import userRoute from "./routers/userRoute.js";
import authRoute from "./routers/authRoute.js";
import monitoringRoute from "./routers/monitoringRoute.js";
import { Server } from "socket.io";
import http from "http";
import { db } from "../config/Database.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3500;

const syncDatabase = async () => {
  try {
    await db.sync({ alter: true }); // `alter: true` akan menyesuaikan tabel dengan model
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Failed to synchronize database:", error);
  }
};

syncDatabase();

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Change to your frontend URL
    methods: ["GET", "POST"],
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

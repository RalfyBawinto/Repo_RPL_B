import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import reservationRoutes from "./routes/reservationRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// Server
const PORT = 3500;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});

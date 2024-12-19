// routes/reservation.js
import express from "express";
import {
  handleCheckRoom,
  handleCreateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// Menambahkan rute untuk check room dan create reservation
router.post("/checkRoom", handleCheckRoom);
router.post("/createReservation", handleCreateReservation);

export default router;

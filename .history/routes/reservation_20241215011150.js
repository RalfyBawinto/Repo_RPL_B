import express from "express";
import {
  checkRoomAvailability,
  createReservation,
} from "../services/reservationService.js";

const router = express.Router();

// Endpoint untuk memeriksa ketersediaan ruangan
router.post("/checkRoom", checkRoomAvailability);

// Endpoint untuk membuat reservasi
router.post("/createReservation", createReservation);

export default router;

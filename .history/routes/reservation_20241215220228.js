import express from "express";
import {
  handleCheckRoom,
  handleCreateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// Endpoint untuk memeriksa ketersediaan ruangan
router.post("/checkRoom", handleCheckRoom);

// Endpoint untuk membuat reservasi
router.post("/createReservation", handleCreateReservation);

export default router;

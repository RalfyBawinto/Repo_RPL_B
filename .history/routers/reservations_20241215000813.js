import express from "express";
import {
  handleCheckRoom,
  handleCreateReservation,
} from "../controllers/reservationController.js";

const router = express.Router();

// Rute untuk memeriksa ketersediaan ruangan
router.post("/checkRoom", handleCheckRoom);

// Rute untuk membuat reservasi baru
router.post("/createReservation", handleCreateReservation);

export default router;

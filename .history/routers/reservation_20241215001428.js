import express from "express";
import {
  createReservation,
  checkRoomAvailability,
} from "../controllers/reservationController.js";

const router = express.Router();

// Rute untuk memeriksa ketersediaan ruangan
router.post("/checkRoom", async (req, res) => {
  const { room, date, startTime, endTime } = req.body;
  const available = await checkRoomAvailability(room, date, startTime, endTime);
  res.json({ available });
});

// Rute untuk membuat reservasi baru
router.post("/", async (req, res) => {
  const reservationData = req.body;
  try {
    const newReservationId = await createReservation(reservationData);
    res.json({ id: newReservationId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;

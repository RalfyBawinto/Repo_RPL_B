import express from "express";
import { connectDatabase } from "./config/Database.js"; // Mengimpor koneksi DB
import User from "../models/UserModel.js"; // Mengimpor model User
import Reservation from "../models/modelReservation.js"; // Mengimpor model Reservation

// Kode lainnya...

// Sinkronisasi model
(async () => {
  try {
    await connectDatabase();
    await User.sync(); // Sinkronisasi model User
    await Reservation.sync(); // Sinkronisasi model Reservation
    console.log("Models synchronized.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
})();

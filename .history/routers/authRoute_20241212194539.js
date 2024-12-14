import express from "express";
import { signup, login, getUsers } from "../controllers/authController.js"; // Pastikan getUsers diimpor

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/signup", signup);

// Rute untuk login
router.post("/login", login);

// Rute untuk mendapatkan semua user
router.get("/users", getUsers); // Memanggil fungsi getUsers dari controller

// Rute untuk menambahkan user baru
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "User added successfully", data: { name, email } });
});

export default router;

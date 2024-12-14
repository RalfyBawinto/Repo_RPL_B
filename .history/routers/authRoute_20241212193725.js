import express from "express";
import { signup, login } from "../controllers/controller.js";

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/signup", signup);

// Rute untuk login
router.post("/login", login);

// Rute untuk mendapatkan semua user (tambah fitur jika dibutuhkan)
router.get("/users", (req, res) => {
  res.json({ message: "Fetching all users" });
});

// Rute untuk menambahkan user baru (anda sudah punya POST /users)
router.post("/users", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "User added successfully", data: { name, email } });
});

export default router;

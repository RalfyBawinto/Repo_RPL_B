import express from "express";
import {
  signup,
  login,
  getUsers,
  getUserData,
} from "../controllers/authcontroller.js"; // Pastikan getUsers diimpor
import verifyTokenDas from "../middleware/verifyTokenDas.js";

const router = express.Router();

// Rute untuk signup (mendaftarkan user baru)
router.post("/auth/signup", signup);

// Rute untuk login
router.post("/auth/login", login);

// Rute untuk mendapatkan semua user
router.get("/users", getUsers); // Memanggil fungsi getUsers dari controller

// Rute untuk menambahkan user baru
router.post("/api/users", (req, res) => {
  const { name, email } = req.body;
  res.json({ message: "User added successfully", data: { name, email } });
});

// Rute untuk mengambil data pengguna dengan autentikasi
router.get("/auth/user", verifyTokenDas, getUserData);

export default router;

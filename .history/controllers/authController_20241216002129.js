import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/hashPass.js";
import dotenv from "dotenv";

dotenv.config();

// Controller untuk mendapatkan semua user
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Mengambil semua data user dari database
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Controller untuk signup
export const signup = async (req, res) => {
  const { name, email, password, role, subRole } = req.body;

  // Validasi input
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Periksa apakah email sudah digunakan
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Buat user baru
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      subRole,
    });

    res
      .status(201)
      .json({ message: "User created successfully", userId: newUser.id });
  } catch (error) {
    console.error("Error during signup:", error);
    res
      .status(500)
      .json({ message: "Error during signup", error: error.message });
  }
};

// Controller untuk login
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    // Kirim data pengguna yang benar termasuk role dan subRole
    res.status(200).json({
      message: "Login berhasil",
      userName: user.name, // Kirim nama pengguna
      role: user.role, // Kirim role pengguna
      subRole: user.subRole, // Kirim subRole jika ada
    });
  } catch (error) {
    console.error("Error saat login:", error);
    res.status(500).json({ message: "Error saat login", error: error.message });
  }
};

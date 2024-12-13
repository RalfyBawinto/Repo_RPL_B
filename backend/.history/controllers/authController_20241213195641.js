import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/hashPass.js";
import dotenv from "dotenv";

// Memuat konfigurasi dari file .env
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
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Buat token baru
    const token = generateCustomToken(user.id, user.role);

    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ message: "Error during login", error: error.message });
  }
};

// Middleware untuk memverifikasi token JWT
export const authenticateJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Ambil token dari header

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  console.log("Token received:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = user; // Menyimpan informasi user ke dalam req.user
    console.log("Decoded user:", user);
    next();
  });
};

// Controller untuk mengambil data pengguna berdasarkan ID (dengan autentikasi)
export const getUserData = async (req, res) => {
  // Cek apakah req.user ada dan memiliki id
  if (!req.user || !req.user.id) {
    return res.status(400).json({ message: "User data is missing" });
  }

  const userId = req.user.id; // ID pengguna yang telah di-autentikasi

  try {
    const user = await User.findByPk(userId, {
      attributes: ["name", "email", "role", "subRole"], // Ambil atribut sesuai kebutuhan
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role,
      subRole: user.subRole,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user data", error: error.message });
  }
};

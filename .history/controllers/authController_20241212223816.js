import User from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../utils/hashPass.js";

// Controller untuk mendapatkan semua user
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Mengambil semua data user dari database
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
};

// Controller untuk signup
export const signup = async (req, res) => {
  const { name, email, password, role, subRole } = req.body;

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
    res.status(500).json({ message: "Error during signup", error });
  }
};

// Controller untuk login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari user berdasarkan email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Validasi password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Buat token JWT dan sertakan ID pengguna
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token kadaluarsa dalam 1 jam
    });

    res.status(200).json({
      message: "Login successful",
      user: { name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Error during login", error });
  }
};

// Controller untuk mengambil data pengguna berdasarkan ID (dengan autentikasi)
export const getUserData = async (req, res) => {
  const userId = req.user.id; // Asumsikan user ID ada pada req.user setelah autentikasi

  try {
    const user = await User.findByPk(userId, {
      attributes: ["name", "email", "role", "subRole"], // Ambil atribut sesuai kebutuhan
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
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

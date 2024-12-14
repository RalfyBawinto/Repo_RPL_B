// controllers/authController.js
import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Fungsi untuk menangani login
export const loginUser = async (req, res) => {
    // ... kode loginUser yang sudah ada
};

// Fungsi untuk menangani sign-up
export const signUpUser = async (req, res) => {
    const { email, password, username, role } = req.body;

    // Validasi input
    if (!email || !password || !username || !role) {
        return res.status(400).json({ message: "Email, password, username, and role are required" });
    }

    try {
        // Mengecek apakah user dengan email yang sama sudah ada
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already taken" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Membuat user baru
        const newUser = await Users.create({
            email,
            password: hashedPassword,
            username,
            role,
        });

        // Membuat JWT token untuk user yang baru
        const token = jwt.sign({ uuid: newUser.uuid, email: newUser.email }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
            expiresIn: '1h',
        });

        res.status(201).json({
            message: "User created successfully",
            token,
            user: { 
                uuid: newUser.uuid,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

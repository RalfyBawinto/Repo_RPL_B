import Users from '../models/UserModel.js';
import bcrypt from 'bcryptjs';  // Atau bcrypt jika ingin menggunakan bcrypt
import jwt from 'jsonwebtoken';  // Untuk menghasilkan token jika perlu

// Fungsi untuk menangani login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validasi input
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Mencari user berdasarkan email
        const user = await Users.findOne({ where: { email } });

        // Jika user tidak ditemukan, kembalikan error 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Log password dari request dan hash yang disimpan di database
        console.log('Password from request:', password);  // Log password yang diterima dari request
        console.log('Stored password hash:', user.password);  // Log hash password yang tersimpan di database

        // Memeriksa kecocokan password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Membuat JWT token jika diperlukan (opsional)
        const token = jwt.sign({ uuid: user.uuid, email: user.email }, process.env.JWT_SECRET || 'your_jwt_secret_key', {
            expiresIn: '1h',
        });

        // Jika login berhasil, kirimkan token dan data user
        res.status(200).json({
            message: "Login successful",
            token,  // Mengirimkan token jika perlu
            user: { 
                uuid: user.uuid,
                username: user.username,
                email: user.email,
                role: user.role,
                subRole: user.subRole,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fungsi untuk menangani signup (registrasi)
export const signUpUser = async (req, res) => {
    const { username, email, password, role, subRole } = req.body;

    // Validasi input
    if (!username || !email || !password || !role || !subRole) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Cek apakah email sudah digunakan
        const existingUser = await Users.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);

        // Menyimpan user baru ke database
        const newUser = await Users.create({
            username,
            email,
            password: hashedPassword,
            role,
            subRole,
        });

        res.status(201).json({
            message: "User created successfully",
            user: {
                uuid: newUser.uuid,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
                subRole: newUser.subRole,
            },
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
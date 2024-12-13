import Users from '../models/UserModel.js';
import bcrypt from 'bcrypt';  // Atau bcrypt jika ingin menggunakan bcrypt
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
        
        // Log hasil perbandingan password
        console.log('Password is valid:', isPasswordValid);  // Cek apakah password valid

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

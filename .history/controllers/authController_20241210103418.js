import Users from '../models/User.js';  // Pastikan path sesuai dengan lokasi model Users
import bcrypt from 'bcryptjs';  // Jika Anda menggunakan bcrypt untuk hash password

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Mencari user berdasarkan email
        const user = await Users.findOne({ where: { email } });
        
        // Jika user tidak ditemukan, kembalikan error 404
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Memeriksa kecocokan password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Jika login berhasil, Anda dapat mengembalikan response sukses atau token jika perlu
        res.status(200).json({ message: "Login successful" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

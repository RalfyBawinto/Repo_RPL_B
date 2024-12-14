import { sequelize } from '../config/Database.js'; // Pastikan ini mengimpor Sequelize instance
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Fungsi untuk Signup
export const signUpUser = async (req, res) => {
    const { username, email, password, role, subRole } = req.body;

    try {
        // Hash password sebelum menyimpan ke database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Simpan data ke database (sesuaikan dengan model Sequelize Anda)
        // Contoh dengan model `User`:
        const user = await sequelize.models.User.create({
            username,
            email,
            password: hashedPassword,
            role,
            subRole,
        });

        res.status(201).json({ message: 'User signed up successfully', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error signing up user', error: err.message });
    }
};

// Fungsi untuk Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Cari user berdasarkan email
        const user = await sequelize.models.User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Cek password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};

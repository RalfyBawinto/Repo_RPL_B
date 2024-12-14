import express from 'express';
import sequelize from './config/Database.js';  // Mengimpor koneksi database
import authRoutes from './routes/authRoutes.js';
import User from './models/User.js'; // Mengimpor model User

const app = express();

// Gunakan express.json() built-in
app.use(express.json());

// Rute API untuk autentikasi
app.use('/api', authRoutes);

// Sinkronisasi database dengan opsi force: true (untuk menghapus tabel yang sudah ada dan membuatnya kembali)
sequelize.sync({ force: true })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));

// Menjalankan server pada port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

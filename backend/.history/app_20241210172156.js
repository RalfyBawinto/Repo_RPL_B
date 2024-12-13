import express from 'express';
import sequelize from './config/Database.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

// Gunakan express.json() built-in
app.use(express.json());

// Rute API untuk autentikasi
app.use('/api', authRoutes);

// Sinkronisasi database dengan opsi force: true
sequelize.sync({ force: true })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Database sync error:', err));

// Menjalankan server pada port 3001
const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

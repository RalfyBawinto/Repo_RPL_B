import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { sequelize } from './config/Database.js';  // Mengimpor sequelize dari Database.js

dotenv.config();

const app = express();

// Middleware untuk parse JSON body
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Menjalankan server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Pastikan database terkoneksi sebelum server berjalan
    sequelize.authenticate().then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.log('Error connecting to database:', err);
    });
});

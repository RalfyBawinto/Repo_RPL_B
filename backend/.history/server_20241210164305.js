import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import { sequelize } from './config/Database.js';

dotenv.config();

const app = express();

// Middleware untuk log setiap request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Middleware untuk parse JSON body
app.use(express.json());

// Routes
app.use('/api', authRoutes);

// Menjalankan server
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connected');
    } catch (err) {
        console.log('Error connecting to database:', err);
    }
});
import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from '../config/Database.js';  // Corrected path

dotenv.config();

const app = express();
const router = express.Router();  // Create a router

// Middleware untuk log setiap request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`); // Log method dan URL
    next();
});

// Middleware untuk parse JSON body
app.use(express.json());

// Define your routes here
// For example:
// router.post('/login', loginController);
// router.post('/register', registerController);

// Export the router
export default router;

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
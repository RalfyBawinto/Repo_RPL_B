import express from 'express';
  // Pastikan ini sesuai dengan lokasi model
import db from './config/Database.js';

const app = express();
const PORT = 3001;

db.authenticate()
    .then(() => console.log('Database connection successful'))
    .catch(err => console.error('Database connection failed:', err));

app.get('/', async (req, res) => {
    try {
        const allUsers = await Users.findAll();  // Menggunakan Users setelah diimpor
        res.json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching users');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

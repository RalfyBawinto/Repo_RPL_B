import express from 'express';

const router = express.Router();

// Contoh route GET untuk mendapatkan semua user
router.get('/users', (req, res) => {
    res.json({ message: 'Fetching all users' });
});

// Contoh route POST untuk menambahkan user baru
router.post('/users', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: 'User added successfully', data: { name, email } });
});

export default router;

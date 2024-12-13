import express from 'express';

const router = express.Router();

// Contoh route GET
router.get('/users', (req, res) => {
    res.json({ message: 'Fetching all users' });
});

export default router;

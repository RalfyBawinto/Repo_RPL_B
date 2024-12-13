// /routes/auth.js
import express from 'express';
import { loginUser, signUpUser } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';  // Import middleware

const router = express.Router();

// Rute untuk login (tidak memerlukan autentikasi)
router.post('api/login', loginUser);

// Rute untuk signup (tidak memerlukan autentikasi)
router.post('api/signup', signUpUser);

// Contoh rute yang memerlukan autentikasi
router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: "You have access to this protected route", user: req.user });
});

export default router;

import express from 'express';
import { loginUser, signUpUser } from '../controllers/authController.js';  // Import kedua fungsi

const router = express.Router();

// Route untuk login
router.post('/api/login', loginUser);

// Route untuk signup (registrasi)
router.post('/api/signup', signUpUser);

export default router;

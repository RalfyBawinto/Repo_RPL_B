import express from 'express';

const router = express.Router();

// Define your routes here
router.post('/api/signup', (req, res) => {
  // signup logic
});

router.post('/api/login', (req, res) => {
  // login logic
});

export default router; // Pastikan ekspor default digunakan
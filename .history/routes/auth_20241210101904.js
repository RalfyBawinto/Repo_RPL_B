import express from 'express';
import Users from '../models/UserModel.js'; // Import model Users
import bcrypt from 'bcryptjs';

const router = express.Router();

// Route untuk Register
router.post('/register', async (req, res) => {
  const { username, email, password, role, subRole } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await Users.create({
      username,
      email,
      password: hashedPassword,
      role,
      subRole,
    });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed', error: err.message });
  }
});

// Route untuk Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

export default router;

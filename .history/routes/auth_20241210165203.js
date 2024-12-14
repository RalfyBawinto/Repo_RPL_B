const express = require('express');
const { signUp, signIn } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signUp);
router.post('/login', signIn);

module.exports = router;

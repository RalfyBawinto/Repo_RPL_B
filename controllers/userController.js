const User = require('../models/userModel');

const registerUser = (req, res) => {
  const { username, password } = req.body;
  User.createUser(username, password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error registering user' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

module.exports = { registerUser };

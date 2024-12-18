const fs = require('fs');
const path = require('path');

// Path file data pengguna
const usersFilePath = path.join(__dirname, '../data/users.json');

// Fungsi untuk mendapatkan profil
const getProfile = (req, res) => {
  try {
    const username = req.user.username; // Diambil dari middleware autentikasi
    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    res.json({
      status: 'success',
      data: {
        name: user.name,
        role: user.role,
        email: user.email,
        photo_url: user.photo_url || '',
      },
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

// Fungsi untuk memperbarui profil
const updateProfile = (req, res) => {
  try {
    const username = req.user.username;
    const { name, email, photo_url } = req.body;

    const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex === -1) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Update data profil
    if (name) users[userIndex].name = name;
    if (email) users[userIndex].email = email;
    if (photo_url) users[userIndex].photo_url = photo_url;

    // Simpan perubahan ke file JSON
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.json({ status: 'success', message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

module.exports = { getProfile, updateProfile };

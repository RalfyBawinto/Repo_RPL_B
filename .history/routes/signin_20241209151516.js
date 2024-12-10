const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'your_database_name'  // Ganti dengan nama database yang sesuai
});

// Endpoint untuk login (signin)
router.post('/', (req, res) => {
    const { email, password } = req.body;

    // Query untuk mencari user berdasarkan email dan password
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        if (results.length > 0) {
            res.status(200).json({ message: 'Login successful' });  // Login berhasil
        } else {
            res.status(400).json({ message: 'Invalid email or password' });  // Login gagal
        }
    });
});

module.exports = router;

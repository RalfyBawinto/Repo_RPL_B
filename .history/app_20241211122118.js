const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Mengimpor paket CORS

const app = express();
const port = 3001; // Pastikan port ini sesuai dengan yang Anda pilih

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CORS middleware untuk mengizinkan frontend mengakses server
app.use(cors({
  origin: 'http://localhost:3000',  // Ganti dengan URL frontend Anda
  methods: 'GET,POST',             // Metode yang diperbolehkan
  allowedHeaders: 'Content-Type',  // Header yang diperbolehkan
}));

// Setup database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'db_rpl_b'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack); // Menampilkan error koneksi
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint root
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Endpoint untuk login (signin)
app.post('/api/login', (req, res) => {
  console.log('Login attempt received');
  const { email, password } = req.body;

  // Query untuk mencari user berdasarkan email dan password
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Verifikasi password menggunakan bcrypt
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ message: 'Error comparing password' });
        }

        if (isMatch) {
          res.status(200).json({ message: 'Login successful' });  // Login berhasil
        } else {
          res.status(400).json({ message: 'Invalid email or password' });  // Password tidak cocok
        }
      });
    } else {
      res.status(400).json({ message: 'Invalid email or password' });  // Email tidak ditemukan
    }
  });
});

// Endpoint untuk registrasi pengguna (signup)
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role, subRole } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Memeriksa apakah email sudah ada di database
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err) {
      console.error('Database error (checking email):', err);  // Log error saat memeriksa email
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Menyimpan user baru ke dalam database
    const query = 'INSERT INTO users (name, email, password, role, subRole) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, email, hashedPassword, role, subRole || null], (err, results) => {
      if (err) {
        console.error('Error inserting user:', err);  // Log error saat memasukkan data
        return res.status(500).json({ message: 'Error inserting user', error: err });
      }

      console.log('User created successfully:', results);  // Log jika user berhasil ditambahkan
      res.status(201).json({ message: 'User created successfully', userId: results.insertId });
    });
  });
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

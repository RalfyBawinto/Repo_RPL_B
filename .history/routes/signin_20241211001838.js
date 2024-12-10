const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Mengimpor paket CORS
const signin = require('./routes/signin');  // Mengimpor router login dari folder routes

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

// Daftarkan rute login
app.use('/', signin);  // Menggunakan router login di aplikasi

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

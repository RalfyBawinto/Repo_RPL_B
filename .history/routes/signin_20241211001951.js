const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');  // Mengimpor paket CORS
const loginRouter = require('./routes/signin');  // Pastikan ini mengarah ke routes/signin.js

const app = express();
const port = 3001;

// Setup body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup CORS middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
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
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// Endpoint root
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Daftarkan rute login
app.use('/', loginRouter);  // Daftarkan router login

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

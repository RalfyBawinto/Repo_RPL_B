import express from "express";
import mysql from "mysql2";
import multer from "multer";
import path from "path";
import fs from "fs"; // Import fs module

// Membuat folder uploads jika belum ada
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

// Setup Express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null, // atau password XAMPP
  database: "management_lab_rpl_b",
});

// Setup Multer untuk file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Menyimpan file di folder uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file unik
  },
});
const upload = multer({ storage: storage });

// Buat endpoint untuk menerima laporan kerusakan
app.post("/laporan", upload.single("gambar"), (req, res) => {
  const { nama, lokasi, deskripsi } = req.body;
  const gambar = req.file ? req.file.filename : null;

  // Query untuk memasukkan data ke dalam tabel LaporanKerusakan
  const query = `
    INSERT INTO LaporanKerusakan (nama_alat, lokasi_ruangan, deskripsi, gambar)
    VALUES (?, ?, ?, ?)
  `;

  db.execute(query, [nama, lokasi, deskripsi, gambar], (err, results) => {
    if (err) {
      console.error("Error inserting report:", err);
      return res.status(500).json({ message: "Gagal mengirim laporan" });
    }
    res.status(200).json({ message: "Laporan berhasil dikirim" });
  });
});

// Jalankan server
app.listen(3500, () => {
  console.log("Server berjalan di http://localhost:3500");
});

const db = require('../config/db');
const qr = require('qr-image');

// Generate QR Code
exports.generateQRCode = (req, res) => {
  const qrData = `https://absensi.example.com/${Date.now()}`;
  const qrImage = qr.image(qrData, { type: 'png' });
  
  res.type('png');
  qrImage.pipe(res);
};

// Ambil riwayat absensi
exports.getAttendance = (req, res) => {
  const query = 'SELECT * FROM absensi ORDER BY scan_time DESC';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Submit data absensi
exports.addAttendance = (req, res) => {
  const { name, status } = req.body;
  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }
  const scanTime = new Date();
  const query = 'INSERT INTO absensi (name, status, scan_time) VALUES (?, ?, ?)';
  
  db.query(query, [name, status, scanTime], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Attendance added successfully!', data: results });
  });
};

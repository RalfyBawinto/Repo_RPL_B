import db from '../config/db.js';
import qr from 'qr-image';

// Generate QR Code
export const generateQRCode = (req, res) => {
  try {
    const qrData = `https://absensi.example.com/${Date.now()}`;
    const qrImage = qr.image(qrData, { type: 'png' });

    res.type('png');
    qrImage.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ambil riwayat absensi
export const getAttendance = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM absensi ORDER BY scan_time DESC');
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Tambahkan data absensi
export const addAttendance = async (req, res) => {
  const { name, status } = req.body;

  if (!name || !status) {
    return res.status(400).json({ error: 'Name and status are required' });
  }

  try {
    const scanTime = new Date();
    const query = 'INSERT INTO absensi (name, status, scan_time) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [name, status, scanTime]);

    res.json({
      message: 'Attendance added successfully!',
      data: { id: result.insertId, name, status, scanTime },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

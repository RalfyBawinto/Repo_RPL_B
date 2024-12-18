const express = require('express');
const router = express.Router();
const { generateQRCode, getAttendance, addAttendance } = require('../controllers/absensiController');

// Endpoint untuk generate QR Code
router.get('/generate-qr', generateQRCode);

// Endpoint untuk riwayat absensi
router.get('/history', getAttendance);

// Endpoint untuk submit absensi
router.post('/submit', addAttendance);

module.exports = router;

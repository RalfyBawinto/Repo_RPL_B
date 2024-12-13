import jwt from "jsonwebtoken";
import crypto from "crypto";

// Penyimpanan sementara untuk token (gunakan Redis atau database di produksi)
const tokenStore = {};

// Fungsi untuk menghasilkan token baru
const generateToken = (userId, role) => {
  const newToken = crypto.randomBytes(3).toString("hex"); // 6 karakter acak
  tokenStore[newToken] = {
    user: { id: userId, role },
    expiresAt: Date.now() + 3600000, // Berlaku selama 1 jam
  };
  return newToken;
};

// Fungsi untuk memverifikasi token dan memperbaruinya jika kedaluwarsa
const verifyTokenDas = (req, res, next) => {
  // Mengambil token dari header Authorization
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token diterima:", token); // Debug token

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  // Verifikasi token
  const tokenData = tokenStore[token];
  if (!tokenData) {
    console.error("Token tidak valid atau tidak ditemukan");
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Periksa apakah token sudah kedaluwarsa
  if (Date.now() > tokenData.expiresAt) {
    // Token sudah kedaluwarsa, buat token baru
    const newToken = generateToken(tokenData.user.id, tokenData.user.role);
    console.log("Token diperbarui:", newToken); // Debug token baru
    return res.status(200).json({
      message: "Token expired, new token issued",
      newToken,
    });
  }

  // Token masih valid, tambahkan data pengguna ke req
  req.user = tokenData.user;
  console.log("Decoded token:", tokenData.user); // Debug decoded token
  next();
};

export default verifyTokenDas;

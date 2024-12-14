import crypto from "crypto";

// Penyimpanan sementara untuk token (gunakan Redis atau database di produksi)
const tokenStore = {};

// Fungsi untuk menghasilkan token baru
export const generateToken = (userId, role) => {
  const newToken = crypto.randomBytes(3).toString("hex"); // 6 karakter acak
  tokenStore[newToken] = {
    user: { id: userId, role },
    expiresAt: Date.now() + 3600, // Berlaku selama 1 jam
  };
  return newToken;
};

// Fungsi untuk memverifikasi token dan memperbaruinya jika kedaluwarsa
export const verifyTokenDas = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token diterima:", token);

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  const tokenData = tokenStore[token];
  if (!tokenData) {
    console.error("Token tidak valid atau tidak ditemukan");
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  if (Date.now() > tokenData.expiresAt) {
    const newToken = generateToken(tokenData.user.id, tokenData.user.role);
    console.log("Token diperbarui:", newToken);
    return res.status(200).json({
      message: "Token expired, new token issued",
      newToken,
    });
  }

  req.user = tokenData.user;
  console.log("Decoded token:", tokenData.user);
  next();
};

export default verifyTokenDas;
